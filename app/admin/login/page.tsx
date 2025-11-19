// app/admin/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Simple hardcoded admin credentials
      const adminCredentials = [
        { email: 'support@keamvisuals.com', password: 'admin123' },
        { email: 'admin@keamvisuals.com', password: 'keamadmin2024' }
      ]

      const isValid = adminCredentials.some(cred => 
        cred.email === email && cred.password === password
      )

      if (isValid) {
        // Store admin session
        localStorage.setItem('adminAuthenticated', 'true')
        localStorage.setItem('adminEmail', email)
        router.push('/admin/dashboard')
      } else {
        setError('Invalid admin credentials')
      }
    } catch (err) {
      setError('Login failed')
    } finally {
      setLoading(false)
    }
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

      {/* LOGIN FORM */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        position: 'relative',
        zIndex: 100,
        padding: '2rem'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '20px',
          padding: '3rem',
          width: '100%',
          maxWidth: '450px',
          backdropFilter: 'blur(10px)'
        }}>
          {/* Small pill badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '50px',
            padding: '0.5rem 1.25rem',
            marginBottom: '2rem',
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
            Admin Access
          </div>

          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '300',
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em'
          }}>
            Admin Login
          </h1>
          
          <p style={{
            fontSize: '1rem',
            color: 'rgba(255, 255, 255, 0.6)',
            marginBottom: '2.5rem',
            lineHeight: '1.6',
            fontWeight: '400'
          }}>
            Access the admin dashboard to manage orders and customers
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{
                display: 'block',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '0.75rem',
                fontSize: '0.9rem',
                fontWeight: '400'
              }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                placeholder="admin@keamvisuals.com"
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

            <div>
              <label style={{
                display: 'block',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '0.75rem',
                fontSize: '0.9rem',
                fontWeight: '400'
              }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
                placeholder="Enter admin password"
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

            {error && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '10px',
                padding: '1rem',
                color: '#ef4444',
                textAlign: 'center',
                fontSize: '0.9rem',
                fontWeight: '400'
              }}>
                {error}
              </div>
            )}

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
              {loading ? 'Signing in...' : 'Sign in as Admin'}
            </button>
          </form>

          <div style={{
            marginTop: '2rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center'
          }}>
            <p style={{
              color: 'rgba(255, 255, 255, 0.4)',
              fontSize: '0.8rem',
              fontWeight: '300'
            }}>
              Restricted access • Authorized personnel only
            </p>
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

        input:focus {
          outline: none;
        }
      `}</style>
    </div>
  )
}