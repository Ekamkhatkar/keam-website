'use client'

import Link from 'next/link'
import { useState } from 'react'
import AuthButton from '@/components/shared/AuthButton'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          KeamVisuals
        </Link>
        
        <nav className="hidden md:flex gap-8">
          <Link href="/" className="hover:text-purple-400 transition-colors">Home</Link>
          <Link href="/work" className="hover:text-purple-400 transition-colors">Work</Link>
          <Link href="/prices" className="hover:text-purple-400 transition-colors">Prices</Link>
          <Link href="/dashboard" className="hover:text-purple-400 transition-colors">Dashboard</Link>
        </nav>

        <div className="flex gap-4 items-center">
          <AuthButton />
          
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            Menu
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10">
          <div className="px-4 py-4 flex flex-col gap-4">
            <Link href="/" className="py-2 hover:text-purple-400">Home</Link>
            <Link href="/work" className="py-2 hover:text-purple-400">Work</Link>
            <Link href="/prices" className="py-2 hover:text-purple-400">Prices</Link>
            <Link href="/dashboard" className="py-2 hover:text-purple-400">Dashboard</Link>
          </div>
        </div>
      )}
    </header>
  )
}