'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabase'

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState('Processing your payment...')
  const [orderId, setOrderId] = useState<string>('')

  useEffect(() => {
    const orderId = searchParams.get('order_id')
    
    if (!orderId) {
      setStatus('No order ID found')
      return
    }

    setOrderId(orderId)
    updateOrderStatus(orderId)
  }, [searchParams])

  const updateOrderStatus = async (orderId: string) => {
    try {
      // Update the order payment status in database
      const { error } = await supabase
        .from('keam_visuals')
        .update({ 
          payment_status: 'paid',
          status: 'in_progress'
        })
        .eq('id', orderId)

      if (error) {
        console.error('Error updating order:', error)
        setStatus('Payment verified but order update failed')
        return
      }

      setStatus('Payment successful! Redirecting to chat...')
      
      // Redirect to chat after 2 seconds
      setTimeout(() => {
        router.push(`/dashboard/orders/${orderId}`)
      }, 2000)

    } catch (error) {
      console.error('Error:', error)
      setStatus('Error processing payment')
    }
  }

  return (
    <div style={{minHeight: '100vh', background: '#000000', color: 'white', paddingTop: '80px'}}>
      <div style={{maxWidth: '600px', margin: '0 auto', padding: '2rem 1rem', textAlign: 'center'}}>
        <div className="glow-card" style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '3rem 2rem'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'rgba(34, 197, 94, 0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem',
            border: '2px solid rgba(34, 197, 94, 0.5)'
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '1rem'
          }}>
            Payment Successful!
          </h1>
          
          <p style={{
            color: '#9ca3af',
            fontSize: '1.1rem',
            marginBottom: '2rem'
          }}>
            {status}
          </p>

          {orderId && (
            <p style={{
              color: '#6b7280',
              fontSize: '0.9rem'
            }}>
              Order ID: {orderId}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<div style={{minHeight: '100vh', background: '#000000', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  )
}