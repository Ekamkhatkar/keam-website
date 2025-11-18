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
      {/* ULTRA SICK ANIMATED GRADIENT BACKGROUND */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `
          radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.06) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.04) 0%, transparent 50%)
        `,
        animation: 'gradientShift 15s ease infinite'
      }} />

      {/* Floating Gradient Orbs */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'orbFloat 25s ease-in-out infinite'
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '15%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(70px)',
        animation: 'orbFloat 30s ease-in-out infinite reverse'
      }} />
      
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(100px)',
        animation: 'orbPulse 20s ease-in-out infinite'
      }} />

      {/* Animated Grid Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        opacity: 0.4
      }} />

      {/* Ultra Modern Glassmorphic Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(30px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '1.5rem 0',
        zIndex: 1000,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Logo with gradient */}
          <div style={{
            fontSize: '1.75rem',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em',
            textShadow: '0 0 30px rgba(255, 255, 255, 0.3)'
          }}>
            KEAM VISUALS
          </div>
          
          <div style={{display: 'flex', alignItems: 'center', gap: '2.5rem'}}>
            <nav style={{display: 'flex', gap: '2.5rem'}}>
              {['Home', 'Work', 'Prices'].map((item, idx) => (
                <a key={idx} href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '12px',
                  background: item === 'Home' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  border: '1px solid transparent',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = item === 'Home' ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
                  e.currentTarget.style.borderColor = 'transparent'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
                >
                  {item}
                </a>
              ))}
              {!user && (
                <a href="/login" style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
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
                    fontWeight: '600'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    border: '2px solid rgba(255, 255, 255, 0.3)'
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
                    marginTop: '10px',
                    background: 'rgba(0, 0, 0, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '0.75rem',
                    minWidth: '220px',
                    backdropFilter: 'blur(30px)',
                    zIndex: 1000,
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
                  }}>
                    <div style={{padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)'}}>
                      <p style={{fontWeight: '700', color: 'white', fontSize: '0.95rem'}}>{user.email}</p>
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
                        fontWeight: '600',
                        transition: 'all 0.3s ease',
                        marginTop: '0.5rem'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                        e.currentTarget.style.transform = 'translateX(5px)'
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.transform = 'translateX(0)'
                      }}
                    >
                      My Orders →
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
                        fontWeight: '600',
                        transition: 'all 0.3s ease',
                        marginTop: '0.25rem'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                        e.currentTarget.style.transform = 'translateX(5px)'
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'transparent'
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

      {/* HERO SECTION - ULTRA SICK */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        paddingTop: '100px'
      }}>
        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '900px',
          padding: '0 2rem'
        }}>
          {/* Floating badge */}
          <div style={{
            display: 'inline-block',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50px',
            padding: '0.5rem 1.5rem',
            marginBottom: '2rem',
            backdropFilter: 'blur(10px)',
            fontSize: '0.85rem',
            fontWeight: '600',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            animation: 'fadeInDown 1s ease'
          }}>
            ✨ 2 Years of Design Excellence
          </div>

          <h1 style={{
            fontSize: 'clamp(3.5rem, 8vw, 6rem)',
            fontWeight: '900',
            marginBottom: '1.5rem',
            lineHeight: '1.1',
            background: 'linear-gradient(135deg, #ffffff 0%, #888888 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.03em',
            animation: 'fadeInUp 1s ease'
          }}>
            KEAM VISUALS
          </h1>
          
          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
            color: '#a0a0a0',
            marginBottom: '3.5rem',
            fontWeight: '400',
            lineHeight: '1.6',
            maxWidth: '700px',
            margin: '0 auto 3.5rem',
            animation: 'fadeInUp 1s ease 0.2s backwards'
          }}>
            Elevate your brand with premium design work. From Discord to FiveM, we create visuals that make you stand out.
          </p>

          {/* SICK ANIMATED BUTTONS */}
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            animation: 'fadeInUp 1s ease 0.4s backwards'
          }}>
            {/* Primary Magnetic Button */}
            <a href="/work" style={{
              position: 'relative',
              background: 'rgba(255, 255, 255, 0.95)',
              color: '#000000',
              padding: '1.25rem 3rem',
              borderRadius: '14px',
              fontWeight: '700',
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 10px 40px rgba(255, 255, 255, 0.2)',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)'
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(255, 255, 255, 0.3)'
              e.currentTarget.style.background = '#ffffff'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.boxShadow = '0 10px 40px rgba(255, 255, 255, 0.2)'
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)'
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(0.98)'
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)'
            }}
            >
              View Portfolio
              <span style={{
                fontSize: '1.3rem',
                transition: 'transform 0.3s ease'
              }}>→</span>
            </a>
            
            {/* Glassmorphic Outline Button */}
            <a href="/prices" style={{
              position: 'relative',
              background: 'rgba(0, 0, 0, 0.6)',
              color: '#ffffff',
              padding: '1.25rem 3rem',
              borderRadius: '14px',
              fontWeight: '700',
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)'
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(255, 255, 255, 0.2)'
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.3)'
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(0.98)'
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)'
            }}
            >
              See Pricing
              <span style={{
                fontSize: '1.3rem',
                transition: 'transform 0.3s ease'
              }}>↗</span>
            </a>
          </div>

          {/* Floating stats */}
          <div style={{
            display: 'flex',
            gap: '3rem',
            justifyContent: 'center',
            marginTop: '5rem',
            animation: 'fadeInUp 1s ease 0.6s backwards'
          }}>
            {[
              { number: '100+', label: 'Projects' },
              { number: '50+', label: 'Happy Clients' },
              { number: '2+', label: 'Years' }
            ].map((stat, idx) => (
              <div key={idx} style={{
                textAlign: 'center',
                padding: '1.5rem 2rem',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '900',
                  background: 'linear-gradient(135deg, #ffffff 0%, #888888 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '0.25rem'
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  color: '#888888',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED WORK SECTION */}
      <section style={{
        padding: '8rem 0',
        position: 'relative'
      }}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{textAlign: 'center', marginBottom: '4rem'}}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '900',
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #ffffff 0%, #888888 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em'
            }}>
              Featured Work
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: '#888888',
              fontWeight: '400'
            }}>
              Check out some of our latest design projects
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2.5rem'
          }}>
            {featuredWork.map((item, idx) => (
              <a 
                key={item.id} 
                href="/work"
                style={{
                  background: 'rgba(0, 0, 0, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  padding: '2rem',
                  position: 'relative',
                  overflow: 'hidden',
                  backdropFilter: 'blur(20px)',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  display: 'block',
                  transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                  animation: `fadeInUp 0.8s ease ${idx * 0.1}s backwards`
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                  e.currentTarget.style.transform = 'translateY(-12px)'
                  e.currentTarget.style.boxShadow = '0 25px 60px rgba(255, 255, 255, 0.15)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.3)'
                }}
              >
                {/* Shine effect on hover */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                  transition: 'left 0.7s ease'
                }} />

                <div style={{
                  width: '100%',
                  height: '220px',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '14px',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {item.title}
                  <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    background: 'rgba(255, 255, 255, 0.15)',
                    color: 'white',
                    padding: '0.5rem 1.25rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    {item.images.length} designs
                  </div>
                </div>
                <h3 style={{
                  fontSize: '1.75rem',
                  fontWeight: '800',
                  marginBottom: '1rem',
                  color: 'white',
                  letterSpacing: '-0.01em'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  color: '#888888',
                  fontSize: '1rem',
                  lineHeight: '1.7',
                  fontWeight: '400'
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
        padding: '8rem 0',
        position: 'relative',
        textAlign: 'center'
      }}>
        <div style={{maxWidth: '800px', margin: '0 auto', padding: '0 2rem'}}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '900',
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #888888 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em'
          }}>
            Ready to Elevate Your Brand?
          </h2>
          <p style={{
            fontSize: '1.25rem',
            color: '#888888',
            marginBottom: '3rem',
            fontWeight: '400',
            lineHeight: '1.7'
          }}>
            Choose from our premium packages designed for content creators and streamers
          </p>
          <a href="/prices" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1rem',
            background: 'rgba(255, 255, 255, 0.95)',
            color: '#000000',
            padding: '1.5rem 3.5rem',
            borderRadius: '14px',
            fontWeight: '700',
            fontSize: '1.2rem',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            textDecoration: 'none',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 15px 50px rgba(255, 255, 255, 0.2)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px) scale(1.03)'
            e.currentTarget.style.boxShadow = '0 25px 70px rgba(255, 255, 255, 0.3)'
            e.currentTarget.style.background = '#ffffff'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)'
            e.currentTarget.style.boxShadow = '0 15px 50px rgba(255, 255, 255, 0.2)'
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)'
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px) scale(1)'
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px) scale(1.03)'
          }}
          >
            View All Pricing
            <span style={{fontSize: '1.4rem'}}>→</span>
          </a>
        </div>
      </section>

      {/* ULTRA MODERN FOOTER */}
      <footer style={{
        background: 'rgba(0, 0, 0, 0.8)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '4rem 0 2rem',
        position: 'relative',
        backdropFilter: 'blur(20px)'
      }}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem'
          }}>
            <div>
              <h3 style={{
                fontSize: '1.75rem',
                fontWeight: '900',
                background: 'linear-gradient(135deg, #ffffff 0%, #888888 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1rem',
                letterSpacing: '-0.02em'
              }}>
                KEAM VISUALS
              </h3>
              <p style={{color: '#888888', lineHeight: '1.7', fontSize: '0.95rem'}}>
                Premium design services for content creators. 2 years of excellence in digital design.
              </p>
            </div>
            
            <div>
              <h4 style={{
                fontWeight: '700',
                marginBottom: '1.5rem',
                color: 'white',
                fontSize: '1.1rem',
                letterSpacing: '-0.01em'
              }}>Quick Links</h4>
              <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
                {['Home', 'Work', 'Prices', 'Dashboard'].map((link, idx) => (
                  <li key={idx} style={{marginBottom: '0.75rem'}}>
                    <a href={link === 'Home' ? '/' : `/${link.toLowerCase()}`} style={{
                      color: '#888888',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      transition: 'all 0.3s ease',
                      display: 'inline-block'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = '#ffffff'
                      e.currentTarget.style.transform = 'translateX(5px)'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = '#888888'
                      e.currentTarget.style.transform = 'translateX(0)'
                    }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 style={{
                fontWeight: '700',
                marginBottom: '1.5rem',
                color: 'white',
                fontSize: '1.1rem',
                letterSpacing: '-0.01em'
              }}>Contact</h4>
              <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
                <li style={{marginBottom: '0.75rem', color: '#888888', fontSize: '0.95rem'}}>
                  📍 California, USA
                </li>
                <li style={{marginBottom: '0.75rem', color: '#888888', fontSize: '0.95rem'}}>
                  ✉️ support@keamvisuals.com
                </li>
                <li style={{marginBottom: '0.75rem', color: '#888888', fontSize: '0.95rem'}}>
                  ⏰ Available 24/7
                </li>
              </ul>
            </div>
          </div>
          
          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '2rem',
            textAlign: 'center'
          }}>
            <p style={{
              color: '#888888',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>
              © 2025 KEAM VISUALS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* CSS ANIMATIONS */}
      <style jsx global>{`
        @keyframes gradientShift {
          0%, 100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1) rotate(5deg);
          }
        }

        @keyframes orbFloat {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes orbPulse {
          0%, 100% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Selection styling */
        ::selection {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }

        /* Hide scrollbar but keep functionality */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #000000;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  )
}