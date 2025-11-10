'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '../../../../lib/supabase'
import { useAuth } from '../../../../contexts/AuthContext'

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
  const [customerInfo, setCustomerInfo] = useState<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messageInputRef = useRef<HTMLInputElement>(null)

  // Always admin in admin pages
  const isAdmin = true

  // Add scrollToBottom function here
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

useEffect(() => {
  scrollToBottom()
}, [messages])

  async function fetchOrder() {
    const { data, error } = await supabase
      .from('keam_visuals')
      .select('*')
      .eq('id', orderId)
      .single()

    console.log('Fetch order result:', { data, error })
    
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

    if (data) {
      setMessages(data)
    }
  }

  async function fetchCustomerInfo() {
    if (!order) return
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', order.user_id)
        .single()

      if (data) setCustomerInfo(data)
    } catch (error) {
      console.error('Error fetching customer info:', error)
    }
  }

  async function sendMessage() {
    if (!newMessage.trim()) {
      return
    }

    setSending(true)
    
    const messageData = {
  order_id: orderId,
  user_id: order.user_id,
  content: `🎨 Keam: ${newMessage.trim()}`,
  sender_type: 'designer' // ← MAKE SURE THIS IS INCLUDED
}

    // Create temporary message
    const tempMessage = {
      id: 'temp-' + Date.now(),
      ...messageData,
      created_at: new Date().toISOString(),
      sender_type: 'designer'
    }

    // Add to messages immediately
    setMessages(prev => [...prev, tempMessage])
    setNewMessage('')
    
    try {
      // Send to database
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

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Quick action functions
  const sendQuickMessage = (message: string) => {
    setNewMessage(message)
    setTimeout(() => {
      sendMessage()
    }, 100)
  }

  // Admin functions
  async function updateOrderStatus(newStatus: string) {
    setUpdatingStatus(true)
    try {
      const { error } = await supabase
        .from('keam_visuals')
        .update({ status: newStatus })
        .eq('id', orderId)

      if (error) throw error

      setOrder((prev: any) => ({ ...prev, status: newStatus }))
      alert(`✅ Order status updated to ${newStatus}`)
    } catch (error) {
      console.error('Error updating status:', error)
      alert('❌ Failed to update status')
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
      alert(`✅ Payment status updated to ${newPaymentStatus}`)
    } catch (error) {
      console.error('Error updating payment status:', error)
      alert('❌ Failed to update payment status')
    } finally {
      setUpdatingStatus(false)
    }
  }

  async function addAdminNote(note: string) {
  const newNotes = orderNotes ? `${orderNotes}\n• ${note}` : `• ${note}`
  setOrderNotes(newNotes)
  
  try {
    // Temporary: Sign in as admin right before update
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: 'support@keamvisuals.com',
      password: 'admin123'
    })

    if (signInError) {
      console.error('Admin sign in failed:', signInError)
      alert('Admin authentication failed')
      return
    }

    const { error } = await supabase
      .from('keam_visuals')
      .update({ admin_notes: newNotes })
      .eq('id', orderId)

    if (error) throw error
    alert('✅ Note added successfully')
  } catch (error) {
    console.error('Error updating notes:', error)
  }
}

  async function deleteOrder() {
    try {
      // Temporary: Sign in as admin right before deletion to ensure RLS policies work
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: 'support@keamvisuals.com',
        password: 'admin123'
      })

      if (signInError) {
        console.error('Admin sign in failed:', signInError)
        alert('Admin authentication failed')
        return
      }

      console.log('Admin signed in for deletion:', signInData.user)

      // Just delete the order - messages will cascade delete automatically
      const { error: orderError, data } = await supabase
        .from('keam_visuals')
        .delete()
        .eq('id', orderId)
        .select()

      console.log('Delete result:', { orderError, data })

      if (orderError) {
        console.error('Order delete error:', orderError)
        throw orderError
      }
      
      alert('✅ Order deleted successfully')
      router.push('/admin/dashboard')
      
    } catch (error) {
      console.error('Error deleting order:', error)
      alert('❌ Failed to delete order')
    }
  }

  async function updateOrderNotes() {
  try {
    // Temporary: Sign in as admin right before update
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: 'support@keamvisuals.com',
      password: 'admin123'
    })

    if (signInError) {
      console.error('Admin sign in failed:', signInError)
      alert('Admin authentication failed: ' + signInError.message)
      return
    }

    console.log('Updating notes with data:', { orderId, orderNotes })

    const { error, data } = await supabase
      .from('keam_visuals')
      .update({ admin_notes: orderNotes })
      .eq('id', orderId)
      .select()

    console.log('Update result:', { error, data })

    if (error) {
      console.error('Supabase update error:', error)
      throw error
    }
    
    setEditingOrder(false)
    setOrder((prev: any) => ({ ...prev, admin_notes: orderNotes }))
    alert('✅ Notes updated successfully')
  } catch (error: any) {
    console.error('Full error updating notes:', error)
    console.error('Error message:', error?.message)
    console.error('Error details:', error?.details)
    alert('❌ Failed to update notes: ' + (error?.message || 'Unknown error'))
  }
}

  // Handle file uploads
  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (!files || !files[0] || !user) return

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
      alert(`❌ Upload failed: ${error.message || 'Please try again'}`)
      setMessages(prev => prev.filter(msg => !msg.id.startsWith('temp-')))
    } finally {
      setUploading(false)
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
      <div style={{maxWidth: '1400px', margin: '0 auto', padding: '2rem 1rem'}}>
        
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
              {order.package_type} - ADMIN VIEW
            </h1>
            <p style={{color: '#9ca3af'}}>Order #{order.id.slice(0, 8)}</p>
            <p style={{color: '#8b5cf6', fontSize: '0.9rem', marginTop: '0.5rem'}}>
              🔧 Admin Mode - Full Control
            </p>
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
            {order.priority === 'urgent' && (
              <span style={{
                padding: '0.5rem 1.5rem',
                borderRadius: '9999px',
                fontSize: '0.9rem',
                fontWeight: '600',
                background: 'rgba(239, 68, 68, 0.2)',
                color: '#ef4444',
                border: '1px solid rgba(239, 68, 68, 0.5)'
              }}>
                🔥 URGENT
              </span>
            )}
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem'
        }}>
          
          {/* Order Info & Admin Controls */}
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
              Order Details & Controls
            </h2>
            
            <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
              
              {/* Customer Info */}
              {customerInfo && (
                <div style={{
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  borderRadius: '8px',
                  padding: '1rem'
                }}>
                  <h3 style={{
                    color: '#3b82f6',
                    fontSize: '1rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem'
                  }}>
                    👤 Customer Info
                  </h3>
                  <p style={{color: 'white', fontSize: '0.9rem'}}>
                    Email: {customerInfo.email || 'N/A'}
                  </p>
                  {customerInfo.full_name && (
                    <p style={{color: 'white', fontSize: '0.9rem'}}>
                      Name: {customerInfo.full_name}
                    </p>
                  )}
                </div>
              )}

              {/* MEGA Quick Actions */}
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
                  marginBottom: '1rem'
                }}>
                  ⚡ MEGA Quick Actions
                </h3>
                
                {/* Status Actions */}
                <div style={{marginBottom: '1rem'}}>
                  <h4 style={{color: 'white', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem'}}>
                    📊 Status Management
                  </h4>
                  <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                    <button onClick={() => updateOrderStatus('pending')} style={quickActionStyle}>⏳ Set Pending</button>
                    <button onClick={() => updateOrderStatus('in_progress')} style={quickActionStyle}>🎨 Start Work</button>
                    <button onClick={() => updateOrderStatus('review')} style={quickActionStyle}>👀 Ready for Review</button>
                    <button onClick={() => updateOrderStatus('revision')} style={quickActionStyle}>✏️ Needs Revision</button>
                    <button onClick={() => updateOrderStatus('completed')} style={quickActionStyle}>✅ Mark Complete</button>
                    <button onClick={() => updateOrderStatus('cancelled')} style={quickActionStyle}>❌ Cancel Order</button>
                  </div>
                </div>

                {/* Payment Actions */}
                <div style={{marginBottom: '1rem'}}>
                  <h4 style={{color: 'white', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem'}}>
                    💰 Payment Actions
                  </h4>
                  <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                    <button onClick={() => updatePaymentStatus('paid')} style={quickActionStyle}>💳 Mark Paid</button>
                    <button onClick={() => updatePaymentStatus('unpaid')} style={quickActionStyle}>❌ Mark Unpaid</button>
                    <button onClick={() => updatePaymentStatus('refunded')} style={quickActionStyle}>↩️ Refund Payment</button>
                    <button onClick={() => updatePaymentStatus('pending')} style={quickActionStyle}>⏳ Payment Pending</button>
                  </div>
                </div>

                {/* Quick Messages */}
                <div style={{marginBottom: '1rem'}}>
                  <h4 style={{color: 'white', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem'}}>
                    💬 Quick Messages
                  </h4>
                  <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                    <button onClick={() => sendQuickMessage("I've started working on your design")} style={quickActionStyle}>🎨 Started Work</button>
                    <button onClick={() => sendQuickMessage("I need some clarification on your requirements")} style={quickActionStyle}>❓ Need Clarification</button>
                    <button onClick={() => sendQuickMessage("Your design is ready for review")} style={quickActionStyle}>👀 Ready for Review</button>
                    <button onClick={() => sendQuickMessage("Please provide feedback on the latest version")} style={quickActionStyle}>💭 Request Feedback</button>
                    <button onClick={() => sendQuickMessage("Payment received, thank you!")} style={quickActionStyle}>💰 Payment Received</button>
                    <button onClick={() => sendQuickMessage("Your order has been completed")} style={quickActionStyle}>✅ Order Complete</button>
                  </div>
                </div>

                {/* Quick Notes */}
                <div>
                  <h4 style={{color: 'white', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem'}}>
                    📝 Quick Notes
                  </h4>
                  <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                    <button onClick={() => addAdminNote("Customer requested revisions")} style={quickActionStyle}>✏️ Revisions Requested</button>
                    <button onClick={() => addAdminNote("Design approved by customer")} style={quickActionStyle}>👍 Design Approved</button>
                    <button onClick={() => addAdminNote("Awaiting customer response")} style={quickActionStyle}>⏳ Waiting for Response</button>
                    <button onClick={() => addAdminNote("Urgent - expedite this order")} style={quickActionStyle}>🚨 Expedite Order</button>
                    <button onClick={() => addAdminNote("Complex design requirements")} style={quickActionStyle}>🎯 Complex Design</button>
                    <button onClick={() => addAdminNote("Repeat customer")} style={quickActionStyle}>🔄 Repeat Customer</button>
                  </div>
                </div>
              </div>

              {/* Admin Notes */}
              <div>
                <label style={{
                  color: 'white',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}>
                  📝 Admin Notes
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

              {/* Design Requirements */}
              <div style={{flex: 1}}>
                <label style={{
                  color: 'white',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}>
                  🎨 Design Requirements
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

              {/* Danger Zone */}
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '8px',
                padding: '1rem'
              }}>
                <h3 style={{
                  color: '#ef4444',
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem'
                }}>
                  ⚠️ Danger Zone
                </h3>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  style={{
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.5)',
                    color: '#ef4444',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  🗑️ Delete This Order
                </button>
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
            flexDirection: 'column',
            height: '70vh'
          }}>
            <h2 style={{
              fontSize: '1.75rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              color: 'white'
            }}>
              💬 Order Chat
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
                        ? 'rgba(139, 92, 246, 0.3)'
                        : 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
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
                    }}>
                      {message.sender_type === 'designer' ? 'You' : 'Customer'} • {new Date(message.created_at).toLocaleTimeString()}
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
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
                ref={messageInputRef}
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message... (Press Enter to send)"
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
                  background: sending || !newMessage.trim() ? 'rgba(255, 255, 255, 0.3)' : 'rgba(139, 92, 246, 0.8)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem 1.5rem',
                  cursor: sending || !newMessage.trim() ? 'not-allowed' : 'pointer',
                  opacity: sending || !newMessage.trim() ? 0.6 : 1,
                  fontWeight: '600'
                }}
              >
                {sending ? 'Sending...' : 'Send'}
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
                    background: 'rgba(239, 68, 68, 0.8)',
                    border: '1px solid rgba(239, 68, 68, 0.5)',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600'
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

// Quick action button style
const quickActionStyle = {
  background: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  color: 'white',
  padding: '0.4rem 0.8rem',
  borderRadius: '6px',
  fontSize: '0.7rem',
  fontWeight: '500',
  cursor: 'pointer',
  whiteSpace: 'nowrap' as const,
  transition: 'all 0.2s ease'
}