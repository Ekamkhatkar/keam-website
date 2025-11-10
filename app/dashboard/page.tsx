'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'

export default function Dashboard() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchOrders()
    } else {
      setLoading(false)
    }
  }, [user])

  async function fetchOrders() {
    if (!user) return
    
    const { data, error } = await supabase
      .from('keam_visuals')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (data) setOrders(data)
    setLoading(false)
  }

  const totalOrders = orders.length
  const activeProjects = orders.filter(order => order.status === 'in_progress' || order.status === 'pending').length
  const completed = orders.filter(order => order.status === 'completed').length

  return (
    <div style={{minHeight: '100vh', background: '#000000', color: 'white', paddingTop: '80px'}}>
      <div style={{maxWidth: '1400px', margin: '0 auto', padding: '2rem 1rem'}}>
        
        {/* Modern Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem',
          padding: '0 1rem'
        }}>
          <h1 style={{
            fontSize: '4rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #858585ff, #5e5e5eff, #1f1f1fff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}>
            Your Orders
          </h1>
          <p style={{
            color: '#9ca3af', 
            fontSize: '1.25rem',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Manage your design projects and track progress in one place
          </p>
        </div>

        {/* Sidebar + Main Content Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '300px 1fr',
          gap: '2rem',
          alignItems: 'start'
        }}>
          
          {/* Sidebar Stats */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            {/* Quick Stats Card */}
            <div className="glow-card" style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '2rem',
              backdropFilter: 'blur(10px)'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                color: 'white'
              }}>
                Quick Stats
              </h3>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #e2aaaaff, #444444ff)'
                  }}></div>
                  <div>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: 'white'
                    }}>
                      {totalOrders}
                    </div>
                    <div style={{color: '#9ca3af', fontSize: '0.9rem'}}>
                      Total Orders
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #222222ff, #fbff00ff)'
                  }}></div>
                  <div>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: 'white'
                    }}>
                      {activeProjects}
                    </div>
                    <div style={{color: '#9ca3af', fontSize: '0.9rem'}}>
                      In Progress
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #10b981, #059669)'
                  }}></div>
                  <div>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: 'white'
                    }}>
                      {completed}
                    </div>
                    <div style={{color: '#9ca3af', fontSize: '0.9rem'}}>
                      Completed
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="glow-card" style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(121, 121, 121, 0.1))',
              border: '1px solid rgba(189, 189, 189, 0.3)',
              borderRadius: '20px',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{fontSize: '2.5rem', marginBottom: '1rem'}}>🚀</div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '1rem',
                color: 'white'
              }}>
                Ready for your next project?
              </h3>
              <a 
                href="/prices" 
                style={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, #8f8f8fff, #353535ff)',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  width: '100%'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Browse Packages
              </a>
            </div>
          </div>

          {/* Main Content */}
          <div>
            {/* Orders Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '600',
                color: 'white'
              }}>
                Your Projects
              </h2>
              <div style={{
                color: '#9ca3af',
                fontSize: '0.9rem'
              }}>
                {orders.length} {orders.length === 1 ? 'project' : 'projects'}
              </div>
            </div>

            {/* Orders Grid */}
            {loading ? (
              <div style={{
                textAlign: 'center',
                color: '#9ca3af',
                padding: '4rem'
              }}>
                Loading your projects...
              </div>
            ) : orders.length === 0 ? (
              <div className="glow-card" style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                padding: '4rem 2rem',
                textAlign: 'center'
              }}>
                <div style={{fontSize: '4rem', marginBottom: '1.5rem'}}>🎨</div>
                <h3 style={{
                  fontSize: '1.75rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: 'white'
                }}>
                  No projects yet
                </h3>
                <p style={{
                  color: '#9ca3af',
                  marginBottom: '2rem',
                  fontSize: '1.1rem'
                }}>
                  Start your design journey with a custom package
                </p>
                <a 
                  href="/prices" 
                  style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #777777ff, #333333ff)',
                    color: 'white',
                    padding: '1rem 2rem',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  Get Started
                </a>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
                gap: '1.5rem'
              }}>
                {orders.map((order) => (
                  <div 
                    key={order.id}
                    className="glow-card"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px',
                      padding: '1.5rem',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = '#535353ff'
                      e.currentTarget.style.transform = 'translateY(-4px)'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                    onClick={() => window.location.href = `/dashboard/orders/${order.id}`}
                  >
                    {/* Status Indicator */}
                    <div style={{
                      position: 'absolute',
                      top: '0',
                      right: '0',
                      width: '100%',
                      height: '4px',
                      background: order.status === 'completed' 
                        ? 'linear-gradient(90deg, #10b981, #059669)' 
                        : order.status === 'in_progress'
                        ? 'linear-gradient(90deg, #60a5fa, #3b82f6)'
                        : 'linear-gradient(90deg, #fbbf24, #f59e0b)'
                    }}></div>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '1rem'
                    }}>
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        color: 'white',
                        margin: 0
                      }}>
                        {order.package_type}
                      </h3>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        ...(order.status === 'completed' ? {
                          background: 'rgba(34, 197, 94, 0.2)',
                          color: '#4ade80'
                        } : order.status === 'in_progress' ? {
                          background: 'rgba(59, 130, 246, 0.2)',
                          color: '#60a5fa'
                        } : {
                          background: 'rgba(234, 179, 8, 0.2)',
                          color: '#fbbf24'
                        })
                      }}>
                        {(order.status || 'pending').replace('_', ' ')}
                      </span>
                    </div>

                    <div style={{
                      color: '#9ca3af',
                      fontSize: '0.9rem',
                      marginBottom: '1rem'
                    }}>
                      ${order.price} • {new Date(order.created_at).toLocaleDateString()}
                    </div>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        color: '#797979ff',
                        fontSize: '0.8rem',
                        fontWeight: '600'
                      }}>
                        View Details →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}