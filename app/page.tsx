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
      lineHeight: '1.6'
    }}>
      {/* Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        padding: '1.5rem 0',
        zIndex: 1000
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
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#000000'
          }}>
            KeamVisuals
          </div>
          
          <nav style={{
            display: 'flex',
            gap: '3rem',
            alignItems: 'center'
          }}>
            <a href="/work" style={{
              color: '#000000',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'opacity 0.3s ease'
            }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>
              Work
            </a>
            <a href="/prices" style={{
              color: '#000000',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'opacity 0.3s ease'
            }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>
              Prices
            </a>
            <a href="/contact" style={{
              color: '#000000',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'opacity 0.3s ease'
            }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>
              Contact
            </a>
            
            {!user ? (
              <a href="/login" style={{
                background: '#000000',
                color: '#ffffff',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>
                Get Started
              </a>
            ) : (
              <div style={{position: 'relative'}}>
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  style={{
                    background: '#000000',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.75rem 1rem',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}
                >
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#333333',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '12px'
                  }}>
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  Account
                </button>

                {isOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '8px',
                    background: '#ffffff',
                    border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    padding: '0.5rem',
                    minWidth: '160px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    zIndex: 1000
                  }}>
                    <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                      <p style={{ fontWeight: '600', color: '#000000', fontSize: '0.8rem' }}>{user.email}</p>
                    </div>
                    <a 
                      href="/dashboard" 
                      style={{
                        display: 'block',
                        padding: '0.75rem 1rem',
                        color: '#000000',
                        textDecoration: 'none',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        transition: 'background 0.3s ease'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
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
                        color: '#000000',
                        textAlign: 'left',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        transition: 'background 0.3s ease'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
                      onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
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

      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 2rem',
        paddingTop: '80px'
      }}>
        <div style={{maxWidth: '800px'}}>
          <h1 style={{
            fontSize: '4rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            lineHeight: '1.1',
            color: '#000000'
          }}>
            Creating Unique<br />Design Experiences
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#666666',
            marginBottom: '3rem',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: '1.6'
          }}>
            Professional design solutions for content creators and streamers. 
            Bringing your vision to life with 2 years of expertise.
          </p>
          <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <a href="/prices" style={{
              background: '#000000',
              color: '#ffffff',
              padding: '1rem 2rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }} onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)'
            }} onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}>
              Get Started Now
              <span style={{fontSize: '1.2rem'}}>→</span>
            </a>
            <a href="/work" style={{
              background: 'transparent',
              color: '#000000',
              padding: '1rem 2rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: '600',
              border: '1px solid #000000',
              transition: 'all 0.3s ease'
            }} onMouseOver={(e) => {
              e.currentTarget.style.background = '#000000'
              e.currentTarget.style.color = '#ffffff'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }} onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#000000'
              e.currentTarget.style.transform = 'translateY(0)'
            }}>
              See Projects
            </a>
          </div>
          <div style={{
            marginTop: '4rem',
            color: '#666666',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            <span>Scroll down</span>
            <span style={{fontSize: '1.2rem'}}>↓</span>
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section style={{
        padding: '6rem 0',
        background: '#f8f8f8'
      }}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '3rem',
            color: '#000000',
            textAlign: 'center'
          }}>
            Featured Work
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {featuredWork.map((item) => (
              <div 
                key={item.id} 
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  padding: '2rem',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(0,0,0,0.1)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{
                  width: '100%',
                  height: '200px',
                  background: 'linear-gradient(135deg, #f5f5f5, #e5e5e5)',
                  borderRadius: '8px',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#666666',
                  fontSize: '1rem',
                  fontWeight: '600',
                  position: 'relative'
                }}>
                  {item.title}
                  <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    background: '#000000',
                    color: '#ffffff',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>
                    {item.images.length} designs
                  </div>
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  color: '#000000'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  color: '#666666',
                  fontSize: '0.95rem',
                  lineHeight: '1.6'
                }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#000000',
        color: '#ffffff',
        padding: '3rem 0',
        textAlign: 'center'
      }}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
          <p style={{fontSize: '1rem', fontWeight: '400'}}>
            &copy; 2025 KeamVisuals. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}