'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '../../../contexts/AuthContext'
import { supabase } from '../../../lib/supabase'

const packages = {
  'discord-package': { name: 'Discord Package', price: 20 },
  'fivem-package': { name: 'FiveM Package', price: 30 },
  'abstract-package': { name: 'Abstract Package', price: 25 },
  'brand-identity': { name: 'Brand Identity', price: 120 },
  'twitter-header': { name: 'Twitter Header', price: 15 },
  'thumbnail': { name: 'Thumbnail', price: 10 }
}

export default function OrderForm() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const packageType = params.package as string
  const packageInfo = packages[packageType as keyof typeof packages]
  
  const [formData, setFormData] = useState({
    designStyle: '',
    colorPreferences: '',
    specificRequirements: '',
    references: '',
    deadline: ''
  })
  const [loading, setLoading] = useState(false)
  const [orderCreated, setOrderCreated] = useState(false)
  const [currentOrderId, setCurrentOrderId] = useState<string>('')
  const [paypalLoading, setPaypalLoading] = useState(false)
  console.log('🟡 Customer - OrderForm loaded')
  console.log('🟡 Customer - Supabase URL from .env:', process.env.NEXT_PUBLIC_SUPABASE_URL)

  useEffect(() => {
    // Load PayPal script
    const script = document.createElement('script')
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`
    script.async = true
    script.onload = () => {
      console.log('PayPal SDK loaded')
    }
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  if (!packageInfo) {
    router.push('/prices')
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      alert('Please log in to place an order')
      router.push('/login')
      return
    }

    setLoading(true)

    try {
      console.log('🟡 Creating order...')
      console.log('User ID:', user.id)
      console.log('Package:', packageInfo)
      console.log('Form data:', formData)

      // 1. Create order in database
      const { data: order, error } = await supabase
        .from('keam_visuals')
        .insert([{
          user_id: user.id,
          package_type: packageInfo.name,
          price: packageInfo.price,
          design_brief: formData,
          status: 'pending',
          payment_status: 'unpaid'
        }])
        .select()
        .single()

      if (error) {
        console.error('🔴 Database error:', error)
        throw error
      }

      console.log('🟢 Order created:', order)
      setCurrentOrderId(order.id)
      setOrderCreated(true)

    } catch (error: any) {
      console.error('🔴 Order creation error:', error)
      alert('Error creating order: ' + (error.message || 'Unknown error'))
    } finally {
      setLoading(false)
    }
  }

  const handlePayment = async () => {
    if (!currentOrderId) {
      alert('No order created yet')
      return
    }

    setPaypalLoading(true)
    
    try {
      // Create PayPal order
      const response = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: currentOrderId,
          amount: packageInfo.price,
          packageName: packageInfo.name
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create PayPal order')
      }

      if (data.approval_url) {
        // Redirect to PayPal
        window.location.href = data.approval_url
      } else {
        throw new Error('No PayPal approval URL received')
      }
    } catch (error: any) {
      console.error('🔴 PayPal error:', error)
      alert('Payment setup failed: ' + error.message)
    } finally {
      setPaypalLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div style={{minHeight: '100vh', background: '#000000', color: 'white', paddingTop: '80px'}}>
      <div style={{maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem'}}>
        
        <div style={{textAlign: 'center', marginBottom: '3rem'}}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #adadadff, #222222ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.5rem'
          }}>
            Order {packageInfo.name}
          </h1>
          <p style={{color: '#9ca3af', fontSize: '1.5rem', fontWeight: '600'}}>
            ${packageInfo.price}
          </p>
        </div>

        <div className="glow-card" style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '2rem'
        }}>
          {!orderCreated ? (
            <form onSubmit={handleSubmit}>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
                
                {/* Design Style */}
                <div>
                  <label style={{
                    display: 'block',
                    color: 'white',
                    marginBottom: '0.5rem',
                    fontWeight: '600'
                  }}>
                    Design Style *
                  </label>
                  <select
                    name="designStyle"
                    value={formData.designStyle}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '1rem'
                    }}
                  >
                    <option value="">Select a style</option>
                    <option value="modern">Modern & Clean</option>
                    <option value="vibrant">Vibrant & Colorful</option>
                    <option value="minimal">Minimalist</option>
                    <option value="gaming">Gaming Theme</option>
                    <option value="elegant">Elegant & Professional</option>
                    <option value="custom">Custom (describe below)</option>
                  </select>
                </div>

                {/* Color Preferences */}
                <div>
                  <label style={{
                    display: 'block',
                    color: 'white',
                    marginBottom: '0.5rem',
                    fontWeight: '600'
                  }}>
                    Color Preferences
                  </label>
                  <input
                    type="text"
                    name="colorPreferences"
                    value={formData.colorPreferences}
                    onChange={handleInputChange}
                    placeholder="e.g., Blue and purple, brand colors, etc."
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                {/* Specific Requirements */}
                <div>
                  <label style={{
                    display: 'block',
                    color: 'white',
                    marginBottom: '0.5rem',
                    fontWeight: '600'
                  }}>
                    Specific Requirements *
                  </label>
                  <textarea
                    name="specificRequirements"
                    value={formData.specificRequirements}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Describe exactly what you need..."
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '1rem',
                      resize: 'vertical'
                    }}
                  />
                </div>

                {/* References */}
                <div>
                  <label style={{
                    display: 'block',
                    color: 'white',
                    marginBottom: '0.5rem',
                    fontWeight: '600'
                  }}>
                    Reference Links/Images
                  </label>
                  <textarea
                    name="references"
                    value={formData.references}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Paste links to designs you like..."
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '1rem',
                      resize: 'vertical'
                    }}
                  />
                </div>

                {/* Deadline */}
                <div>
                  <label style={{
                    display: 'block',
                    color: 'white',
                    marginBottom: '0.5rem',
                    fontWeight: '600'
                  }}>
                    Desired Deadline
                  </label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #949494ff, #383838ff)',
                    color: 'white',
                    padding: '1rem 2rem',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                    transition: 'all 0.3s ease'
                  }}
                >
                  {loading ? 'Creating Order...' : `Continue to Payment - $${packageInfo.price}`}
                </button>
              </div>
            </form>
          ) : (
            <div style={{textAlign: 'center'}}>
              <div style={{
                background: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '12px',
                padding: '2rem',
                marginBottom: '2rem'
              }}>
                <h3 style={{
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  marginBottom: '1rem'
                }}>
                  Order Created Successfully!
                </h3>
                <p style={{color: '#9ca3af', marginBottom: '0.5rem'}}>
                  Order ID: {currentOrderId}
                </p>
                <p style={{color: '#9ca3af'}}>
                  Complete your payment to start your project
                </p>
              </div>

              <button
                onClick={handlePayment}
                disabled={paypalLoading}
                style={{
                  width: '100%',
                  background: paypalLoading ? '#6b7280' : '#0070ba',
                  color: 'white',
                  padding: '1rem 2rem',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: paypalLoading ? 'not-allowed' : 'pointer',
                  opacity: paypalLoading ? 0.7 : 1,
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                {paypalLoading ? (
                  <>
                    <div className="spinner"></div>
                    Redirecting to PayPal...
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.5 14.5c-.5 1.5-1 3.5-1 4.5h4c0-1.5.5-3.5 1-4.5-1.5-.5-3-1-4-1z"/>
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    </svg>
                    Pay with PayPal - ${packageInfo.price}
                  </>
                )}
              </button>

              <p style={{
                color: '#6b7280',
                fontSize: '0.875rem',
                marginTop: '1rem'
              }}>
                You'll be redirected to PayPal to complete your payment
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .spinner {
          border: 2px solid #f3f3f3;
          border-top: 2px solid #3498db;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}