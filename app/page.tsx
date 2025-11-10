'use client'

import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { signOut } from '../lib/auth-client'
import { featuredWork } from '../lib/data'

export default function Home() {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      {/* Header */}
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
                    background: 'rgba(0,0,0,0.9)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    padding: '8px',
                    minWidth: '200px',
                    backdropFilter: 'blur(10px)',
                    zIndex: 1000
                  }}>
                    <div style={{ padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <p style={{ fontWeight: 'bold', color: 'white' }}>{user.email}</p>
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

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="gradient-text" style={{fontSize: '5rem', fontWeight: 'bold', marginBottom: '1.5rem', lineHeight: '1.1'}}>
            Keam Visuals
          </h1>
          <p style={{fontSize: '1.5rem', color: '#9ca3af', marginBottom: '3rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto'}}>
            2 Years of Design Experience • California
          </p>
          <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <a href="/work" className="btn-primary">View My Work</a>
            <a href="/prices" className="btn-secondary">Get Started</a>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section className="section section-dark">
        <div className="container">
          <h2 className="section-title gradient-text">Featured Work</h2>
          <p className="section-subtitle">Check out some of my recent design projects</p>
          
          <div className="work-grid">
            {featuredWork.map(item => (
              <a 
                key={item.id} 
                href="/work"
                className="glow-card"
                style={{cursor: 'pointer', textDecoration: 'none', display: 'block'}}
              >
                <div className="work-image" style={{position: 'relative'}}>
                  {item.title}
                  <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '8px',
                    background: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.8rem'
                  }}>
                    {item.images.length} designs
                  </div>
                </div>
                <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: 'white'}}>{item.title}</h3>
                <p style={{color: '#aaaaaaff', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem'}}></p>
                <p style={{color: '#9ca3af', fontSize: '0.95rem'}}>{item.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="section">
        <div className="container" style={{textAlign: 'center'}}>
          <h2 className="section-title gradient-text">Ready to Get Started?</h2>
          <p className="section-subtitle">Check out our affordable packages and pricing options</p>
          <a href="/prices" className="btn-primary" style={{fontSize: '1.1rem', padding: '1.2rem 2.5rem'}}>View All Pricing</a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{background: '#000000', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '3rem 0', textAlign: 'center', color: '#6b7280'}}>
        <div className="container">
          <p>&copy; 2025 KeamVisuals. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}