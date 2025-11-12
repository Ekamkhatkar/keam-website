'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '../../../../lib/supabase'
import { useAuth } from '../../../../contexts/AuthContext'

export default function OrderDetail() {
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

  // Check if user is admin
const isAdmin = false; // Customers never see admin features

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
  console.log('🔄 Setting up real-time for order:', orderId)
  
  fetchOrder()
  fetchMessages()
  
  // Test real-time connection
  const testChannel = supabase.channel('test-connection')
    .subscribe((status) => {
      console.log('🧪 Test channel status:', status)
    })
  
  // Order messages subscription
  const subscription = supabase
  .channel(`order-${orderId}-messages`)
  .on('postgres_changes', 
    { 
      event: '*', // Listen to ALL events (INSERT, UPDATE, DELETE)
      schema: 'public', 
      table: 'messages', 
      filter: `order_id=eq.${orderId}` 
    },
    (payload) => {
      console.log('🎯 REAL-TIME EVENT DETECTED:', payload)
      console.log('Event type:', payload.eventType)
      console.log('New data:', payload.new)
      console.log('Old data:', payload.old)
      
      if (payload.eventType === 'INSERT') {
  console.log('🆕 INSERT event - adding to messages')
  setMessages(prev => {
    // Check if message already exists to prevent duplicates
    const messageExists = prev.some(msg => 
      msg.id === payload.new.id || 
      (msg.id.startsWith('temp-') && msg.content === payload.new.content)
    )
    if (messageExists) {
      console.log('🚫 Duplicate message detected, skipping')
      return prev
    }
    const newMessages = [...prev, payload.new]
    console.log('Messages count:', newMessages.length)
    return newMessages
  })
}
    }
  )
  .subscribe((status) => {
    console.log('📡 Order messages subscription status:', status)
  })

  return () => {
    console.log('🧹 Cleaning up subscriptions')
    testChannel.unsubscribe()
    subscription.unsubscribe()
  }
}, [orderId])

// Add this scroll effect
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
    if (!newMessage.trim() || !user) return

    setSending(true)
    
    const messageData = {
  order_id: orderId,
  user_id: user.id,
  content: newMessage.trim(),
  sender_type: 'customer' // ← MAKE SURE THIS IS INCLUDED
}

    // Create a temporary message object for immediate display
    const tempMessage = {
      id: 'temp-' + Date.now(),
      ...messageData,
      created_at: new Date().toISOString(),
      sender_type: isAdmin ? 'designer' : 'customer'
    }

    // Add to messages immediately
    setMessages(prev => [...prev, tempMessage])
    setNewMessage('')
    
    try {
      // Then send to database
      const { data, error } = await supabase
        .from('messages')
        .insert([messageData])
        .select()

      if (error) {
        // Remove the temp message if there was an error
        setMessages(prev => prev.filter(msg => msg.id !== tempMessage.id))
        alert('Failed to send message.')
      }
    } catch (catchError) {
      console.error('Error sending message:', catchError)
    } finally {
      setSending(false)
    }
  }

  // Admin functions
  async function updateOrderStatus(newStatus: string) {
    if (!isAdmin) return
    
    setUpdatingStatus(true)
    try {
      const { error } = await supabase
        .from('keam_visuals')
        .update({ status: newStatus })
        .eq('id', orderId)

      if (error) throw error

      // Update local state
      setOrder((prev: any) => ({ ...prev, status: newStatus }))
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Failed to update status')
    } finally {
      setUpdatingStatus(false)
    }
  }

  async function updatePaymentStatus(newPaymentStatus: string) {
    if (!isAdmin) return
    
    setUpdatingStatus(true)
    try {
      const { error } = await supabase
        .from('keam_visuals')
        .update({ payment_status: newPaymentStatus })
        .eq('id', orderId)

      if (error) throw error

      // Update local state
      setOrder((prev: any) => ({ ...prev, payment_status: newPaymentStatus }))
    } catch (error) {
      console.error('Error updating payment status:', error)
      alert('Failed to update payment status')
    } finally {
      setUpdatingStatus(false)
    }
  }

  async function deleteOrder() {
    if (!isAdmin) return
    
    try {
      // First delete messages
      await supabase
        .from('messages')
        .delete()
        .eq('order_id', orderId)

      // Then delete the order
      const { error } = await supabase
        .from('keam_visuals')
        .delete()
        .eq('id', orderId)

      if (error) throw error
      
      alert('Order deleted successfully')
      router.push('/admin/dashboard')
    } catch (error) {
      console.error('Error deleting order:', error)
      alert('Failed to delete order')
    }
  }

  async function updateOrderNotes() {
    if (!isAdmin) return
    
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

  async function sendAdminNotification() {
    if (!isAdmin) return
    
    const message = "Your order status has been updated. Please check the order page for details."
    
    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          order_id: orderId,
          user_id: user?.id,
          content: `🔔 ADMIN: ${message}`,
          is_admin_notification: true
        })

      if (error) throw error
      
      alert('Notification sent to customer')
    } catch (error) {
      console.error('Error sending notification:', error)
    }
  }

  // Handle file uploads
  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (!files || !files[0] || !user) return

    const file = files[0]
    
    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      alert('File too large. Please select a file smaller than 10MB.')
      return
    }

    const fileName = `${orderId}/${Date.now()}-${file.name.replace(/\s+/g, '-')}`
    
    setUploading(true)

    try {
      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('message-files')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      // Get public URL for the uploaded file
      const { data: urlData } = supabase.storage
        .from('message-files')
        .getPublicUrl(fileName)

      // Create message with file
      const messageData = {
        order_id: orderId,
        user_id: user.id,
        content: '📎 File: ' + file.name,
        file_url: urlData.publicUrl
      }

      // Create temporary message for immediate display
      const tempMessage = {
        id: 'temp-' + Date.now(),
        ...messageData,
        created_at: new Date().toISOString(),
        sender_type: isAdmin ? 'designer' : 'customer',
        file_name: file.name
      }

      setMessages(prev => [...prev, tempMessage])

      // Save to database
      const { error: dbError } = await supabase
        .from('messages')
        .insert([messageData])

      if (dbError) throw dbError

    } catch (error: any) {
      console.error('Upload failed:', error)
      alert(`Upload failed: ${error.message || 'Please try again'}`)
      
      // Remove temporary message if it was added
      setMessages(prev => prev.filter(msg => !msg.id.startsWith('temp-')))
    } finally {
      setUploading(false)
      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  // Render different message types
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
    
    // Default text message
    return <div>{message.content}</div>
  }

  if (loading) return (
    <div style={{minHeight: '100vh', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'}}>
      Loading...
    </div>
  )
  
  if (!order) return (
    <div style={{minHeight: '100vh', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'}}>
      Order not found
    </div>
  )

  return (
    <div style={{minHeight: '100vh', background: '#000000', color: 'white', paddingTop: '80px'}}>
      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem'}}>
        
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '3rem'
        }}>
          <div>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '0.5rem'
            }}>
              {order.package_type}
            </h1>
            <p style={{color: '#9ca3af'}}>Order #{order.id.slice(0, 8)}</p>
            
          </div>
          <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
            <span style={{
              padding: '0.5rem 1.5rem',
              borderRadius: '9999px',
              fontSize: '0.9rem',
              fontWeight: '600',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}>
              {order.status ? order.status.replace('_', ' ') : 'pending'}
            </span>
            <span style={{
              padding: '0.5rem 1.5rem',
              borderRadius: '9999px',
              fontSize: '0.9rem',
              fontWeight: '600',
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
                ? '1px solid rgba(34, 197, 94, 0.5)' 
                : order.payment_status === 'refunded'
                ? '1px solid rgba(245, 158, 11, 0.5)'
                : '1px solid rgba(239, 68, 68, 0.5)'
            }}>
              {order.payment_status || 'unpaid'}
            </span>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          height: '70vh'
        }}>
          
          {/* Order Info */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h2 style={{
              fontSize: '1.75rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              color: 'white'
            }}>
              Order Details
            </h2>
            
            <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
              <div>
                <label style={{
                  color: 'white',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}>
                  Package
                </label>
                <p style={{fontSize: '1.1rem', fontWeight: '500', color: 'white'}}>
                  {order.package_type}
                </p>
              </div>
              
              <div>
                <label style={{
                  color: 'white',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}>
                  Price
                </label>
                <p style={{fontSize: '1.1rem', fontWeight: '500', color: 'white'}}>
                  ${order.price}
                </p>
              </div>

              {/* Admin Controls - FULL POWER */}
              {isAdmin && (
                <div style={{
                  background: 'rgba(139, 92, 246, 0.1)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '8px',
                  padding: '1rem'
                }}>
                  <h3 style={{
                    color: '#8b5cf6',
                    fontSize: '1rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    🔧 Admin Controls
                  </h3>
                  
                  <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                    
                    {/* Quick Actions */}
                    <div>
                      <label style={{
                        color: 'white',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        display: 'block',
                        marginBottom: '0.5rem'
                      }}>
                        Quick Actions:
                      </label>
                      <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                        <button
                          onClick={() => updateOrderStatus('in_progress')}
                          disabled={updatingStatus || order.status === 'in_progress'}
                          style={{
                            background: order.status === 'in_progress' 
                              ? 'rgba(59, 130, 246, 0.3)' 
                              : 'rgba(59, 130, 246, 0.1)',
                            border: '1px solid rgba(59, 130, 246, 0.5)',
                            color: 'white',
                            padding: '0.4rem 0.8rem',
                            borderRadius: '6px',
                            fontSize: '0.7rem',
                            fontWeight: '500',
                            cursor: updatingStatus ? 'not-allowed' : 'pointer'
                          }}
                        >
                          Start Work
                        </button>
                        
                        <button
                          onClick={() => updateOrderStatus('completed')}
                          disabled={updatingStatus || order.status === 'completed'}
                          style={{
                            background: order.status === 'completed' 
                              ? 'rgba(34, 197, 94, 0.3)' 
                              : 'rgba(34, 197, 94, 0.1)',
                            border: '1px solid rgba(34, 197, 94, 0.5)',
                            color: 'white',
                            padding: '0.4rem 0.8rem',
                            borderRadius: '6px',
                            fontSize: '0.7rem',
                            fontWeight: '500',
                            cursor: updatingStatus ? 'not-allowed' : 'pointer'
                          }}
                        >
                          Mark Complete
                        </button>
                        
                        <button
                          onClick={() => updatePaymentStatus('paid')}
                          disabled={updatingStatus || order.payment_status === 'paid'}
                          style={{
                            background: order.payment_status === 'paid' 
                              ? 'rgba(34, 197, 94, 0.3)' 
                              : 'rgba(34, 197, 94, 0.1)',
                            border: '1px solid rgba(34, 197, 94, 0.5)',
                            color: 'white',
                            padding: '0.4rem 0.8rem',
                            borderRadius: '6px',
                            fontSize: '0.7rem',
                            fontWeight: '500',
                            cursor: updatingStatus ? 'not-allowed' : 'pointer'
                          }}
                        >
                          Mark Paid
                        </button>

                        <button
                          onClick={sendAdminNotification}
                          style={{
                            background: 'rgba(245, 158, 11, 0.1)',
                            border: '1px solid rgba(245, 158, 11, 0.5)',
                            color: 'white',
                            padding: '0.4rem 0.8rem',
                            borderRadius: '6px',
                            fontSize: '0.7rem',
                            fontWeight: '500',
                            cursor: 'pointer'
                          }}
                        >
                          Notify Customer
                        </button>
                      </div>
                    </div>

                    {/* Admin Notes */}
                    <div>
                      <label style={{
                        color: 'white',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        display: 'block',
                        marginBottom: '0.5rem'
                      }}>
                        Admin Notes:
                      </label>
                      {editingOrder ? (
                        <div style={{display: 'flex', gap: '0.5rem'}}>
                          <input
                            type="text"
                            value={orderNotes}
                            onChange={(e) => setOrderNotes(e.target.value)}
                            placeholder="Add private admin notes..."
                            style={{
                              flex: 1,
                              padding: '0.5rem',
                              background: 'rgba(255, 255, 255, 0.1)',
                              border: '1px solid rgba(255, 255, 255, 0.3)',
                              borderRadius: '6px',
                              color: 'white',
                              fontSize: '0.8rem'
                            }}
                          />
                          <button
                            onClick={updateOrderNotes}
                            style={{
                              background: 'rgba(34, 197, 94, 0.2)',
                              border: '1px solid rgba(34, 197, 94, 0.5)',
                              color: 'white',
                              padding: '0.5rem 1rem',
                              borderRadius: '6px',
                              fontSize: '0.7rem',
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
                              border: '1px solid rgba(239, 68, 68, 0.5)',
                              color: 'white',
                              padding: '0.5rem 1rem',
                              borderRadius: '6px',
                              fontSize: '0.7rem',
                              fontWeight: '500',
                              cursor: 'pointer'
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
                          <div style={{
                            flex: 1,
                            padding: '0.5rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '6px',
                            color: orderNotes ? 'white' : '#9ca3af',
                            fontSize: '0.8rem',
                            minHeight: '2rem'
                          }}>
                            {orderNotes || 'No notes added'}
                          </div>
                          <button
                            onClick={() => setEditingOrder(true)}
                            style={{
                              background: 'rgba(139, 92, 246, 0.2)',
                              border: '1px solid rgba(139, 92, 246, 0.5)',
                              color: 'white',
                              padding: '0.5rem 1rem',
                              borderRadius: '6px',
                              fontSize: '0.7rem',
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
                    <div>
                      <label style={{
                        color: 'white',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        display: 'block',
                        marginBottom: '0.5rem'
                      }}>
                        Danger Zone:
                      </label>
                      <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                        <button
                          onClick={() => setShowDeleteConfirm(true)}
                          style={{
                            background: 'rgba(239, 68, 68, 0.2)',
                            border: '1px solid rgba(239, 68, 68, 0.5)',
                            color: '#ef4444',
                            padding: '0.4rem 0.8rem',
                            borderRadius: '6px',
                            fontSize: '0.7rem',
                            fontWeight: '500',
                            cursor: 'pointer'
                          }}
                        >
                          Delete Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div style={{flex: 1}}>
                <label style={{
                  color: 'white',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}>
                  Design Requirements
                </label>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  padding: '1rem',
                  color: '#9ca3af',
                  fontSize: '0.95rem',
                  flex: 1,
                  overflow: 'auto'
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
            </div>
          </div>

          {/* Chat Section */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h2 style={{
              fontSize: '1.75rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              color: 'white'
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
              maxHeight: '400px'
            }}>
              {messages.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  color: '#9ca3af',
                  padding: '2rem'
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
                        ? 'rgba(255, 255, 255, 0.9)'
                        : 'rgba(255, 255, 255, 0.1)',
                      color: message.sender_type === 'designer' ? '#000000' : 'white',
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      maxWidth: '70%',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    {renderMessageContent(message)}
                    <div style={{
                      fontSize: '0.7rem',
                      opacity: 0.7,
                      marginTop: '0.25rem',
                      textAlign: message.sender_type === 'designer' ? 'right' : 'left',
                      color: message.sender_type === 'designer' ? '#000000' : '#9ca3af'
                    }}>
                      {new Date(message.created_at).toLocaleTimeString()}
                    </div>
                  </div>
                ))
              )}
              {/* Invisible div for auto-scrolling */}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
              {/* File Upload Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  cursor: uploading ? 'not-allowed' : 'pointer',
                  opacity: uploading ? 0.6 : 1
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
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '1rem'
                }}
              />
              <button
                onClick={sendMessage}
                disabled={sending || !newMessage.trim()}
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: '#000000',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem 1.5rem',
                  cursor: sending ? 'not-allowed' : 'pointer',
                  opacity: sending || !newMessage.trim() ? 0.6 : 1,
                  fontWeight: '600'
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
              borderRadius: '12px',
              padding: '2rem',
              maxWidth: '400px',
              textAlign: 'center'
            }}>
              <h3 style={{color: 'white', marginBottom: '1rem'}}>
                Delete Order?
              </h3>
              <p style={{color: '#9ca3af', marginBottom: '2rem'}}>
                This will permanently delete the order and all messages. This action cannot be undone.
              </p>
              <div style={{display: 'flex', gap: '1rem', justifyContent: 'center'}}>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={deleteOrder}
                  style={{
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.5)',
                    color: '#ef4444',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    cursor: 'pointer'
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
  )
}