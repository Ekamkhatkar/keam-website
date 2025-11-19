'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalUsers: 0
  })
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  async function fetchDashboardData() {
    try {
      const { data: orders, error: ordersError } = await supabase
        .from('keam_visuals')
        .select('*')

      if (ordersError) throw ordersError

      const totalRevenue = orders
        ?.filter(order => order.payment_status === 'paid')
        ?.reduce((sum, order) => sum + (parseFloat(order.price) || 0), 0) || 0

      const pendingOrders = orders
        ?.filter(order => order.payment_status === 'unpaid' || order.status === 'pending')
        ?.length || 0

      const completedOrders = orders
        ?.filter(order => order.status === 'completed')
        ?.length || 0

      let usersCount = 0
      try {
        const { data: users, error: usersError } = await supabase
          .from('profiles')
          .select('id')
        
        if (!usersError && users) usersCount = users.length
      } catch (userError) {}

      setStats({
        totalOrders: orders?.length || 0,
        totalRevenue,
        pendingOrders,
        completedOrders,
        totalUsers: usersCount
      })

      const recent = orders
        ?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        ?.slice(0, 5) || []

      setRecentOrders(recent)
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      setStats({ totalOrders: 0, totalRevenue: 0, pendingOrders: 0, completedOrders: 0, totalUsers: 0 })
      setRecentOrders([])
    } finally {
      setLoading(false)
    }
  }

  const handleOrderClick = (orderId: string) => {
    router.push(`/admin/orders/${orderId}`)
  }

  const navigateToAllOrders = () => {
    router.push('/admin/orders')
  }

  if (loading) {
    return (
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
              Admin Dashboard
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontWeight: '300',
                letterSpacing: '-0.02em'
              }}>
                Admin Dashboard
              </h1>
              
              <button
                onClick={navigateToAllOrders}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#ffffff',
                  padding: '0.875rem 2rem',
                  borderRadius: '10px',
                  fontSize: '0.95rem',
                  fontWeight: '400',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
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
                View All Orders
              </button>
            </div>
            
            <p style={{
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.6)',
              maxWidth: '600px',
              lineHeight: '1.7',
              fontWeight: '400'
            }}>
              Manage orders, track revenue, and monitor business performance
            </p>
          </div>

          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            <StatCard 
              title="Total Revenue" 
              value={`$${stats.totalRevenue}`}
              color="green"
            />
            <StatCard 
              title="Total Orders" 
              value={stats.totalOrders.toString()}
              color="blue"
            />
            <StatCard 
              title="Pending Orders" 
              value={stats.pendingOrders.toString()}
              color="yellow"
            />
            <StatCard 
              title="Completed Orders" 
              value={stats.completedOrders.toString()}
              color="purple"
            />
            <StatCard 
              title="Total Users" 
              value={stats.totalUsers.toString()}
              color="indigo"
            />
          </div>

          {/* Recent Orders */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '2rem',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                fontSize: '1.75rem',
                fontWeight: '400',
                color: 'white',
                letterSpacing: '-0.01em'
              }}>
                Recent Orders
              </h2>
              <span style={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: '0.9rem',
                fontWeight: '400'
              }}>
                Click any order to view details & chat
              </span>
            </div>

            {recentOrders.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '3rem 2rem',
                color: 'rgba(255, 255, 255, 0.4)'
              }}>
                No orders found
              </div>
            ) : (
              <div style={{ overflow: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <th style={{
                        padding: '1rem',
                        textAlign: 'left',
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontWeight: '500',
                        fontSize: '0.9rem'
                      }}>Order ID</th>
                      <th style={{
                        padding: '1rem',
                        textAlign: 'left',
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontWeight: '500',
                        fontSize: '0.9rem'
                      }}>Package</th>
                      <th style={{
                        padding: '1rem',
                        textAlign: 'left',
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontWeight: '500',
                        fontSize: '0.9rem'
                      }}>Price</th>
                      <th style={{
                        padding: '1rem',
                        textAlign: 'left',
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontWeight: '500',
                        fontSize: '0.9rem'
                      }}>Status</th>
                      <th style={{
                        padding: '1rem',
                        textAlign: 'left',
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontWeight: '500',
                        fontSize: '0.9rem'
                      }}>Payment</th>
                      <th style={{
                        padding: '1rem',
                        textAlign: 'left',
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontWeight: '500',
                        fontSize: '0.9rem'
                      }}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr 
                        key={order.id} 
                        style={{
                          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onClick={() => handleOrderClick(order.id)}
                        onMouseOver={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                          e.currentTarget.style.transform = 'translateX(4px)'
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.background = 'transparent'
                          e.currentTarget.style.transform = 'translateX(0)'
                        }}
                      >
                        <td style={{
                          padding: '1rem',
                          color: 'white',
                          fontSize: '0.9rem',
                          fontWeight: '400'
                        }}>
                          {order.id?.slice(0, 8) || 'N/A'}...
                        </td>
                        <td style={{
                          padding: '1rem',
                          color: 'white',
                          fontSize: '0.9rem',
                          fontWeight: '400'
                        }}>
                          {order.package_type || 'N/A'}
                        </td>
                        <td style={{
                          padding: '1rem',
                          color: 'white',
                          fontSize: '0.9rem',
                          fontWeight: '400'
                        }}>
                          ${order.price || '0'}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: '500',
                            background: order.status === 'completed' 
                              ? 'rgba(34, 197, 94, 0.2)' 
                              : order.status === 'in_progress'
                              ? 'rgba(59, 130, 246, 0.2)'
                              : 'rgba(245, 158, 11, 0.2)',
                            color: order.status === 'completed' 
                              ? '#22c55e' 
                              : order.status === 'in_progress'
                              ? '#3b82f6'
                              : '#f59e0b',
                            border: order.status === 'completed' 
                              ? '1px solid rgba(34, 197, 94, 0.3)' 
                              : order.status === 'in_progress'
                              ? '1px solid rgba(59, 130, 246, 0.3)'
                              : '1px solid rgba(245, 158, 11, 0.3)'
                          }}>
                            {order.status?.replace('_', ' ') || 'pending'}
                          </span>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: '500',
                            background: order.payment_status === 'paid' 
                              ? 'rgba(34, 197, 94, 0.2)' 
                              : 'rgba(239, 68, 68, 0.2)',
                            color: order.payment_status === 'paid' 
                              ? '#22c55e' 
                              : '#ef4444',
                            border: order.payment_status === 'paid' 
                              ? '1px solid rgba(34, 197, 94, 0.3)' 
                              : '1px solid rgba(239, 68, 68, 0.3)'
                          }}>
                            {order.payment_status || 'unpaid'}
                          </span>
                        </td>
                        <td style={{
                          padding: '1rem',
                          color: 'rgba(255, 255, 255, 0.6)',
                          fontSize: '0.9rem',
                          fontWeight: '400'
                        }}>
                          {order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

function StatCard({ title, value, color }: { title: string; value: string; color: string }) {
  const colorClasses = {
    green: { bg: 'rgba(34, 197, 94, 0.1)', border: 'rgba(34, 197, 94, 0.2)', text: '#22c55e' },
    blue: { bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.2)', text: '#3b82f6' },
    yellow: { bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.2)', text: '#f59e0b' },
    purple: { bg: 'rgba(139, 92, 246, 0.1)', border: 'rgba(139, 92, 246, 0.2)', text: '#8b5cf6' },
    indigo: { bg: 'rgba(99, 102, 241, 0.1)', border: 'rgba(99, 102, 241, 0.2)', text: '#6366f1' }
  }

  const colors = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '16px',
      padding: '2rem',
      textAlign: 'center',
      transition: 'all 0.4s ease',
      backdropFilter: 'blur(10px)'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'
      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
      e.currentTarget.style.transform = 'translateY(-4px)'
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'
      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
      e.currentTarget.style.transform = 'translateY(0)'
    }}
    >
      <div style={{
        fontSize: '2.5rem',
        fontWeight: '300',
        color: colors.text,
        marginBottom: '0.5rem'
      }}>
        {value}
      </div>
      <div style={{
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: '0.95rem',
        fontWeight: '400'
      }}>
        {title}
      </div>
    </div>
  )
}