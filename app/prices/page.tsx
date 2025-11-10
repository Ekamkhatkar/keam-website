'use client'

import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { signOut } from '../../lib/auth-client'

export default function Prices() {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  
  const packages = [
    { 
      name: 'Discord Package', 
      price: 20, 
      features: ['Discord Banner', 'Discord PFP', 'Discord Invite Banner', 'Discord Invite Banner', 'Discord Profile Header', '24-72hr Delivery'],
      popular: false
    },
    { 
      name: 'FiveM Package', 
      price: 30, 
      features: ['FiveM Connecting Banner', 'FiveM Icon', 'Watermark', 'Everthing in the Discord Package', '24-72hr Delivery'],
      popular: true
    },
    { 
      name: 'Abstract Package', 
      price: 25, 
      features: ['Discord Banner', 'Discord PFP', 'Watermark', 'Discord Invite Banner', 'Header', '24-72hr Delivery'],
      popular: false
    },
    { 
      name: 'Brand Identity', 
      price: 120, 
      features: ['Logo Design', 'Color Palette', 'Social Kit', 'Style Guide', 'Unlimited Revisions'],
      popular: false
    },
    { 
      name: 'Twitter Header', 
      price: 15, 
      features: ['A unique header', '1500x500 or 3000x1000', 'Customizable Styles', 'Unique Aesthetic', '24-72hr Delivery'],
      popular: false
      
    },
    { 
      name: 'Thumbnail', 
      price: 10, 
      features: ['Bold Titles & Vibrant Colors', 'Perfect Composition & Lighting', 'Made for Engagement', 'Unique Concepts for Every Video', '24-72hr Delivery'],
      popular: false
      
    },
    
  ]

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
                    background: 'linear-gradient(135deg, #1f1f1fff, #747474ff)',
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
                    background: 'rgba(0,0,0,0.9)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    padding: '8px',
                    minWidth: '200px',
                    backdropFilter: 'blur(10px)',
                    zIndex: 1000
                  }}>
                    <div style={{ padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <p style={{ fontWeight: 'bold', color: 'white' }}>{user?.email}</p>
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

      {/* Prices Page Content */}
      <section className="section" style={{paddingTop: '120px'}}>
        <div className="container">
          <h1 className="section-title gradient-text">Pricing & Packages</h1>
          <p className="section-subtitle">Choose the perfect package for your streaming or content creation needs</p>
          
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem'}}>
            {packages.map((pkg, index) => (
              <div key={index} className="glow-card" style={{position: 'relative', border: pkg.popular ? '2px solid #8b5cf6' : '1px solid rgba(255,255,255,0.2)'}}>
                {pkg.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #888888ff, #2b2b2bff)',
                    color: 'white',
                    padding: '4px 16px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>
                    
                  </div>
                )}
                <h3 style={{fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'white', textAlign: 'center'}}>{pkg.name}</h3>
                <div style={{textAlign: 'center', marginBottom: '1.5rem'}}>
                  <span style={{fontSize: '3rem', fontWeight: 'bold', color: 'white'}}>${pkg.price}</span>
                  <span style={{color: '#cccccc', marginLeft: '0.5rem'}}>/project</span>
                </div>
                <ul style={{listStyle: 'none', marginBottom: '2rem'}}>
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} style={{color: '#cccccc', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)'}}>
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
                
                {/* REPLACED BUTTON WITH ORDER LINK */}
                <a 
                  href={`/order/${pkg.name.toLowerCase().replace(/ /g, '-')}`}
                  style={{
                    display: 'block',
                    width: '100%',
                    background: pkg.popular 
                      ? 'linear-gradient(135deg, #757575ff, #5e5e5eff)' 
                      : 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    textAlign: 'center',
                    fontWeight: '600',
                    border: pkg.popular ? 'none' : '1px solid rgba(255,255,255,0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  Select Package
                </a>
              </div>
            ))}
          </div>

          {/* Custom Quote Section */}
          <div className="glow-card" style={{textAlign: 'center', maxWidth: '600px', margin: '0 auto'}}>
            <h2 style={{fontSize: '2rem', fontWeight: '600', marginBottom: '1rem', color: 'white'}}>Need Something Custom?</h2>
            <p style={{color: '#cccccc', marginBottom: '2rem'}}>Contact me for a custom quote tailored to your specific needs and requirements</p>
            <a 
              href="mailto:your-email@keamvisuals.com" 
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #6b6b6bff, #363636ff)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Get Custom Quote
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{background: '#000000', borderTop: '1px solid #ffffff', padding: '3rem 0', textAlign: 'center', color: '#ffffff'}}>
        <div className="container">
          <p>&copy; 2025 KeamVisuals. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}