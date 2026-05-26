'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (displayName.trim().length < 2) {
      setError('Display name must be at least 2 characters')
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? 
            `${window.location.origin}/auth/callback`,
          data: {
            display_name: displayName.trim(),
          },
        },
      })

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      router.push('/dashboard')
    } catch (err) {
      console.error('[v0] Sign up error:', err)
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#f5f5f5]">
      {/* Header - Sky Sports style */}
      <header className="sky-header">
        <div className="max-w-7xl mx-auto px-4 h-12 flex items-center">
          <Link href="/" className="flex items-center gap-1.5">
            <span className="text-white font-light text-lg tracking-tight">da boyz</span>
            <span className="bg-[#cc0000] text-white font-bold text-sm px-1.5 py-0.5 rounded-sm">scores</span>
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          {/* Form card */}
          <div className="bg-white border border-[#e0e0e0] rounded p-6">
            {/* Title */}
            <div className="text-center mb-6">
              <h1 className="text-xl font-bold text-[#001538] mb-1">Join the Competition</h1>
              <p className="text-sm text-[#666]">Create your account to start predicting</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSignUp} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-[#cc0000] bg-red-50 border border-red-200 rounded">
                  {error}
                </div>
              )}
              
              <div className="space-y-1.5">
                <Label htmlFor="displayName" className="text-sm font-medium text-[#333]">Display Name</Label>
                <Input
                  id="displayName"
                  type="text"
                  placeholder="Your nickname"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  minLength={2}
                  maxLength={30}
                  autoComplete="nickname"
                  className="h-11 text-base border-[#e0e0e0] focus:border-[#cc0000] focus:ring-[#cc0000]"
                />
                <p className="text-xs text-[#999]">
                  This is how others will see you on the leaderboard
                </p>
              </div>
              
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium text-[#333]">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="h-11 text-base border-[#e0e0e0] focus:border-[#cc0000] focus:ring-[#cc0000]"
                />
              </div>
              
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-medium text-[#333]">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="h-11 text-base border-[#e0e0e0] focus:border-[#cc0000] focus:ring-[#cc0000]"
                />
                <p className="text-xs text-[#999]">
                  At least 6 characters
                </p>
              </div>

              <button 
                type="submit" 
                className="w-full h-11 bg-[#cc0000] hover:bg-[#aa0000] text-white font-bold rounded transition-colors disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
          </div>

          {/* Footer */}
          <p className="text-sm text-[#666] text-center mt-4">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-[#cc0000] font-semibold hover:underline">
              Sign in
            </Link>
          </p>
          
          <div className="flex items-center justify-center gap-2 mt-8 pt-4 border-t border-[#e0e0e0]">
            <span className="text-[#999] text-xs">A</span>
            <span className="text-[#666] text-xs font-semibold tracking-wide">WOODS LABS INC.</span>
            <span className="text-[#999] text-xs">Product</span>
          </div>
        </div>
      </div>
    </main>
  )
}
