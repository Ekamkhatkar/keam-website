'use client'

import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { signOut } from '../../lib/auth-client'
import { workItems } from '../../lib/data'

// Add this interface at the top
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

  // Type the filteredItems
  const filteredItems = selectedCategory === 'All' 
    ? workItems 
    : workItems.filter((item: WorkItem) => item.category === selectedCategory)

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

      {/* Work Content */}
      <section className="section" style={{paddingTop: '120px'}}>
        <div className="container">
          <h1 className="section-title gradient-text">My Portfolio</h1>
          <p className="section-subtitle">Explore my latest design work for content creators and streamers</p>
          
          {/* Work Grid */}
          <div className="work-grid">
            {filteredItems.map((item: WorkItem) => (
              <div 
                key={item.id} 
                className="glow-card"
                onClick={() => setSelectedWork(item)}
                style={{cursor: 'pointer'}}
              >
                <div className="work-image" style={{
                  position: 'relative',
                  height: '200px',
                  background: `linear-gradient(135deg, #9e9e9eff, #4b4b4bff)`,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  marginBottom: '1rem'
                }}>
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
                <p style={{color: '#9ca3af', fontSize: '0.95rem'}}>{item.description}</p>
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
          background: '#000000',
          zIndex: 2000,
          overflow: 'auto'
        }}>
          <div style={{
            position: 'relative',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem'
          }}>
            <button
              onClick={() => setSelectedWork(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: 'white',
                fontSize: '1.5rem',
                cursor: 'pointer',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ×
            </button>
            
            <h2 style={{color: 'white', fontSize: '2rem', marginBottom: '1rem'}}>
              {selectedWork.title}
            </h2>
            <p style={{color: '#8b5cf6', fontSize: '1.1rem', marginBottom: '2rem'}}>
              {selectedWork.category} • {selectedWork.size}
            </p>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
              {selectedWork.images.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={`${selectedWork.title} ${index + 1}`}
                  style={{
                    width: '100%',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <footer style={{background: '#000000', borderTop: '1px solid #ffffff', padding: '3rem 0', textAlign: 'center', color: '#ffffff'}}>
        <div className="container">
          <p>&copy; 2025 KeamVisuals. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}