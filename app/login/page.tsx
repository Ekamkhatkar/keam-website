'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthButton from '../../components/shared/AuthButton'
import { supabase } from '../../lib/supabase'

export default function Login() {
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })

      if (error) throw error

      if (data.user) {
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err) {
      setError('Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #000000 0%, #1a0000 50%, #000000 100%)',
      color: 'white', 
      paddingTop: '80px',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Animated Background Glows */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite',
        filter: 'blur(20px)'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '10%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(185, 28, 28, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse',
        filter: 'blur(15px)'
      }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(239, 68, 68, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 10s ease-in-out infinite',
        filter: 'blur(25px)',
        transform: 'translate(-50%, -50%)'
      }} />
      
      <div style={{
        maxWidth: '440px', 
        margin: '0 auto', 
        padding: '2rem 1rem',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Glassmorphic Card */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.8)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '20px',
          padding: '3rem 2.5rem',
          backdropFilter: 'blur(10px)',
          boxShadow: `
            0 20px 40px rgba(239, 68, 68, 0.1), 
            0 0 80px rgba(185, 28, 28, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `,
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Top Accent Glow */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #ef4444, transparent)',
            boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)'
          }} />
          
          {/* Header */}
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #ffffff 0%, #ef4444 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
            marginBottom: '0.5rem',
            textShadow: '0 0 30px rgba(239, 68, 68, 0.3)'
          }}>
            Welcome Back
          </h1>
          
          <p style={{
            color: '#9ca3af',
            textAlign: 'center',
            marginBottom: '2.5rem',
            fontSize: '1.1rem',
            fontWeight: '400'
          }}>
            Sign in to your account
          </p>
          
          {/* Login Form */}
          <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
            {/* Email Input */}
            <div>
              <label style={{
                display: 'block',
                color: 'white',
                marginBottom: '0.75rem',
                fontWeight: '600',
                fontSize: '1rem'
              }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  background: 'rgba(239, 68, 68, 0.05)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
                placeholder="your@email.com"
                onFocus={(e) => {
                  e.target.style.background = 'rgba(239, 68, 68, 0.1)'
                  e.target.style.borderColor = 'rgba(239, 68, 68, 0.5)'
                  e.target.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.background = 'rgba(239, 68, 68, 0.05)'
                  e.target.style.borderColor = 'rgba(239, 68, 68, 0.3)'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            {/* Password Input */}
            <div>
              <label style={{
                display: 'block',
                color: 'white',
                marginBottom: '0.75rem',
                fontWeight: '600',
                fontSize: '1rem'
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
                  padding: '1rem 1.25rem',
                  background: 'rgba(239, 68, 68, 0.05)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
                placeholder="••••••••"
                onFocus={(e) => {
                  e.target.style.background = 'rgba(239, 68, 68, 0.1)'
                  e.target.style.borderColor = 'rgba(239, 68, 68, 0.5)'
                  e.target.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.background = 'rgba(239, 68, 68, 0.05)'
                  e.target.style.borderColor = 'rgba(239, 68, 68, 0.3)'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '12px',
                padding: '1.25rem',
                color: '#ef4444',
                textAlign: 'center',
                fontSize: '1rem',
                fontWeight: '500',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}>
                ⚠️ {error}
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: loading 
                  ? 'rgba(239, 68, 68, 0.4)' 
                  : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                color: 'white',
                padding: '1.25rem 2rem',
                border: 'none',
                borderRadius: '14px',
                fontSize: '1.1rem',
                fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                transition: 'all 0.3s ease',
                boxShadow: loading 
                  ? 'none' 
                  : '0 8px 25px rgba(239, 68, 68, 0.3), 0 0 0 1px rgba(239, 68, 68, 0.2)',
                position: 'relative',
                overflow: 'hidden',
                fontFamily: 'inherit',
                transform: 'scale(1)'
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1)'
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(239, 68, 68, 0.4), 0 0 0 1px rgba(239, 68, 68, 0.3)'
                }
              }}
              onMouseOut={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(239, 68, 68, 0.3), 0 0 0 1px rgba(239, 68, 68, 0.2)'
                }
              }}
              onMouseDown={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(0) scale(0.97)'
                }
              }}
              onMouseUp={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1)'
                }
              }}
            >
              {loading ? (
                <>
                  <span style={{opacity: 0}}>Sign In</span>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '20px',
                    height: '20px',
                    border: '2px solid transparent',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Social Login Section */}
          <div style={{
            marginTop: '2.5rem', 
            paddingTop: '2.5rem', 
            borderTop: '1px solid rgba(239, 68, 68, 0.2)'
          }}>
            <div style={{
              textAlign: 'center', 
              color: '#9ca3af', 
              marginBottom: '1.5rem',
              fontSize: '1rem',
              fontWeight: '500'
            }}>
              Or continue with
            </div>
            <div style={{
              display: 'flex', 
              gap: '1rem', 
              justifyContent: 'center'
            }}>
              <AuthButton />
            </div>
          </div>

          {/* Sign Up Link */}
          <div style={{
            marginTop: '2.5rem', 
            paddingTop: '2rem', 
            borderTop: '1px solid rgba(239, 68, 68, 0.2)'
          }}>
            <p style={{
              color: '#9ca3af', 
              fontSize: '1rem', 
              textAlign: 'center',
              fontWeight: '400'
            }}>
              Don't have an account?{' '}
              <a 
                href="/signup" 
                style={{
                  color: '#ef4444', 
                  textDecoration: 'none',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.textShadow = '0 0 10px rgba(239, 68, 68, 0.5)'
                  e.currentTarget.style.color = '#f87171'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.textShadow = 'none'
                  e.currentTarget.style.color = '#ef4444'
                }}
              >
                Create account
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
          }
        }
        
        @keyframes spin {
          0% { 
            transform: translate(-50%, -50%) rotate(0deg); 
          }
          100% { 
            transform: translate(-50%, -50%) rotate(360deg); 
          }
        }
      `}</style>
    </div>
  )
}