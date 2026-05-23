'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
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
              <h1 className="text-xl font-bold text-[#001538] mb-1">Welcome Back</h1>
              <p className="text-sm text-[#666]">Sign in to continue</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-[#cc0000] bg-red-50 border border-red-200 rounded">
                  {error}
                </div>
              )}
              
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
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="h-11 text-base border-[#e0e0e0] focus:border-[#cc0000] focus:ring-[#cc0000]"
                />
              </div>

              <button 
                type="submit" 
                className="w-full h-11 bg-[#cc0000] hover:bg-[#aa0000] text-white font-bold rounded transition-colors disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>

          {/* Footer */}
          <p className="text-sm text-[#666] text-center mt-4">
            {"Don't have an account?"}{' '}
            <Link href="/auth/sign-up" className="text-[#cc0000] font-semibold hover:underline">
              Sign up
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
