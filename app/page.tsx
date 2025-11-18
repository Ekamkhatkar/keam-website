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
      {/* MASSIVE BLURRED GRADIENT BLOB */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '30%',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(120px)',
        animation: 'blobMove 25s ease-in-out infinite'
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '20%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(100px)',
        animation: 'blobMove 30s ease-in-out infinite reverse'
      }} />

      {/* MINIMAL HEADER */}
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
          {['Work', 'Prices', 'Contact'].map((item, idx) => (
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

      {/* HERO SECTION */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        padding: '0 2rem'
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
          marginBottom: '3rem',
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
          Premium Design Services
        </div>

        {/* HUGE HEADLINE */}
        <h1 style={{
          fontSize: 'clamp(3rem, 10vw, 7rem)',
          fontWeight: '300',
          lineHeight: '1.1',
          marginBottom: '2rem',
          maxWidth: '1100px',
          letterSpacing: '-0.02em'
        }}>
          Design that you<br />need Indeed
        </h1>
        
        {/* Subheadline */}
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.125rem)',
          color: 'rgba(255, 255, 255, 0.6)',
          maxWidth: '650px',
          lineHeight: '1.7',
          marginBottom: '3rem',
          fontWeight: '400'
        }}>
          Elevate your brand with custom identity and package design. Showcase your story through bold visuals and strategic design solutions.
        </p>

        {/* Simple buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <a href="/work" style={{
            background: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: '#ffffff',
            padding: '0.875rem 2rem',
            borderRadius: '10px',
            fontSize: '0.95rem',
            fontWeight: '400',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            display: 'inline-block'
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
            Get Started Now
          </a>
          
          <a href="/prices" style={{
            background: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: '#ffffff',
            padding: '0.875rem 2rem',
            borderRadius: '10px',
            fontSize: '0.95rem',
            fontWeight: '400',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            display: 'inline-block'
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
            See Projects
          </a>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '3rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
          color: 'rgba(255, 255, 255, 0.4)',
          fontSize: '0.875rem',
          fontWeight: '400'
        }}>
          <span>Scroll down</span>
          <div style={{
            width: '1px',
            height: '40px',
            background: 'rgba(255, 255, 255, 0.2)',
            animation: 'scrollLine 2s ease-in-out infinite'
          }} />
          <span>to see projects</span>
        </div>
      </section>

      {/* LOGO MARQUEE */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: 0,
        width: '100%',
        overflow: 'hidden',
        padding: '2rem 0',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{
          display: 'flex',
          gap: '4rem',
          animation: 'marquee 20s linear infinite',
          width: 'max-content'
        }}>
          {['Discord', 'FiveM', 'Twitch', 'YouTube', 'Twitter', 'Discord', 'FiveM', 'Twitch'].map((brand, idx) => (
            <div key={idx} style={{
              fontSize: '1.25rem',
              color: 'rgba(255, 255, 255, 0.2)',
              fontWeight: '300',
              whiteSpace: 'nowrap'
            }}>
              {brand}
            </div>
          ))}
        </div>
      </div>

      {/* FEATURED WORK SECTION */}
      <section style={{
        padding: '8rem 3rem',
        position: 'relative'
      }}>
        <div style={{maxWidth: '1400px', margin: '0 auto'}}>
          {/* Section header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '5rem'
          }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: '300',
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em'
            }}>
              Featured Work
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.5)',
              fontWeight: '400'
            }}>
              A selection of recent projects
            </p>
          </div>
          
          {/* Work grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {featuredWork.map((item) => (
              <a 
                key={item.id} 
                href="/work"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '2rem',
                  textDecoration: 'none',
                  display: 'block',
                  transition: 'all 0.4s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{
                  width: '100%',
                  height: '200px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '12px',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  color: 'rgba(255, 255, 255, 0.3)',
                  fontWeight: '300'
                }}>
                  {item.title}
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '400',
                  marginBottom: '0.75rem',
                  color: '#ffffff',
                  letterSpacing: '-0.01em'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  fontWeight: '300'
                }}>
                  {item.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{
        padding: '8rem 3rem',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: '300',
          marginBottom: '1.5rem',
          letterSpacing: '-0.02em'
        }}>
          Ready to get started?
        </h2>
        <p style={{
          fontSize: '1.125rem',
          color: 'rgba(255, 255, 255, 0.5)',
          marginBottom: '3rem',
          fontWeight: '400'
        }}>
          View our packages and pricing
        </p>
        <a href="/prices" style={{
          background: 'transparent',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          color: '#ffffff',
          padding: '1rem 2.5rem',
          borderRadius: '10px',
          fontSize: '1rem',
          fontWeight: '400',
          textDecoration: 'none',
          transition: 'all 0.3s ease',
          display: 'inline-block'
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
          View Pricing
        </a>
      </section>

      {/* MINIMAL FOOTER */}
      <footer style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '3rem',
        textAlign: 'center'
      }}>
        <p style={{
          color: 'rgba(255, 255, 255, 0.3)',
          fontSize: '0.875rem',
          fontWeight: '300'
        }}>
          © 2025 Keam Visuals. All rights reserved.
        </p>
      </footer>

      {/* ANIMATIONS */}
      <style jsx global>{`
        @keyframes blobMove {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes scrollLine {
          0% {
            transform: scaleY(0);
            transform-origin: top;
          }
          50% {
            transform: scaleY(1);
            transform-origin: top;
          }
          51% {
            transform: scaleY(1);
            transform-origin: bottom;
          }
          100% {
            transform: scaleY(0);
            transform-origin: bottom;
          }
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
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
      `}</style>
    </div>
  )
}