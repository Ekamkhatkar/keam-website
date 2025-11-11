'use client'

import { useState } from 'react'
import AuthButton from '../../../components/shared/AuthButton'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="glow-card p-8 rounded-2xl">
          <h1 className="text-3xl font-bold mb-6 text-center">Create Account</h1>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 font-semibold hover:opacity-90 transition-opacity mb-6">
            Create Account
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-gray-400">Or sign up with</span>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <AuthButton />
          </div>

          <p className="text-center text-gray-400 mt-6">
            Already have an account?{' '}
            <a href="/login" className="text-purple-500 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}