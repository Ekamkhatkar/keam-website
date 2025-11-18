'use client'

import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { signOut } from '../lib/auth-client'
import { featuredWork } from '../lib/data'

export default function Home() {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div style={{
      background: 'linear-gradient(135deg, #000000 0%, #1a0000 50%, #000000 100%)',
      color: 'white',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Animated Smoke Background */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(50% 50%, rgba(163, 163, 163, 0.4) 0%, rgba(0, 0, 0, 0) 100%)',
        borderRadius: '999px',
        filter: 'blur(10px)',
        animation: 'float 6s ease-in-out infinite',
        opacity: 0.4
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '10%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(50% 50%, rgba(115, 115, 115, 0.6) 0%, rgba(0, 0, 0, 0) 100%)',
        borderRadius: '999px',
        filter: 'blur(10px)',
        animation: 'float 8s ease-in-out infinite reverse',
        opacity: 0.6
      }} />

      {/* Glassmorphic Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(239, 68, 68, 0.3)',
        padding: '1.2rem 0',
        zIndex: 1000
      }}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #ffffff 0%, #ef4444 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 20px rgba(239, 68, 68, 0.3)'
          }}>
            KeamVisuals
          </div>
          
          <div style={{display: 'flex', alignItems: 'center', gap: '2rem'}}>
            <nav style={{display: 'flex', gap: '2rem'}}>
              <a href="/" style={{
                color: 'white', 
                textDecoration: 'none', 
                fontSize: '0.95rem', 
                fontWeight: '500',
                transition: 'all 0.3s ease',
                padding: '0.5rem 1rem',
                borderRadius: '8px'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                Home
              </a>
              <a href="/work" style={{
                color: 'white', 
                textDecoration: 'none', 
                fontSize: '0.95rem', 
                fontWeight: '500',
                transition: 'all 0.3s ease',
                padding: '0.5rem 1rem',
                borderRadius: '8px'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                Work
              </a>
              <a href="/prices" style={{
                color: 'white', 
                textDecoration: 'none', 
                fontSize: '0.95rem', 
                fontWeight: '500',
                transition: 'all 0.3s ease',
                padding: '0.5rem 1rem',
                borderRadius: '8px'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                Prices
              </a>
              {!user && (
                <a href="/login" style={{
                  color: 'white', 
                  textDecoration: 'none', 
                  fontSize: '0.95rem', 
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  Login
                </a>
              )}
            </nav>
            
            {user && (
              <div style={{position: 'relative'}}>
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '12px',
                    padding: '0.75rem 1rem',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '14px'
                  }}>
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  {user.email}
                </button>

                {isOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '8px',
                    background: 'rgba(0, 0, 0, 0.9)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '12px',
                    padding: '0.5rem',
                    minWidth: '200px',
                    backdropFilter: 'blur(20px)',
                    zIndex: 1000,
                    boxShadow: '0 20px 40px rgba(239, 68, 68, 0.1)'
                  }}>
                    <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(239, 68, 68, 0.2)' }}>
                      <p style={{ fontWeight: '600', color: 'white', fontSize: '0.9rem' }}>{user.email}</p>
                    </div>
                    <a 
                      href="/dashboard" 
                      style={{
                        display: 'block',
                        padding: '0.75rem 1rem',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
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
                        padding: '0.75rem 1rem',
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        textAlign: 'left',
                        cursor: 'pointer',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
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

      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        paddingTop: '80px'
      }}>
        <div style={{position: 'relative', zIndex: 2}}>
          <h1 style={{
            fontSize: '5rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            lineHeight: '1.1',
            background: 'linear-gradient(135deg, #ffffff 0%, #ef4444 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(239, 68, 68, 0.3)'
          }}>
            Keam Visuals
          </h1>
          <p style={{
            fontSize: '1.5rem', 
            color: '#9ca3af', 
            marginBottom: '3rem', 
            maxWidth: '600px', 
            marginLeft: 'auto', 
            marginRight: 'auto',
            fontWeight: '400'
          }}>
            2 Years of Design Experience • California
          </p>
          <div style={{display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <a href="/work" style={{
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              border: 'none',
              padding: '1.2rem 2.5rem',
              borderRadius: '14px',
              color: 'white',
              fontWeight: '700',
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textDecoration: 'none',
              display: 'inline-block',
              boxShadow: '0 8px 25px rgba(239, 68, 68, 0.3)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(239, 68, 68, 0.4)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(239, 68, 68, 0.3)'
            }}
            >
              View My Work
            </a>
            
            {/* GLOWING "See Projects" BUTTON */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.8)',
              borderRadius: '10px',
              padding: '1.2rem 2.5rem',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.3)'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
            }}
            onClick={() => window.location.href = '/work'}
            >
              {/* White Glow Effects */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
                background: 'radial-gradient(50% 50%, rgba(163, 163, 163, 0.4) 0%, rgba(0, 0, 0, 0) 100%)',
                borderRadius: '999px',
                filter: 'blur(10px)',
                opacity: 0.4
              }} />
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                height: '80%',
                background: 'radial-gradient(50% 50%, rgba(115, 115, 115, 0.6) 0%, rgba(0, 0, 0, 0) 100%)',
                borderRadius: '999px',
                filter: 'blur(10px)',
                opacity: 1
              }} />
              
              <span style={{
                color: '#ffffff',
                fontSize: '1.1rem',
                fontWeight: '700',
                position: 'relative',
                zIndex: 2
              }}>
                See Projects
              </span>
            </div>
          </div>
        </div>
      </section>

            {/* Work Section */}
      <section style={{
        padding: '6rem 0',
        background: 'transparent',
        position: 'relative'
      }}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '3rem',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #ef4444 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>
            Featured Work
          </h2>
          <p style={{
            textAlign: 'center', 
            color: '#9ca3af', 
            fontSize: '1.25rem', 
            marginBottom: '4rem',
            fontWeight: '400'
          }}>
            Check out some of my recent design projects
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            padding: '2rem 0'
          }}>
            {featuredWork.map(item => (
              <a 
                key={item.id} 
                href="/work"
                style={{
                  background: 'rgba(0, 0, 0, 0.6)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '20px',
                  padding: '2rem',
                  position: 'relative',
                  overflow: 'hidden',
                  backdropFilter: 'blur(10px)',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  display: 'block',
                  transition: 'all 0.4s ease',
                  boxShadow: '0 8px 25px rgba(239, 68, 68, 0.1)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.6)'
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(239, 68, 68, 0.2)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(239, 68, 68, 0.1)'
                }}
              >
                <div style={{
                  width: '100%',
                  height: '200px',
                  background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05))',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  borderRadius: '12px',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  position: 'relative'
                }}>
                  {item.title}
                  <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    background: 'rgba(239, 68, 68, 0.2)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    backdropFilter: 'blur(10px)'
                  }}>
                    {item.images.length} designs
                  </div>
                </div>
                <h3 style={{
                  fontSize: '1.5rem', 
                  fontWeight: '700', 
                  marginBottom: '1rem', 
                  color: 'white'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  color: '#9ca3af', 
                  fontSize: '1rem',
                  lineHeight: '1.6'
                }}>
                  {item.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section style={{
        padding: '6rem 0',
        background: 'transparent',
        position: 'relative',
        textAlign: 'center'
      }}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
          <h2 style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #ef4444 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>
            Ready to Get Started?
          </h2>
          <p style={{
            color: '#9ca3af', 
            fontSize: '1.25rem', 
            marginBottom: '3rem',
            fontWeight: '400'
          }}>
            Check out our affordable packages and pricing options
          </p>
          <a href="/prices" style={{
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            border: 'none',
            padding: '1.4rem 3rem',
            borderRadius: '14px',
            color: 'white',
            fontWeight: '700',
            fontSize: '1.2rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textDecoration: 'none',
            display: 'inline-block',
            boxShadow: '0 8px 25px rgba(239, 68, 68, 0.3)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)'
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(239, 68, 68, 0.4)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(239, 68, 68, 0.3)'
          }}
          >
            View All Pricing
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: 'rgba(0, 0, 0, 0.8)',
        borderTop: '1px solid rgba(239, 68, 68, 0.2)',
        padding: '3rem 0',
        textAlign: 'center',
        color: '#9ca3af',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
          <p style={{fontSize: '1rem', fontWeight: '400'}}>
            &copy; 2025 KeamVisuals. All rights reserved.
          </p>
        </div>
      </footer>

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
      `}</style>
    </div>
  )
}