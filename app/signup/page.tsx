'use client'

import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { signOut, signInWithDiscord, signInWithGoogle } from '../../lib/auth-client'

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
    <div style={{
      background: '#000000',
      color: '#ffffff',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* BACKGROUND SMOKE EFFECTS - SAME AS HOMEPAGE */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: '#000000'
      }}>
        {/* Main fast-moving smoke stripe */}
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
          transformOrigin: 'center center',
          willChange: 'transform'
        }} />
        
        {/* Secondary flowing element for depth */}
        <div style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-30%',
          width: '150%',
          height: '100%',
          background: 'radial-gradient(ellipse 700px 350px at 50% 50%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 30%, transparent 60%)',
          filter: 'blur(90px)',
          animation: 'fastSmoke2 10s ease-in-out infinite',
          transformOrigin: 'center center',
          willChange: 'transform'
        }} />
        
        {/* Subtle ambient glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
          filter: 'blur(120px)',
          transform: 'translate(-50%, -50%)',
          animation: 'subtleGlow 12s ease-in-out infinite'
        }} />
      </div>

      {/* MINIMAL HEADER - SAME AS HOMEPAGE */}
      <header style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        padding: '2rem 3rem',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '1.1rem',
          fontWeight: '500',
          color: '#ffffff'
        }}>
          <div style={{
            width: '24px',
            height: '24px',
            background: '#ffffff',
            borderRadius: '4px'
          }} />
          Keam Visuals
        </div>
        
        {/* Nav */}
        <nav style={{
          display: 'flex',
          gap: '2.5rem',
          alignItems: 'center'
        }}>
          {['Work', 'Prices'].map((item, idx) => (
            <a key={idx} href={item === 'Work' ? '/work' : item === 'Prices' ? '/prices' : '#'} style={{
              color: 'rgba(255, 255, 255, 0.7)',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: '400',
              transition: 'color 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'}
            onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}
            >
              {item}
            </a>
          ))}
          
          {user ? (
            <div style={{position: 'relative'}}>
              <button 
                onClick={() => setIsOpen(!isOpen)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  padding: '0.5rem 1rem',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '400'
                }}
              >
                {user.email?.split('@')[0]}
              </button>

              {isOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '10px',
                  background: '#0a0a0a',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '0.5rem',
                  minWidth: '180px',
                  zIndex: 1000
                }}>
                  <a href="/dashboard" style={{
                    display: 'block',
                    padding: '0.75rem 1rem',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    transition: 'background 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    Dashboard
                  </a>
                  <button
                    onClick={() => {
                      signOut()
                      setIsOpen(false)
                    }}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'transparent',
                      border: 'none',
                      color: 'white',
                      textAlign: 'left',
                      cursor: 'pointer',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      transition: 'background 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <a href="/login" style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              padding: '0.5rem 1.25rem',
              color: 'white',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '400',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
            }}
            >
              Login
            </a>
          )}
        </nav>
      </header>

      {/* SIGNUP SECTION */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '0 2rem'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '20px',
          padding: '3rem',
          width: '100%',
          maxWidth: '450px',
          backdropFilter: 'blur(10px)',
          position: 'relative',
          zIndex: 100
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
            Join Keam Visuals
          </div>

          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '300',
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em'
          }}>
            Create Account
          </h1>
          
          <p style={{
            fontSize: '1rem',
            color: 'rgba(255, 255, 255, 0.6)',
            marginBottom: '2.5rem',
            lineHeight: '1.6',
            fontWeight: '400'
          }}>
            Join us to get started with premium design services
          </p>

          <form style={{ marginBottom: '2rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '0.75rem',
                fontSize: '0.9rem',
                fontWeight: '400'
              }}>
                Full Name
              </label>
              <input 
                type="text" 
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
                placeholder="John Doe"
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

            <div style={{ marginBottom: '1.5rem' }}>
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
                placeholder="your@email.com"
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

            <div style={{ marginBottom: '2rem' }}>
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
                placeholder="••••••••"
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

            <button 
              type="submit"
              style={{
                width: '100%',
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#ffffff',
                padding: '0.875rem 2rem',
                borderRadius: '10px',
                fontSize: '0.95rem',
                fontWeight: '400',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginBottom: '1.5rem'
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
              Create Account
            </button>
          </form>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              flex: 1,
              height: '1px',
              background: 'rgba(255, 255, 255, 0.1)'
            }} />
            <span style={{
              padding: '0 1rem',
              color: 'rgba(255, 255, 255, 0.4)',
              fontSize: '0.875rem',
              fontWeight: '400'
            }}>
              or continue with
            </span>
            <div style={{
              flex: 1,
              height: '1px',
              background: 'rgba(255, 255, 255, 0.1)'
            }} />
          </div>

          <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <button 
              onClick={handleDiscordSignup}
              style={{
                flex: 1,
                background: 'rgba(88, 101, 242, 0.1)',
                border: '1px solid rgba(88, 101, 242, 0.3)',
                color: '#ffffff',
                padding: '0.875rem 1rem',
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontWeight: '400',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(88, 101, 242, 0.2)'
                e.currentTarget.style.borderColor = 'rgba(88, 101, 242, 0.5)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(88, 101, 242, 0.1)'
                e.currentTarget.style.borderColor = 'rgba(88, 101, 242, 0.3)'
              }}
            >
              Discord
            </button>

            <button 
              onClick={handleGoogleSignup}
              style={{
                flex: 1,
                background: 'rgba(219, 68, 55, 0.1)',
                border: '1px solid rgba(219, 68, 55, 0.3)',
                color: '#ffffff',
                padding: '0.875rem 1rem',
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontWeight: '400',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(219, 68, 55, 0.2)'
                e.currentTarget.style.borderColor = 'rgba(219, 68, 55, 0.5)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(219, 68, 55, 0.1)'
                e.currentTarget.style.borderColor = 'rgba(219, 68, 55, 0.3)'
              }}
            >
              Google
            </button>
          </div>

          <p style={{
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '0.9rem',
            fontWeight: '400'
          }}>
            Already have an account?{' '}
            <a href="/login" style={{
              color: '#ffffff',
              textDecoration: 'none',
              fontWeight: '500'
            }}
            onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
            onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
            >
              Sign in
            </a>
          </p>
        </div>
      </section>

      {/* MINIMAL FOOTER - SAME AS HOMEPAGE */}
      <footer style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '3rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 100
      }}>
        <p style={{
          color: 'rgba(255, 255, 255, 0.3)',
          fontSize: '0.875rem',
          fontWeight: '300'
        }}>
          © 2025 Keam Visuals. All rights reserved.
        </p>
      </footer>

      {/* ANIMATIONS - SAME AS HOMEPAGE */}
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

        @keyframes subtleGlow {
          0%, 100% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }

        html {
          scroll-behavior: smooth;
        }

        ::selection {
          background: rgba(255, 255, 255, 0.1);
          color: white;
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

        input:focus {
          outline: none;
        }
      `}</style>
    </div>
  )
}