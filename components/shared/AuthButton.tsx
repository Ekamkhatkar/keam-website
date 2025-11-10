'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { User } from '@supabase/supabase-js'

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    setLoading(false)
  }

  async function signInWithDiscord() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
  }

  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
  }

  if (loading) {
    return <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin"></div>
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm">Hi, {user.email}</span>
        <button
          onClick={signOut}
          className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
        >
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={signInWithDiscord}
        className="px-4 py-2 rounded-lg bg-[#5865F2] hover:opacity-90 transition-opacity"
      >
        Discord
      </button>
      <button
        onClick={signInWithGoogle}
        className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
      >
        Google
      </button>
    </div>
  )
}