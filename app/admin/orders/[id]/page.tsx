'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

export default function AdminOrderDetail() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const orderId = params.id as string
  const [order, setOrder] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [editingOrder, setEditingOrder] = useState(false)
  const [orderNotes, setOrderNotes] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messageInputRef = useRef<HTMLInputElement>(null)

  const isAdmin = true

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    fetchOrder()
    fetchMessages()
    
    const subscription = supabase
      .channel(`order-${orderId}-messages`)
      .on('postgres_changes', 
        { 
          event: '*',
          schema: 'public', 
          table: 'messages', 
          filter: `order_id=eq.${orderId}` 
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setMessages(prev => {
              const messageExists = prev.some(msg => 
                msg.id === payload.new.id || 
                (msg.id.startsWith('temp-') && msg.content === payload.new.content)
              )
              if (messageExists) return prev
              return [...prev, payload.new]
            })
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [orderId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  async function fetchOrder() {
    const { data, error } = await supabase
      .from('keam_visuals')
      .select('*')
      .eq('id', orderId)
      .single()

    if (data) {
      setOrder(data)
      setOrderNotes(data.admin_notes || '')
    }
    setLoading(false)
  }

  async function fetchMessages() {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('order_id', orderId)
      .order('created_at', { ascending: true })

    if (data) setMessages(data)
  }

  async function sendMessage() {
    if (!newMessage.trim()) return

    setSending(true)
    
    const messageData = {
      order_id: orderId,
      user_id: order.user_id,
      content: `🎨 Keam: ${newMessage.trim()}`,
      sender_type: 'designer'
    }

    const tempMessage = {
      id: 'temp-' + Date.now(),
      ...messageData,
      created_at: new Date().toISOString(),
      sender_type: 'designer'
    }

    setMessages(prev => [...prev, tempMessage])
    setNewMessage('')
    
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([messageData])
        .select()

      if (error) {
        setMessages(prev => prev.filter(msg => msg.id !== tempMessage.id))
        alert('Failed to send message: ' + error.message)
      }
    } catch (catchError) {
      console.error('Error sending message:', catchError)
    } finally {
      setSending(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const sendQuickMessage = (message: string) => {
    setNewMessage(message)
    setTimeout(() => {
      sendMessage()
    }, 100)
  }

  async function updateOrderStatus(newStatus: string) {
    setUpdatingStatus(true)
    try {
      const { error } = await supabase
        .from('keam_visuals')
        .update({ status: newStatus })
        .eq('id', orderId)

      if (error) throw error

      setOrder((prev: any) => ({ ...prev, status: newStatus }))
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Failed to update status')
    } finally {
      setUpdatingStatus(false)
    }
  }

  async function updatePaymentStatus(newPaymentStatus: string) {
    setUpdatingStatus(true)
    try {
      const { error } = await supabase
        .from('keam_visuals')
        .update({ payment_status: newPaymentStatus })
        .eq('id', orderId)

      if (error) throw error

      setOrder((prev: any) => ({ ...prev, payment_status: newPaymentStatus }))
    } catch (error) {
      console.error('Error updating payment status:', error)
      alert('Failed to update payment status')
    } finally {
      setUpdatingStatus(false)
    }
  }

  async function addAdminNote(note: string) {
    const newNotes = orderNotes ? `${orderNotes}\n• ${note}` : `• ${note}`
    setOrderNotes(newNotes)
    
    try {
      const { error } = await supabase
        .from('keam_visuals')
        .update({ admin_notes: newNotes })
        .eq('id', orderId)

      if (error) throw error
    } catch (error) {
      console.error('Error updating notes:', error)
    }
  }

  async function deleteOrder() {
  try {
    const { error: deleteError } = await supabase
      .from('keam_visuals')
      .delete()
      .eq('id', orderId)

    if (deleteError) throw deleteError

    // Add delay and force refresh
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    alert('✅ Order deleted successfully')
    router.refresh() // Force Next.js refresh
    router.push('/admin/dashboard')
    
  } catch (error: any) {
    console.error('Delete error:', error)
    alert('Delete failed: ' + error.message)
  }
}

  async function updateOrderNotes() {
    try {
      const { error } = await supabase
        .from('keam_visuals')
        .update({ admin_notes: orderNotes })
        .eq('id', orderId)

      if (error) throw error
      
      setEditingOrder(false)
      setOrder((prev: any) => ({ ...prev, admin_notes: orderNotes }))
    } catch (error) {
      console.error('Error updating notes:', error)
      alert('Failed to update notes')
    }
  }

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (!files || !files[0]) return

    const file = files[0]
    if (file.size > 10 * 1024 * 1024) {
      alert('File too large. Please select a file smaller than 10MB.')
      return
    }

    const fileName = `${orderId}/${Date.now()}-${file.name.replace(/\s+/g, '-')}`
    setUploading(true)

    try {
      const { error: uploadError } = await supabase.storage
        .from('message-files')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage
        .from('message-files')
        .getPublicUrl(fileName)

      const messageData = {
        order_id: orderId,
        user_id: order.user_id,
        content: '📎 File: ' + file.name,
        file_url: urlData.publicUrl,
        sender_type: 'designer'
      }

      const tempMessage = {
        id: 'temp-' + Date.now(),
        ...messageData,
        created_at: new Date().toISOString(),
        sender_type: 'designer',
        file_name: file.name
      }

      setMessages(prev => [...prev, tempMessage])

      const { error: dbError } = await supabase
        .from('messages')
        .insert([messageData])

      if (dbError) throw dbError

    } catch (error: any) {
      console.error('Upload failed:', error)
      alert(`Upload failed: ${error.message || 'Please try again'}`)
      setMessages(prev => prev.filter(msg => !msg.id.startsWith('temp-')))
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  function renderMessageContent(message: any) {
    if (message.file_url) {
      const fileType = message.file_url.split('.').pop()?.toLowerCase()
      
      if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileType || '')) {
        return (
          <div>
            <img 
              src={message.file_url} 
              alt="Uploaded image"
              style={{
                maxWidth: '100%',
                maxHeight: '300px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            />
            <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', opacity: 0.7 }}>
              {message.file_name || 'Image'}
            </div>
          </div>
        )
      } else if (['mp4', 'webm', 'mov'].includes(fileType || '')) {
        return (
          <div>
            <video 
              controls
              style={{
                maxWidth: '100%',
                maxHeight: '300px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              <source src={message.file_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', opacity: 0.7 }}>
              {message.file_name || 'Video'}
            </div>
          </div>
        )
      }
    }
    
    return <div>{message.content}</div>
  }

  if (loading) return (
    <div style={{
      background: '#000000',
      color: '#ffffff',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      Loading...
    </div>
  )
  
  if (!order) return (
    <div style={{
      background: '#000000',
      color: '#ffffff',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      Order not found
    </div>
  )

  return (
    <div style={{
      background: '#000000',
      color: '#ffffff',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      
      {/* BACKGROUND SMOKE EFFECTS */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: '#000000'
      }}>
        <div style={{
          position: 'absolute',
          top: '-20%',
          left: '-50%',
          width: '200%',
          height: '140%',
          background: `
            radial-gradient(ellipse 800px 400px at 30% 30%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 20%, rgba(255, 255, 255, 0.05) 40%, transparent 60%),
            radial-gradient(ellipse 600px 300px at 70% 60%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 25%, transparent 55%)
          `,
          filter: 'blur(80px)',
          animation: 'fastSmoke 8s ease-in-out infinite',
          transformOrigin: 'center center'
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-30%',
          width: '150%',
          height: '100%',
          background: 'radial-gradient(ellipse 700px 350px at 50% 50%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 30%, transparent 60%)',
          filter: 'blur(90px)',
          animation: 'fastSmoke2 10s ease-in-out infinite',
          transformOrigin: 'center center'
        }} />
      </div>

      {/* MAIN CONTENT */}
      <div style={{ position: 'relative', zIndex: 100, paddingTop: '100px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
          
          {/* Header */}
          <div style={{ marginBottom: '3rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '50px',
              padding: '0.5rem 1.25rem',
              marginBottom: '1.5rem',
              fontSize: '0.875rem',
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: '400'
            }}>
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#ffffff'
              }} />
              Admin Order Management
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <div>
                <h1 style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  fontWeight: '300',
                  marginBottom: '0.5rem',
                  letterSpacing: '-0.02em'
                }}>
                  {order.package_type}
                </h1>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '1rem'
                }}>
                  Order #{order.id.slice(0, 8)}
                </p>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '50px',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  {order.status ? order.status.replace('_', ' ') : 'pending'}
                </span>
                <span style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '50px',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  background: order.payment_status === 'paid' 
                    ? 'rgba(34, 197, 94, 0.2)' 
                    : order.payment_status === 'refunded'
                    ? 'rgba(245, 158, 11, 0.2)'
                    : 'rgba(239, 68, 68, 0.2)',
                  color: order.payment_status === 'paid' 
                    ? '#22c55e' 
                    : order.payment_status === 'refunded'
                    ? '#f59e0b'
                    : '#ef4444',
                  border: order.payment_status === 'paid' 
                    ? '1px solid rgba(34, 197, 94, 0.3)' 
                    : order.payment_status === 'refunded'
                    ? '1px solid rgba(245, 158, 11, 0.3)'
                    : '1px solid rgba(239, 68, 68, 0.3)'
                }}>
                  {order.payment_status || 'unpaid'}
                </span>
              </div>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem'
          }}>
            
            {/* Order Info & Admin Controls */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <h2 style={{
                fontSize: '1.75rem',
                fontWeight: '400',
                marginBottom: '2rem',
                color: 'white',
                letterSpacing: '-0.01em'
              }}>
                Order Details & Controls
              </h2>
              
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                {/* Quick Actions */}
                <div style={{
                  background: 'rgba(139, 92, 246, 0.1)',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: '12px',
                  padding: '1.5rem'
                }}>
                  <h3 style={{
                    color: '#8b5cf6',
                    fontSize: '1rem',
                    fontWeight: '600',
                    marginBottom: '1rem'
                  }}>
                    ⚡ Quick Actions
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <h4 style={{ color: 'white', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                        Status
                      </h4>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <button onClick={() => updateOrderStatus('pending')} style={quickActionStyle}>⏳ Pending</button>
                        <button onClick={() => updateOrderStatus('in_progress')} style={quickActionStyle}>🎨 In Progress</button>
                        <button onClick={() => updateOrderStatus('completed')} style={quickActionStyle}>✅ Complete</button>
                      </div>
                    </div>

                    <div>
                      <h4 style={{ color: 'white', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                        Payment
                      </h4>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <button onClick={() => updatePaymentStatus('paid')} style={quickActionStyle}>💳 Paid</button>
                        <button onClick={() => updatePaymentStatus('unpaid')} style={quickActionStyle}>❌ Unpaid</button>
                        <button onClick={() => updatePaymentStatus('refunded')} style={quickActionStyle}>↩️ Refunded</button>
                      </div>
                    </div>

                    <div>
                      <h4 style={{ color: 'white', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                        Quick Messages
                      </h4>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <button onClick={() => sendQuickMessage("I've started working on your design")} style={quickActionStyle}>🎨 Started</button>
                        <button onClick={() => sendQuickMessage("Your design is ready for review")} style={quickActionStyle}>👀 Ready</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Design Requirements */}
                <div>
                  <label style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    display: 'block',
                    marginBottom: '0.75rem'
                  }}>
                    Design Requirements
                  </label>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.95rem',
                    lineHeight: '1.6'
                  }}>
                    {order.design_brief && (
                      <div>
                        <p><strong>Style:</strong> {order.design_brief.designStyle}</p>
                        <p><strong>Colors:</strong> {order.design_brief.colorPreferences}</p>
                        <p><strong>Requirements:</strong> {order.design_brief.specificRequirements}</p>
                        {order.design_brief.references && (
                          <p><strong>References:</strong> {order.design_brief.references}</p>
                        )}
                        {order.design_brief.deadline && (
                          <p><strong>Deadline:</strong> {order.design_brief.deadline}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Admin Notes */}
                <div>
                  <label style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    display: 'block',
                    marginBottom: '0.75rem'
                  }}>
                    Admin Notes
                  </label>
                  {editingOrder ? (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input
                        type="text"
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        placeholder="Add private admin notes..."
                        style={{
                          flex: 1,
                          padding: '0.75rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '8px',
                          color: 'white',
                          fontSize: '0.9rem'
                        }}
                      />
                      <button
                        onClick={updateOrderNotes}
                        style={{
                          background: 'rgba(34, 197, 94, 0.2)',
                          border: '1px solid rgba(34, 197, 94, 0.3)',
                          color: 'white',
                          padding: '0.75rem 1rem',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingOrder(false)}
                        style={{
                          background: 'rgba(239, 68, 68, 0.2)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          color: 'white',
                          padding: '0.75rem 1rem',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <div style={{
                        flex: 1,
                        padding: '0.75rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        color: orderNotes ? 'white' : 'rgba(255, 255, 255, 0.5)',
                        fontSize: '0.9rem',
                        minHeight: '2.5rem'
                      }}>
                        {orderNotes || 'No notes added'}
                      </div>
                      <button
                        onClick={() => setEditingOrder(true)}
                        style={{
                          background: 'rgba(139, 92, 246, 0.2)',
                          border: '1px solid rgba(139, 92, 246, 0.3)',
                          color: 'white',
                          padding: '0.75rem 1rem',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>

                {/* Danger Zone */}
                <div style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  borderRadius: '12px',
                  padding: '1.5rem'
                }}>
                  <h3 style={{
                    color: '#ef4444',
                    fontSize: '1rem',
                    fontWeight: '600',
                    marginBottom: '1rem'
                  }}>
                    ⚠️ Danger Zone
                  </h3>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    style={{
                      background: 'rgba(239, 68, 68, 0.2)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#ef4444',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Delete Order
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Section */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              height: '70vh'
            }}>
              <h2 style={{
                fontSize: '1.75rem',
                fontWeight: '400',
                marginBottom: '2rem',
                color: 'white',
                letterSpacing: '-0.01em'
              }}>
                Order Chat
              </h2>
              
              {/* Messages */}
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                marginBottom: '1.5rem',
                overflow: 'auto',
                paddingRight: '0.5rem'
              }}>
                {messages.length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    color: 'rgba(255, 255, 255, 0.4)',
                    padding: '3rem 2rem'
                  }}>
                    No messages yet. Start the conversation!
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      style={{
                        alignSelf: message.sender_type === 'designer' ? 'flex-end' : 'flex-start',
                        background: message.sender_type === 'designer' 
                          ? 'rgba(139, 92, 246, 0.3)'
                          : 'rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        padding: '1rem 1.25rem',
                        borderRadius: '16px',
                        maxWidth: '80%',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      {renderMessageContent(message)}
                      <div style={{
                        fontSize: '0.75rem',
                        opacity: 0.6,
                        marginTop: '0.5rem',
                        textAlign: message.sender_type === 'designer' ? 'right' : 'left'
                      }}>
                        {message.sender_type === 'designer' ? 'You' : 'Customer'} • {new Date(message.created_at).toLocaleTimeString()}
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '10px',
                    padding: '0.875rem',
                    cursor: uploading ? 'not-allowed' : 'pointer',
                    opacity: uploading ? 0.6 : 1,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    if (!uploading) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!uploading) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                    }
                  }}
                  title="Upload image or video"
                >
                  {uploading ? '📤' : '📎'}
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*,video/*"
                  style={{ display: 'none' }}
                />

                <input
                  ref={messageInputRef}
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message... (Press Enter to send)"
                  style={{
                    flex: 1,
                    padding: '0.875rem 1.25rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '10px',
                    color: 'white',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.08)'
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                  }}
                  onBlur={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)'
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                  }}
                />
                <button
                  onClick={sendMessage}
                  disabled={sending || !newMessage.trim()}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: '#ffffff',
                    padding: '0.875rem 1.5rem',
                    borderRadius: '10px',
                    fontSize: '0.95rem',
                    fontWeight: '400',
                    cursor: sending ? 'not-allowed' : 'pointer',
                    opacity: sending || !newMessage.trim() ? 0.6 : 1,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    if (!sending && newMessage.trim()) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)'
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!sending && newMessage.trim()) {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                    }
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* Delete Confirmation Modal */}
          {showDeleteConfirm && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                padding: '2rem',
                maxWidth: '400px',
                textAlign: 'center',
                backdropFilter: 'blur(10px)'
              }}>
                <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.5rem' }}>
                  Delete Order?
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '2rem', lineHeight: '1.6' }}>
                  This will permanently delete the order and all messages. This action cannot be undone.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: 'white',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={deleteOrder}
                    style={{
                      background: 'rgba(239, 68, 68, 0.2)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#ef4444',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'
                    }}
                  >
                    Delete Order
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ANIMATIONS */}
      <style jsx global>{`
        @keyframes fastSmoke {
          0% {
            transform: translate(-30%, -10%) rotate(-20deg) scaleX(0.8) scaleY(1.2);
          }
          25% {
            transform: translate(10%, 15%) rotate(10deg) scaleX(1.3) scaleY(0.9);
          }
          50% {
            transform: translate(40%, -5%) rotate(-15deg) scaleX(0.9) scaleY(1.4);
          }
          75% {
            transform: translate(5%, 20%) rotate(25deg) scaleX(1.5) scaleY(0.7);
          }
          100% {
            transform: translate(-30%, -10%) rotate(-20deg) scaleX(0.8) scaleY(1.2);
          }
        }

        @keyframes fastSmoke2 {
          0% {
            transform: translate(20%, 10%) rotate(15deg) scaleX(1.2) scaleY(0.8);
          }
          33% {
            transform: translate(-15%, -20%) rotate(-25deg) scaleX(0.7) scaleY(1.5);
          }
          66% {
            transform: translate(30%, 5%) rotate(20deg) scaleX(1.4) scaleY(0.9);
          }
          100% {
            transform: translate(20%, 10%) rotate(15deg) scaleX(1.2) scaleY(0.8);
          }
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #000000;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  )
}

// Quick action button style
const quickActionStyle = {
  background: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: 'white',
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  fontSize: '0.8rem',
  fontWeight: '500',
  cursor: 'pointer',
  whiteSpace: 'nowrap' as const,
  transition: 'all 0.3s ease'
}