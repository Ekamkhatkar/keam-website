'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { User } from '@supabase/supabase-js'

interface Message {
  id: string
  content: string
  user_id: string
  created_at: string
  file_url: string | null
  file_type: string | null
}

interface RealTimeChatProps {
  orderId: string
}

export default function RealTimeChat({ orderId }: RealTimeChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [user, setUser] = useState<User | null>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    checkUser()
    fetchMessages()
    subscribeToMessages()
  }, [orderId])

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

  async function fetchMessages() {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('order_id', orderId)
      .order('created_at', { ascending: true })

    if (data) setMessages(data)
  }

  function subscribeToMessages() {
    const subscription = supabase
      .channel('messages')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `order_id=eq.${orderId}` },
        (payload) => {
          setMessages(prev => [...prev, payload.new as Message])
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }

  async function sendMessage() {
    if (!newMessage.trim() || !user) return

    const { error } = await supabase
      .from('messages')
      .insert({
        order_id: orderId,
        user_id: user.id,
        content: newMessage,
      })

    if (!error) setNewMessage('')
  }

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file || !user) return

    setUploading(true)
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `order-${orderId}/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('messages')
      .upload(filePath, file)

    if (!uploadError) {
      await supabase
        .from('messages')
        .insert({
          order_id: orderId,
          user_id: user.id,
          content: `File: ${file.name}`,
          file_url: filePath,
          file_type: file.type,
        })
    }

    setUploading(false)
  }

  return (
    <div className="flex flex-col h-96">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map(message => (
          <div key={message.id} className={`p-3 rounded-lg ${
            message.user_id === user?.id ? 'bg-purple-500/20 ml-8' : 'bg-white/5 mr-8'
          }`}>
            <p>{message.content}</p>
            {message.file_url && (
              <a 
                href={supabase.storage.from('messages').getPublicUrl(message.file_url).data.publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline text-sm"
              >
                Download File
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
        />
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleFileUpload}
          disabled={uploading}
        />
        <label
          htmlFor="file-upload"
          className="px-4 py-2 bg-blue-500 rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
        >
          {uploading ? '...' : 'File'}
        </label>
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-purple-500 rounded-lg hover:opacity-90 transition-opacity"
        >
          Send
        </button>
      </div>
    </div>
  )
}