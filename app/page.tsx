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
      background: '#000000',
      color: '#ffffff',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Animated Gradient Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `
          radial-gradient(circle at 20% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(120, 119, 198, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.15) 0%, transparent 50%)
        `,
        animation: 'gradientShift 8s ease infinite'
      }} />

      {/* Moving Orbs */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(120, 119, 198, 0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'orbFloat 15s ease-in-out infinite',
        filter: 'blur(60px)'
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '30%',
        right: '15%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(120, 119, 198, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'orbFloat 12s ease-in-out infinite reverse',
        filter: 'blur(50px)'
      }} />

      {/* Glassmorphic Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '1.5rem 0',
        zIndex: 1000
      }}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#ffffff',
            background: 'linear-gradient(135deg, #ffffff, #a8a8a8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            KeamVisuals
          </div>
          
          <div style={{display: 'flex', alignItems: 'center', gap: '2rem'}}>
            <nav style={{display: 'flex', gap: '2rem'}}>
              <a href="/" style={{
                color: '#ffffff', 
                textDecoration: 'none', 
                fontSize: '0.95rem', 
                fontWeight: '500',
                transition: 'all 0.3s ease',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
              >
                Home
              </a>
              <a href="/work" style={{
                color: '#ffffff', 
                textDecoration: 'none', 
                fontSize: '0.95rem', 
                fontWeight: '500',
                transition: 'all 0.3s ease',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
              >
                Work
              </a>
              <a href="/prices" style={{
                color: '#ffffff', 
                textDecoration: 'none', 
                fontSize: '0.95rem', 
                fontWeight: '500',
                transition: 'all 0.3s ease',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
              >
                Prices
              </a>
              {!user && (
                <a href="/login" style={{
                  color: '#ffffff', 
                  textDecoration: 'none', 
                  fontSize: '0.95rem', 
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.05)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
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
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '0.75rem 1.5rem',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
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
                    background: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '0.75rem',
                    minWidth: '200px',
                    backdropFilter: 'blur(20px)',
                    zIndex: 1000,
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                  }}>
                    <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
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
                        transition: 'all 0.3s ease',
                        background: 'rgba(255, 255, 255, 0.05)'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                        e.currentTarget.style.transform = 'translateX(5px)'
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                        e.currentTarget.style.transform = 'translateX(0)'
                      }}
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
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: 'none',
                        color: 'white',
                        textAlign: 'left',
                        cursor: 'pointer',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        transition: 'all 0.3s ease',
                        marginTop: '0.5rem'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                        e.currentTarget.style.transform = 'translateX(5px)'
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                        e.currentTarget.style.transform = 'translateX(0)'
                      }}
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
        <div style={{position: 'relative', zIndex: 2, maxWidth: '800px', padding: '0 2rem'}}>
          <h1 style={{
            fontSize: '4.5rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            lineHeight: '1.1',
            background: 'linear-gradient(135deg, #ffffff, #cccccc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(255, 255, 255, 0.2)'
          }}>
            Keam Visuals
          </h1>
          <p style={{
            fontSize: '1.4rem', 
            color: '#cccccc', 
            marginBottom: '3rem', 
            fontWeight: '400',
            lineHeight: '1.6'
          }}>
            2 Years of Design Experience • California
          </p>
          <div style={{display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            {/* Professional Glass Button */}
            <a href="/work" style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '1.2rem 2.5rem',
              borderRadius: '12px',
              color: 'white',
              fontWeight: '600',
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.3)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)'
            }}
            >
              View My Work
              <span style={{fontSize: '1.2rem', transition: 'transform 0.3s ease'}}>→</span>
            </a>
            
            {/* Glowing "See Projects" Button */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '12px',
              padding: '1.2rem 2.5rem',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)'
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = '0 0 0 1px rgba(255, 255, 255, 0.1)'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)'
            }}
            onClick={() => window.location.href = '/work'}
            >
              <span style={{
                color: '#ffffff',
                fontSize: '1.1rem',
                fontWeight: '600',
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                See Projects
                <span style={{fontSize: '1.2rem', transition: 'transform 0.3s ease'}}>↗</span>
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
            background: 'linear-gradient(135deg, #ffffff, #cccccc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>
            Featured Work
          </h2>
          <p style={{
            textAlign: 'center', 
            color: '#cccccc', 
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
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '2rem',
                  position: 'relative',
                  overflow: 'hidden',
                  backdropFilter: 'blur(10px)',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  display: 'block',
                  transition: 'all 0.4s ease',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)'
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)'
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.4)'
                }}
              >
                <div style={{
                  width: '100%',
                  height: '200px',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {item.title}
                  <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
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
                  color: '#cccccc', 
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
            background: 'linear-gradient(135deg, #ffffff, #cccccc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>
            Ready to Get Started?
          </h2>
          <p style={{
            color: '#cccccc', 
            fontSize: '1.25rem', 
            marginBottom: '3rem',
            fontWeight: '400'
          }}>
            Check out our affordable packages and pricing options
          </p>
          <a href="/prices" style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '1.4rem 3rem',
            borderRadius: '12px',
            color: 'white',
            fontWeight: '600',
            fontSize: '1.2rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
            e.currentTarget.style.transform = 'translateY(-3px)'
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.3)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)'
          }}
          >
            View All Pricing
            <span style={{fontSize: '1.3rem', transition: 'transform 0.3s ease'}}>→</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: 'rgba(0, 0, 0, 0.6)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '3rem 0',
        textAlign: 'center',
        color: '#cccccc',
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
            transform: translate(0px, 0px) scale(1); 
          }
          25% { 
            transform: translate(-30px, 40px) scale(1.1); 
          }
          50% { 
            transform: translate(20px, -30px) scale(0.9); 
          }
          75% { 
            transform: translate(-20px, -40px) scale(1.05); 
          }
        }

        @keyframes pulse {
          0%, 100% { 
            opacity: 0.3; 
            transform: translate(-50%, -50%) scale(1);
          }
          50% { 
            opacity: 0.6; 
            transform: translate(-50%, -50%) scale(1.2);
          }
        }
      `}</style>
    </div>
  )
}