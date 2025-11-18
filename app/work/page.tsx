'use client'

import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { signOut } from '../../lib/auth-client'
import { workItems } from '../../lib/data'

interface WorkItem {
  id: number;
  title: string;
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
      background: '#000000',
      color: '#ffffff',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* SINGLE FAST WARPING SMOKE STRIPE */}
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
          {['Home', 'Work', 'Prices', 'Contact'].map((item, idx) => (
            <a key={idx} href={item === 'Home' ? '/' : item === 'Work' ? '/work' : item === 'Prices' ? '/prices' : '#'} style={{
              color: item === 'Work' ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: '400',
              transition: 'color 0.3s ease',
              ...(item === 'Work' && {
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '0.5rem 1rem',
                borderRadius: '8px'
              })
            }}
            onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'}
            onMouseOut={(e) => e.currentTarget.style.color = item === 'Work' ? '#ffffff' : 'rgba(255, 255, 255, 0.7)'}
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

      {/* WORK SECTION */}
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
            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: '300',
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em'
            }}>
              Portfolio
            </h1>
            <p style={{
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.5)',
              fontWeight: '400'
            }}>
              Explore my latest design work for content creators and streamers
            </p>
          </div>
          
          {/* Work grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '2rem',
                  textDecoration: 'none',
                  display: 'block',
                  transition: 'all 0.4s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedWork(item)}
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
                  fontWeight: '300',
                  position: 'relative'
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
                    fontWeight: '400'
                  }}>
                    {item.images.length} designs
                  </div>
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
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
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
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
            >
              ×
            </button>
            
            <h2 style={{
              color: 'white', 
              fontSize: '2.5rem', 
              marginBottom: '1rem',
              fontWeight: '300',
              letterSpacing: '-0.02em'
            }}>
              {selectedWork.title}
            </h2>
            <p style={{
              color: 'rgba(255, 255, 255, 0.5)', 
              fontSize: '1.2rem', 
              marginBottom: '3rem',
              fontWeight: '400'
            }}>
              {selectedWork.size}
            </p>
            
            <div style={{
              display: 'flex', 
              flexDirection: 'column', 
              gap: '3rem',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '2rem'
            }}>
              {selectedWork.images.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={`${selectedWork.title} ${index + 1}`}
                  style={{
                    width: '100%',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

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
      `}</style>
    </div>
  )
}