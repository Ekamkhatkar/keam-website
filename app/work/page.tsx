'use client'

import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { signOut } from '../../lib/auth-client'
import { workItems } from '../../lib/data'

interface WorkItem {
  id: number;
  title: string;
  category: string;
  description: string;
  images: string[];
  size: string;
}

export default function Work() {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null)

  const filteredItems = workItems

  return (
    <div style={{
      background: 'linear-gradient(135deg, #000000 0%, #1a0000 50%, #000000 100%)',
      color: 'white',
      minHeight: '100vh',
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
                borderRadius: '8px',
                background: 'rgba(239, 68, 68, 0.2)'
              }}>
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
                      <p style={{ fontWeight: '600', color: 'white', fontSize: '0.9rem' }}>{user?.email}</p>
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

      {/* Work Content */}
      <section style={{
        padding: '120px 0 6rem 0',
        background: 'transparent',
        position: 'relative'
      }}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
          <h1 style={{
            textAlign: 'center',
            fontSize: '3.5rem',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #ef4444 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>
            My Portfolio
          </h1>
          <p style={{
            textAlign: 'center', 
            color: '#9ca3af', 
            fontSize: '1.25rem', 
            marginBottom: '4rem',
            fontWeight: '400'
          }}>
            Explore my latest design work for content creators and streamers
          </p>
          
          {/* Work Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            padding: '2rem 0'
          }}>
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                style={{
                  background: 'rgba(0, 0, 0, 0.6)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '20px',
                  padding: '2rem',
                  position: 'relative',
                  overflow: 'hidden',
                  backdropFilter: 'blur(10px)',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease',
                  boxShadow: '0 8px 25px rgba(239, 68, 68, 0.1)'
                }}
                onClick={() => setSelectedWork(item)}
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedWork && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.95)',
          zIndex: 2000,
          overflow: 'auto',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            position: 'relative',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '6rem 2rem 2rem 2rem'
          }}>
            <button
              onClick={() => setSelectedWork(null)}
              style={{
                position: 'fixed',
                top: '2rem',
                right: '2rem',
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.5)',
                color: 'white',
                fontSize: '1.5rem',
                cursor: 'pointer',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                zIndex: 2001
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
            >
              ×
            </button>
            
            <h2 style={{
              color: 'white', 
              fontSize: '2.5rem', 
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #ffffff 0%, #ef4444 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}>
              {selectedWork.title}
            </h2>
            <p style={{
              color: '#ef4444', 
              fontSize: '1.2rem', 
              marginBottom: '3rem',
              fontWeight: '600'
            }}>
              {selectedWork.size}
            </p>
            
            <div style={{
              display: 'flex', 
              flexDirection: 'column', 
              gap: '3rem',
              background: 'rgba(0, 0, 0, 0.6)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '20px',
              padding: '2rem',
              backdropFilter: 'blur(10px)'
            }}>
              {selectedWork.images.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={`${selectedWork.title} ${index + 1}`}
                  style={{
                    width: '100%',
                    borderRadius: '16px',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    boxShadow: '0 8px 25px rgba(239, 68, 68, 0.1)'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

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