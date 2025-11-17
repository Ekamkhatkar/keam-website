'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthButton from '../../components/shared/AuthButton'
import { supabase } from '../../lib/supabase'
import './login.css'

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
    <div className="login-container">
      {/* Header */}
      <header className="nav">
        <h1 className="logo">KeamVisuals</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/services">Services</a>
          <a href="/projects">Projects</a>
        </nav>
        <a href="/signup" className="btn-primary">Get Started</a>
      </header>

      {/* Login Section */}
      <section className="login-section">
        <div className="login-card">
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Sign in to your KeamVisuals account</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="form-input"
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="form-input"
              />
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary login-btn"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <span>Or continue with</span>
          </div>

          {/* Social Auth */}
          <div className="social-auth">
            <AuthButton />
          </div>

          {/* Sign Up Link */}
          <div className="signup-link">
            <p>
              Don't have an account?{' '}
              <a href="/signup">Create account</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}