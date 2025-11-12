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

      // Redirect to dashboard on success
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
    <div style={{minHeight: '100vh', background: '#000000', color: 'white', paddingTop: '80px'}}>
      <div style={{maxWidth: '400px', margin: '0 auto', padding: '2rem 1rem'}}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '2rem'
        }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #c4c4c4ff, #414141ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            Sign In
          </h1>
          
          <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            <div>
              <label style={{
                display: 'block',
                color: 'white',
                marginBottom: '0.5rem',
                fontWeight: '600'
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
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '1rem'
                }}
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                color: 'white',
                marginBottom: '0.5rem',
                fontWeight: '600'
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
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '1rem'
                }}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '8px',
                padding: '1rem',
                color: '#ef4444',
                textAlign: 'center'
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #bbbbbbff, #3b3b3bff)',
                color: 'white',
                padding: '1rem 2rem',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Social Login Buttons */}
          <div style={{marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)'}}>
            <div style={{textAlign: 'center', color: '#9ca3af', marginBottom: '1rem'}}>
              Or continue with
            </div>
            <div style={{display: 'flex', gap: '1rem', justifyContent: 'center'}}>
              <AuthButton />
            </div>
          </div>

          {/* Sign Up Link */}
          <div style={{marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)'}}>
            <p style={{color: '#9ca3af', fontSize: '0.9rem', textAlign: 'center'}}>
              Don't have an account? <a href="/signup" style={{color: '#8b5cf6', textDecoration: 'none'}}>Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}