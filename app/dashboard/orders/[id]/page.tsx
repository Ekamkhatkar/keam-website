'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../../lib/supabase'
import { useAuth } from '../../../../contexts/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    if (user) {
      fetchOrders()
    }
  }, [user])

  async function fetchOrders() {
    const { data, error } = await supabase
      .from('keam_visuals')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false })

    if (data) {
      setOrders(data)
    }
    setLoading(false)
  }

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true
    if (activeTab === 'active') return order.status !== 'completed'
    if (activeTab === 'completed') return order.status === 'completed'
    return true
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'rgba(34, 197, 94, 0.2)'
      case 'in_progress': return 'rgba(59, 130, 246, 0.2)'
      case 'revision': return 'rgba(245, 158, 11, 0.2)'
      default: return 'rgba(255, 255, 255, 0.1)'
    }
  }

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'completed': return '#22c55e'
      case 'in_progress': return '#3b82f6'
      case 'revision': return '#f59e0b'
      default: return 'white'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'rgba(34, 197, 94, 0.2)'
      case 'refunded': return 'rgba(245, 158, 11, 0.2)'
      default: return 'rgba(239, 68, 68, 0.2)'
    }
  }

  const getPaymentStatusTextColor = (status: string) => {
    switch (status) {
      case 'paid': return '#22c55e'
      case 'refunded': return '#f59e0b'
      default: return '#ef4444'
    }
  }

  if (loading) {
    return (
      <div style={{
        background: '#000000',
        color: '#ffffff',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Background Effects */}
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
        </div>
        <div style={{ position: 'relative', zIndex: 100, color: 'white' }}>
          Loading your orders...
        </div>
      </div>
    )
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
      
      {/* BACKGROUND SMOKE EFFECTS - SAME AS HOMEPAGE */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: '#000000'
      }}>
        {/* Main fast-moving smoke stripe */}
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
          transformOrigin: 'center center',
          willChange: 'transform'
        }} />
        
        {/* Secondary flowing element for depth */}
        <div style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-30%',
          width: '150%',
          height: '100%',
          background: 'radial-gradient(ellipse 700px 350px at 50% 50%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 30%, transparent 60%)',
          filter: 'blur(90px)',
          animation: 'fastSmoke2 10s ease-in-out infinite',
          transformOrigin: 'center center',
          willChange: 'transform'
        }} />
        
        {/* Subtle ambient glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
          filter: 'blur(120px)',
          transform: 'translate(-50%, -50%)',
          animation: 'subtleGlow 12s ease-in-out infinite'
        }} />
      </div>

      {/* MAIN CONTENT */}
      <div style={{ position: 'relative', zIndex: 100, paddingTop: '100px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          
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
              Your Design Projects
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: '300',
              marginBottom: '1rem',
              letterSpacing: '-0.02em'
            }}>
              Order Dashboard
            </h1>
            
            <p style={{
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.6)',
              maxWidth: '600px',
              lineHeight: '1.7',
              fontWeight: '400'
            }}>
              Manage your design projects and track progress in real-time
            </p>
          </div>

          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '300',
                marginBottom: '0.5rem'
              }}>
                {orders.length}
              </div>
              <div style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '0.95rem'
              }}>
                Total Orders
              </div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '300',
                marginBottom: '0.5rem'
              }}>
                {orders.filter(o => o.status === 'in_progress').length}
              </div>
              <div style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '0.95rem'
              }}>
                In Progress
              </div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '300',
                marginBottom: '0.5rem'
              }}>
                {orders.filter(o => o.status === 'completed').length}
              </div>
              <div style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '0.95rem'
              }}>
                Completed
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '2rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '1rem'
          }}>
            {[
              { id: 'all', label: 'All Orders', count: orders.length },
              { id: 'active', label: 'Active', count: orders.filter(o => o.status !== 'completed').length },
              { id: 'completed', label: 'Completed', count: orders.filter(o => o.status === 'completed').length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '10px',
                  fontSize: '0.95rem',
                  fontWeight: '400',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseOver={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                  }
                }}
                onMouseOut={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                  }
                }}
              >
                {tab.label}
                <span style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  padding: '0.25rem 0.5rem',
                  fontSize: '0.8rem',
                  minWidth: '1.5rem'
                }}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Orders Grid */}
          {filteredOrders.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              color: 'rgba(255, 255, 255, 0.5)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '400',
                marginBottom: '1rem'
              }}>
                No orders found
              </h3>
              <p style={{
                marginBottom: '2rem',
                color: 'rgba(255, 255, 255, 0.6)'
              }}>
                {activeTab === 'all' 
                  ? "You haven't placed any orders yet."
                  : `No ${activeTab} orders found.`
                }
              </p>
              {activeTab === 'all' && (
                <a href="/prices" style={{
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#ffffff',
                  padding: '0.875rem 2rem',
                  borderRadius: '10px',
                  fontSize: '0.95rem',
                  fontWeight: '400',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'inline-block'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                }}
                >
                  Browse Packages
                </a>
              )}
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gap: '1.5rem'
            }}>
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px',
                    padding: '2rem',
                    transition: 'all 0.4s ease',
                    cursor: 'pointer'
                  }}
                  onClick={() => router.push(`/dashboard/orders/${order.id}`)}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem'
                  }}>
                    <div>
                      <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: '400',
                        marginBottom: '0.5rem',
                        letterSpacing: '-0.01em'
                      }}>
                        {order.package_type}
                      </h3>
                      <p style={{
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontSize: '0.95rem'
                      }}>
                        Order #{order.id.slice(0, 8)} • {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <span style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        background: getStatusColor(order.status),
                        color: getStatusTextColor(order.status),
                        border: `1px solid ${getStatusTextColor(order.status)}30`
                      }}>
                        {order.status ? order.status.replace('_', ' ') : 'pending'}
                      </span>
                      
                      <span style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        background: getPaymentStatusColor(order.payment_status),
                        color: getPaymentStatusTextColor(order.payment_status),
                        border: `1px solid ${getPaymentStatusTextColor(order.payment_status)}30`
                      }}>
                        {order.payment_status || 'unpaid'}
                      </span>
                    </div>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    gap: '2rem',
                    alignItems: 'end'
                  }}>
                    <div>
                      <p style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        marginBottom: '1rem',
                        fontSize: '0.95rem',
                        lineHeight: '1.6'
                      }}>
                        <strong>Price:</strong> ${order.price}
                        {order.design_brief && (
                          <>
                            <br />
                            <strong>Style:</strong> {order.design_brief.designStyle}
                          </>
                        )}
                      </p>
                      
                      {order.admin_notes && (
                        <div style={{
                          background: 'rgba(139, 92, 246, 0.1)',
                          border: '1px solid rgba(139, 92, 246, 0.3)',
                          borderRadius: '8px',
                          padding: '1rem',
                          marginTop: '1rem'
                        }}>
                          <p style={{
                            color: '#8b5cf6',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            margin: 0
                          }}>
                            💬 Designer Note: {order.admin_notes}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/orders/${order.id}`)
                      }}
                      style={{
                        background: 'transparent',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        color: '#ffffff',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '10px',
                        fontSize: '0.9rem',
                        fontWeight: '400',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        whiteSpace: 'nowrap'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)'
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ANIMATIONS - SAME AS HOMEPAGE */}
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

        @keyframes subtleGlow {
          0%, 100% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }

        html {
          scroll-behavior: smooth;
        }

        ::selection {
          background: rgba(255, 255, 255, 0.1);
          color: white;
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