'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
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
      // Fetch orders
      const { data: orders, error: ordersError } = await supabase
        .from('keam_visuals')
        .select('*')

      if (ordersError) {
        throw ordersError
      }

      // Calculate stats safely
      const totalRevenue = orders
        ?.filter(order => order.payment_status === 'paid')
        ?.reduce((sum, order) => sum + (parseFloat(order.price) || 0), 0) || 0

      const pendingOrders = orders
        ?.filter(order => order.payment_status === 'unpaid' || order.status === 'pending')
        ?.length || 0

      const completedOrders = orders
        ?.filter(order => order.status === 'completed')
        ?.length || 0

      // Try to fetch users, but don't fail if it errors
      let usersCount = 0
      try {
        const { data: users, error: usersError } = await supabase
          .from('profiles')
          .select('id')
        
        if (!usersError && users) {
          usersCount = users.length
        }
      } catch (userError) {
      }

      setStats({
        totalOrders: orders?.length || 0,
        totalRevenue,
        pendingOrders,
        completedOrders,
        totalUsers: usersCount
      })

      // Get recent orders
      const recent = orders
        ?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        ?.slice(0, 5) || []

      setRecentOrders(recent)
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      // Set default values on error
      setStats({
        totalOrders: 0,
        totalRevenue: 0,
        pendingOrders: 0,
        completedOrders: 0,
        totalUsers: 0
      })
      setRecentOrders([])
    } finally {
      setLoading(false)
    }
  }

  const handleOrderClick = (orderId: string) => {
    // FIXED: Send admins to admin order page, not customer page
    router.push(`/admin/orders/${orderId}`)
  }

  const navigateToAllOrders = () => {
    router.push('/admin/orders')
  }

  if (loading) {
    return (
      <div style={{padding: '2rem', textAlign: 'center'}}>
        <div style={{color: 'white'}}>Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div style={{maxWidth: '1400px', margin: '0 auto', padding: '2rem'}}>
      {/* Header */}
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <h1 style={{fontSize: '2.5rem', fontWeight: 'bold', color: 'white'}}>
          Admin Dashboard
        </h1>
        <button
          onClick={navigateToAllOrders}
          style={{
            background: 'rgba(139, 92, 246, 0.2)',
            border: '1px solid rgba(139, 92, 246, 0.5)',
            color: '#8b5cf6',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(139, 92, 246, 0.3)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)'
          }}
        >
          View All Orders
        </button>
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
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '2rem'
      }}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: 'white'
          }}>
            Recent Orders
          </h2>
          <span style={{color: '#9ca3af', fontSize: '0.9rem'}}>
            Click any order to view details & chat
          </span>
        </div>

        {recentOrders.length === 0 ? (
          <p style={{color: '#9ca3af', textAlign: 'center', padding: '2rem'}}>
            No orders found
          </p>
        ) : (
          <div style={{overflow: 'auto'}}>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead>
                <tr style={{borderBottom: '1px solid rgba(255, 255, 255, 0.1)'}}>
                  <th style={{padding: '1rem', textAlign: 'left', color: '#9ca3af', fontWeight: '500'}}>Order ID</th>
                  <th style={{padding: '1rem', textAlign: 'left', color: '#9ca3af', fontWeight: '500'}}>Package</th>
                  <th style={{padding: '1rem', textAlign: 'left', color: '#9ca3af', fontWeight: '500'}}>Price</th>
                  <th style={{padding: '1rem', textAlign: 'left', color: '#9ca3af', fontWeight: '500'}}>Status</th>
                  <th style={{padding: '1rem', textAlign: 'left', color: '#9ca3af', fontWeight: '500'}}>Payment</th>
                  <th style={{padding: '1rem', textAlign: 'left', color: '#9ca3af', fontWeight: '500'}}>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr 
                    key={order.id} 
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease'
                    }}
                    onClick={() => handleOrderClick(order.id)}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    <td style={{padding: '1rem', color: 'white', fontSize: '0.9rem'}}>
                      {order.id?.slice(0, 8) || 'N/A'}...
                    </td>
                    <td style={{padding: '1rem', color: 'white', fontSize: '0.9rem'}}>
                      {order.package_type || 'N/A'}
                    </td>
                    <td style={{padding: '1rem', color: 'white', fontSize: '0.9rem'}}>
                      ${order.price || '0'}
                    </td>
                    <td style={{padding: '1rem'}}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        background: order.status === 'completed' 
                          ? 'rgba(34, 197, 94, 0.2)' 
                          : order.status === 'in_progress'
                          ? 'rgba(59, 130, 246, 0.2)'
                          : 'rgba(245, 158, 11, 0.2)',
                        color: order.status === 'completed' 
                          ? '#22c55e' 
                          : order.status === 'in_progress'
                          ? '#3b82f6'
                          : '#f59e0b'
                      }}>
                        {order.status?.replace('_', ' ') || 'pending'}
                      </span>
                    </td>
                    <td style={{padding: '1rem'}}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        background: order.payment_status === 'paid' 
                          ? 'rgba(34, 197, 94, 0.2)' 
                          : 'rgba(239, 68, 68, 0.2)',
                        color: order.payment_status === 'paid' 
                          ? '#22c55e' 
                          : '#ef4444'
                      }}>
                        {order.payment_status || 'unpaid'}
                      </span>
                    </td>
                    <td style={{padding: '1rem', color: '#9ca3af', fontSize: '0.9rem'}}>
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
  )
}

function StatCard({ title, value, color }: { title: string; value: string; color: string }) {
  const colorClasses = {
    green: { bg: 'rgba(34, 197, 94, 0.1)', border: 'rgba(34, 197, 94, 0.3)', text: '#22c55e' },
    blue: { bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.3)', text: '#3b82f6' },
    yellow: { bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.3)', text: '#f59e0b' },
    purple: { bg: 'rgba(139, 92, 246, 0.1)', border: 'rgba(139, 92, 246, 0.3)', text: '#8b5cf6' },
    indigo: { bg: 'rgba(99, 102, 241, 0.1)', border: 'rgba(99, 102, 241, 0.3)', text: '#6366f1' }
  }

  const colors = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue

  return (
    <div style={{
      background: colors.bg,
      border: `1px solid ${colors.border}`,
      borderRadius: '12px',
      padding: '1.5rem',
      textAlign: 'center'
    }}>
      <div style={{
        fontSize: '2rem',
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: '0.5rem'
      }}>
        {value}
      </div>
      <div style={{
        color: '#9ca3af',
        fontSize: '0.9rem',
        fontWeight: '500'
      }}>
        {title}
      </div>
    </div>
  )
}