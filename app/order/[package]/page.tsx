'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

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

  useEffect(() => {
    const script = document.createElement('script')
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`
    script.async = true
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

      if (error) throw error

      setCurrentOrderId(order.id)
      setOrderCreated(true)

    } catch (error: any) {
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
        window.location.href = data.approval_url
      } else {
        throw new Error('No PayPal approval URL received')
      }
    } catch (error: any) {
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
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
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
              Order Form
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: '300',
              marginBottom: '0.5rem',
              letterSpacing: '-0.02em'
            }}>
              {packageInfo.name}
            </h1>
            <p style={{
              fontSize: '1.5rem',
              color: 'rgba(255, 255, 255, 0.6)',
              fontWeight: '400'
            }}>
              ${packageInfo.price}
            </p>
          </div>

          {/* Order Form */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '3rem',
            backdropFilter: 'blur(10px)'
          }}>
            {!orderCreated ? (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  
                  {/* Design Style - FIXED DROPDOWN */}
                  <div>
                    <label style={{
                      display: 'block',
                      color: 'rgba(255, 255, 255, 0.8)',
                      marginBottom: '0.75rem',
                      fontSize: '0.9rem',
                      fontWeight: '400'
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
                        padding: '0.875rem 1rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '10px',
                        color: 'white',
                        fontSize: '0.95rem',
                        transition: 'all 0.3s ease',
                        appearance: 'none',
                        backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path fill='%23ffffff' d='M2 0L0 2h4zm0 5L0 3h4z'/></svg>")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                        backgroundSize: '12px'
                      }}
                      onFocus={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.08)'
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)'
                      }}
                      onBlur={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.05)'
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      <option value="" style={{ background: '#000000', color: 'white' }}>Select a style</option>
                      <option value="modern" style={{ background: '#000000', color: 'white' }}>Modern & Clean</option>
                      <option value="vibrant" style={{ background: '#000000', color: 'white' }}>Vibrant & Colorful</option>
                      <option value="minimal" style={{ background: '#000000', color: 'white' }}>Minimalist</option>
                      <option value="gaming" style={{ background: '#000000', color: 'white' }}>Gaming Theme</option>
                      <option value="elegant" style={{ background: '#000000', color: 'white' }}>Elegant & Professional</option>
                      <option value="custom" style={{ background: '#000000', color: 'white' }}>Custom (describe below)</option>
                    </select>
                  </div>

                  {/* Color Preferences */}
                  <div>
                    <label style={{
                      display: 'block',
                      color: 'rgba(255, 255, 255, 0.8)',
                      marginBottom: '0.75rem',
                      fontSize: '0.9rem',
                      fontWeight: '400'
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
                        padding: '0.875rem 1rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '10px',
                        color: 'white',
                        fontSize: '0.95rem',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.08)'
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)'
                      }}
                      onBlur={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.05)'
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                      }}
                    />
                  </div>

                  {/* Specific Requirements */}
                  <div>
                    <label style={{
                      display: 'block',
                      color: 'rgba(255, 255, 255, 0.8)',
                      marginBottom: '0.75rem',
                      fontSize: '0.9rem',
                      fontWeight: '400'
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
                        padding: '0.875rem 1rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '10px',
                        color: 'white',
                        fontSize: '0.95rem',
                        resize: 'vertical',
                        transition: 'all 0.3s ease',
                        fontFamily: 'inherit'
                      }}
                      onFocus={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.08)'
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)'
                      }}
                      onBlur={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.05)'
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                      }}
                    />
                  </div>

                  {/* References */}
                  <div>
                    <label style={{
                      display: 'block',
                      color: 'rgba(255, 255, 255, 0.8)',
                      marginBottom: '0.75rem',
                      fontSize: '0.9rem',
                      fontWeight: '400'
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
                        padding: '0.875rem 1rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '10px',
                        color: 'white',
                        fontSize: '0.95rem',
                        resize: 'vertical',
                        transition: 'all 0.3s ease',
                        fontFamily: 'inherit'
                      }}
                      onFocus={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.08)'
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)'
                      }}
                      onBlur={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.05)'
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                      }}
                    />
                  </div>

                  {/* Deadline */}
                  <div>
                    <label style={{
                      display: 'block',
                      color: 'rgba(255, 255, 255, 0.8)',
                      marginBottom: '0.75rem',
                      fontSize: '0.9rem',
                      fontWeight: '400'
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
                        padding: '0.875rem 1rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '10px',
                        color: 'white',
                        fontSize: '0.95rem',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.08)'
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)'
                      }}
                      onBlur={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.05)'
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: '#ffffff',
                      padding: '0.875rem 2rem',
                      borderRadius: '10px',
                      fontSize: '0.95rem',
                      fontWeight: '400',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      opacity: loading ? 0.6 : 1,
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      if (!loading) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)'
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!loading) {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                      }
                    }}
                  >
                    {loading ? 'Creating Order...' : `Continue to Payment - $${packageInfo.price}`}
                  </button>
                </div>
              </form>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.2)',
                  borderRadius: '16px',
                  padding: '2rem',
                  marginBottom: '2rem'
                }}>
                  <h3 style={{
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: '400',
                    marginBottom: '1rem'
                  }}>
                    Order Created Successfully!
                  </h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '0.5rem' }}>
                    Order ID: {currentOrderId}
                  </p>
                  <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    Complete your payment to start your project
                  </p>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={paypalLoading}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: '#ffffff',
                    padding: '0.875rem 2rem',
                    borderRadius: '10px',
                    fontSize: '0.95rem',
                    fontWeight: '400',
                    cursor: paypalLoading ? 'not-allowed' : 'pointer',
                    opacity: paypalLoading ? 0.6 : 1,
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseOver={(e) => {
                    if (!paypalLoading) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)'
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!paypalLoading) {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                    }
                  }}
                >
                  {paypalLoading ? (
                    <>
                      <div className="spinner"></div>
                      Redirecting to PayPal...
                    </>
                  ) : (
                    <>
                      Pay with PayPal - ${packageInfo.price}
                    </>
                  )}
                </button>

                <p style={{
                  color: 'rgba(255, 255, 255, 0.4)',
                  fontSize: '0.875rem',
                  marginTop: '1rem'
                }}>
                  You'll be redirected to PayPal to complete your payment
                </p>
              </div>
            )}
          </div>
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

        .spinner {
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid #ffffff;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Fix dropdown styling for all browsers */
        select option {
          background: #000000 !important;
          color: white !important;
        }

        select:focus {
          outline: none;
        }
      `}</style>
    </div>
  )
}