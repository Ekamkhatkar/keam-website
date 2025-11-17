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
      background: '#ffffff',
      color: '#000000',
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      lineHeight: '1.5'
    }}>
      {/* Minimal Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '2rem 0',
        zIndex: 1000,
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#000000'
          }}>
            KeamVisuals
          </div>
          
          <nav style={{
            display: 'flex',
            gap: '3rem',
            alignItems: 'center'
          }}>
            <a href="/services" style={{
              color: '#000000',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: '400'
            }}>
              Services
            </a>
            <a href="/work" style={{
              color: '#000000',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: '400'
            }}>
              Projects
            </a>
            <a href="/testimonials" style={{
              color: '#000000',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: '400'
            }}>
              Testimonials
            </a>
            <a href="/contact" style={{
              color: '#000000',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: '400'
            }}>
              Contact
            </a>
            
            {!user ? (
              <a href="/login" style={{
                background: '#000000',
                color: '#ffffff',
                padding: '0.75rem 1.5rem',
                borderRadius: '25px',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}>
                Get Started
              </a>
            ) : (
              <div style={{position: 'relative'}}>
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  style={{
                    background: '#000000',
                    border: 'none',
                    borderRadius: '25px',
                    padding: '0.75rem 1.5rem',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}
                >
                  Account
                </button>

                {isOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '0.5rem',
                    background: '#ffffff',
                    border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    padding: '0.5rem',
                    minWidth: '160px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    zIndex: 1000
                  }}>
                    <a 
                      href="/dashboard" 
                      style={{
                        display: 'block',
                        padding: '0.75rem 1rem',
                        color: '#000000',
                        textDecoration: 'none',
                        fontSize: '0.8rem'
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
                        background: 'transparent',
                        border: 'none',
                        color: '#000000',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section - Exact Portfolite Layout */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '0 2rem',
        paddingTop: '120px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
          width: '100%'
        }}>
          {/* Left Column - Text Content */}
          <div>
            <h1 style={{
              fontSize: '3.5rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              lineHeight: '1.1',
              color: '#000000'
            }}>
              Creating Unique<br />Brand Identities
            </h1>
            <p style={{
              fontSize: '1.1rem',
              color: '#666666',
              marginBottom: '3rem',
              lineHeight: '1.6'
            }}>
              Branding that you<br />
              <span style={{fontWeight: '600', color: '#000000'}}>need Indeed</span>
            </p>
            <div style={{display: 'flex', gap: '1rem', marginBottom: '4rem'}}>
              <a href="/prices" style={{
                background: '#000000',
                color: '#ffffff',
                padding: '1rem 2rem',
                borderRadius: '25px',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: '500',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                Get Started Now
                <span style={{fontSize: '1.1rem'}}>→</span>
              </a>
              <a href="/work" style={{
                background: 'transparent',
                color: '#000000',
                padding: '1rem 2rem',
                borderRadius: '25px',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: '500',
                border: '1px solid #000000',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                See Projects
                <span style={{fontSize: '1.1rem'}}>↗</span>
              </a>
            </div>
            <div style={{
              color: '#666666',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>Scroll down</span>
              <span style={{fontSize: '1rem'}}>↓</span>
            </div>
          </div>

          {/* Right Column - Placeholder for graphic */}
          <div style={{
            background: 'linear-gradient(135deg, #f5f5f5, #e5e5e5)',
            borderRadius: '12px',
            height: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#999999',
            fontSize: '1rem',
            border: '1px solid rgba(0,0,0,0.1)'
          }}>
            Brand Visual Showcase
          </div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section style={{
        padding: '6rem 2rem',
        background: '#f8f8f8'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            {['Asterisk', 'Eooks', 'Opal', 'Dune'].map((project, index) => (
              <div key={index} style={{
                background: '#ffffff',
                borderRadius: '12px',
                padding: '2rem',
                textAlign: 'center',
                border: '1px solid rgba(0,0,0,0.1)'
              }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: '#000000'
                }}>
                  {project}
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: '#666666'
                }}>
                  Project description
                </div>
              </div>
            ))}
          </div>

          <div style={{
            textAlign: 'center',
            color: '#666666',
            fontSize: '0.9rem'
          }}>
            More information is more available throughout this
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#000000',
        color: '#ffffff',
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            fontSize: '0.9rem',
            color: '#999999',
            marginBottom: '1rem'
          }}>
            Made with • California
          </div>
          <div style={{
            fontSize: '0.8rem',
            color: '#666666'
          }}>
            &copy; 2025 KeamVisuals. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}