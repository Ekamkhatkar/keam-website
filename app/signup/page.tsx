'use client'

import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { signOut } from '../../lib/auth-client'
import { signInWithDiscord, signInWithGoogle } from '../../lib/auth-client'

export default function Signup() {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const handleDiscordSignup = async () => {
    const { data, error } = await signInWithDiscord()
    if (error) {
      console.error('Discord signup error:', error)
      alert('Discord signup failed. Please try again.')
    }
  }

  const handleGoogleSignup = async () => {
    const { data, error } = await signInWithGoogle()
    if (error) {
      console.error('Google signup error:', error)
      alert('Google signup failed. Please try again.')
    }
  }

  return (
    <div>
      {/* Header - FIXED WITH SAFE USER ACCESS */}
      <header className="header">
        <div className="container" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div className="gradient-text" style={{fontSize: '1.5rem', fontWeight: 'bold'}}>KeamVisuals</div>
          
          <div style={{display: 'flex', alignItems: 'center', gap: '2rem'}}>
            <nav style={{display: 'flex', gap: '2rem'}}>
              <a href="/" style={{color: 'white', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500'}}>Home</a>
              <a href="/work" style={{color: 'white', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500'}}>Work</a>
              <a href="/prices" style={{color: 'white', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500'}}>Prices</a>
              {!user && (
                <a href="/login" style={{color: 'white', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500'}}>Login</a>
              )}
            </nav>
            
            {user && (
              <div style={{position: 'relative'}}>
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '14px'
                  }}>
                    {user?.email?.charAt(0).toUpperCase() ?? 'U'}
                  </div>
                  {user?.email ?? 'User'}
                </button>

                {isOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '8px',
                    background: 'rgba(0,0,0,0.9)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    padding: '8px',
                    minWidth: '200px',
                    backdropFilter: 'blur(10px)',
                    zIndex: 1000
                  }}>
                    <div style={{ padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <p style={{ fontWeight: 'bold', color: 'white' }}>{user?.email}</p>
                    </div>
                    <a 
                      href="/dashboard" 
                      style={{
                        display: 'block',
                        padding: '8px 12px',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '4px'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                      onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      My Orders
                    </a>
                    <button
                      onClick={() => {
                        signOut()
                        setIsOpen(false)
                      }}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        textAlign: 'left',
                        cursor: 'pointer',
                        borderRadius: '4px'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                      onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Rest of your signup page content */}
      <section className="section" style={{paddingTop: '120px'}}>
        <div className="container">
          <div style={{maxWidth: '400px', margin: '0 auto'}}>
            <div className="glow-card">
              <h1 style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center', color: 'white'}}>Create Account</h1>
              
              <div style={{marginBottom: '1.5rem'}}>
                <label style={{display: 'block', color: 'white', marginBottom: '0.5rem', fontWeight: '500'}}>Full Name</label>
                <input 
                  type="text" 
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'black',
                    border: '1px solid white',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                  placeholder="John Doe"
                />
              </div>

              <div style={{marginBottom: '1.5rem'}}>
                <label style={{display: 'block', color: 'white', marginBottom: '0.5rem', fontWeight: '500'}}>Email</label>
                <input 
                  type="email" 
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'black',
                    border: '1px solid white',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                  placeholder="your@email.com"
                />
              </div>

              <div style={{marginBottom: '2rem'}}>
                <label style={{display: 'block', color: 'white', marginBottom: '0.5rem', fontWeight: '500'}}>Password</label>
                <input 
                  type="password" 
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'black',
                    border: '1px solid white',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                  placeholder="••••••••"
                />
              </div>

              <button className="btn-primary" style={{width: '100%', marginBottom: '1rem'}}>
                Create Account
              </button>

              <div style={{textAlign: 'center', color: 'white', marginBottom: '1rem'}}>or</div>

              <button 
                onClick={handleDiscordSignup}
                className="btn-secondary" 
                style={{width: '100%', marginBottom: '1rem', background: '#5865F2', border: 'none'}}
              >
                Sign up with Discord
              </button>

              <button 
                onClick={handleGoogleSignup}
                className="btn-secondary" 
                style={{width: '100%', background: '#DB4437', border: 'none'}}
              >
                Sign up with Google
              </button>

              <p style={{textAlign: 'center', color: 'white', marginTop: '2rem'}}>
                Already have an account? <a href="/login" style={{color: 'white', textDecoration: 'underline'}}>Sign in</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer style={{background: '#000000', borderTop: '1px solid #ffffff', padding: '3rem 0', textAlign: 'center', color: '#ffffff'}}>
        <div className="container">
          <p>&copy; 2025 KeamVisuals. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}