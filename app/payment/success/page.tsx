'use client'

import { useRouter } from 'next/navigation'
import { Suspense } from 'react'

function PaymentSuccessContent() {
  const router = useRouter()

  const goToOrderChat = () => {
    router.push('/dashboard')
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
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
          
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
              Payment Successful
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: '300',
              marginBottom: '1rem',
              letterSpacing: '-0.02em'
            }}>
              Payment Successful!
            </h1>
            
            <p style={{
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.6)',
              lineHeight: '1.7',
              fontWeight: '400'
            }}>
              Thank you for your order! Your payment has been processed successfully.
            </p>
          </div>

          {/* Content Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '3rem 2rem',
            backdropFilter: 'blur(10px)',
            marginBottom: '2rem'
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '1.5rem'
            }}>
              🎉
            </div>
            
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '400',
              marginBottom: '1rem',
              color: 'white'
            }}>
              Your project is now in progress
            </h2>
            
            <p style={{
              color: 'rgba(255, 255, 255, 0.6)',
              lineHeight: '1.6',
              marginBottom: '2rem'
            }}>
              We've received your order and will start working on it shortly. 
              You'll be able to track progress and communicate with our designers through your dashboard.
            </p>

            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              {/* CHAT BUTTON */}
              <button
                onClick={goToOrderChat}
                style={{
                  background: 'rgba(245, 245, 245, 0.2)',
                  border: '1px solid rgba(175, 175, 175, 0.3)',
                  color: '#b9b9b9ff',
                  padding: '0.875rem 2rem',
                  borderRadius: '10px',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(199, 199, 199, 0.3)'
                  e.currentTarget.style.borderColor = 'rgba(116, 116, 116, 0.5)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(138, 138, 138, 0.2)'
                  e.currentTarget.style.borderColor = 'rgba(146, 146, 146, 0.3)'
                }}
              >
                💬 Go to Order Chat
              </button>
              
              <button
                onClick={() => router.push('/dashboard')}
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
                Go to Dashboard
              </button>
              
              <button
                onClick={() => router.push('/work')}
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
                View Our Work
              </button>
            </div>
          </div>

          {/* Next Steps */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '2rem',
            textAlign: 'left'
          }}>
            <h3 style={{
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: '500',
              marginBottom: '1rem'
            }}>
              What happens next?
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{
                  background: 'rgba(34, 197, 94, 0.2)',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  flexShrink: 0
                }}>
                  1
                </div>
                <div>
                  <p style={{ color: 'white', fontWeight: '500', margin: '0 0 0.25rem 0' }}>
                    Order Review
                  </p>
                  <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: 0, fontSize: '0.9rem' }}>
                    Our team will review your design requirements
                  </p>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{
                  background: 'rgba(34, 197, 94, 0.2)',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  flexShrink: 0
                }}>
                  2
                </div>
                <div>
                  <p style={{ color: 'white', fontWeight: '500', margin: '0 0 0.25rem 0' }}>
                    Design Process
                  </p>
                  <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: 0, fontSize: '0.9rem' }}>
                    We'll start working on your design within 24 hours
                  </p>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{
                  background: 'rgba(34, 197, 94, 0.2)',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  flexShrink: 0
                }}>
                  3
                </div>
                <div>
                  <p style={{ color: 'white', fontWeight: '500', margin: '0 0 0.25rem 0' }}>
                    Communication
                  </p>
                  <p style={{ color: 'rgba(255, 255, 255, 0.6)', margin: 0, fontSize: '0.9rem' }}>
                    Chat with our designers directly through your order page
                  </p>
                </div>
              </div>
            </div>
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
      `}</style>
    </div>
  )
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={
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
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}