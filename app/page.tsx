import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Trophy, Users, Target, Calendar } from 'lucide-react'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#f5f5f5]">
      {/* Header - Sky Sports style navy gradient */}
      <header className="sky-header">
        <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-white font-light text-lg tracking-tight">da boyz</span>
            <span className="bg-[#cc0000] text-white font-bold text-sm px-1.5 py-0.5 rounded-sm">scores</span>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/auth/login" 
              className="text-white/80 hover:text-white text-sm transition-colors"
            >
              Log In
            </Link>
            <Link 
              href="/auth/sign-up" 
              className="bg-[#cc0000] hover:bg-[#aa0000] text-white text-sm font-semibold px-4 py-1.5 rounded transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Clean white like Sky Sports */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="bg-[#001538] text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider">
              World Cup 2026
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-[#001538] mb-2">
            Da Boyz and Ting
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-[#cc0000] mb-6">
            Scores and Ting
          </h2>
          
          <p className="text-[#666] text-lg max-w-lg mx-auto mb-8">
            Our own app to track how quickly we give up....
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              href="/auth/sign-up"
              className="bg-[#cc0000] hover:bg-[#aa0000] text-white text-base font-bold px-8 py-3 rounded transition-colors"
            >
              Get Started Free
            </Link>
            <Link 
              href="/auth/login"
              className="bg-white hover:bg-[#f5f5f5] text-[#001538] text-base font-semibold px-8 py-3 rounded border border-[#e0e0e0] transition-colors"
            >
              I Have an Account
            </Link>
          </div>
        </div>
      </section>

      {/* Features - Sky Sports card style */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border-l-4 border-l-[#cc0000] p-5 shadow-sm">
              <Users className="h-7 w-7 text-[#cc0000] mb-3" />
              <h3 className="font-bold text-[#001538] mb-1">Private Groups</h3>
              <p className="text-sm text-[#666]">
                Create groups and invite friends with a code
              </p>
            </div>
            <div className="bg-white border-l-4 border-l-[#cc0000] p-5 shadow-sm">
              <Target className="h-7 w-7 text-[#cc0000] mb-3" />
              <h3 className="font-bold text-[#001538] mb-1">Score Predictions</h3>
              <p className="text-sm text-[#666]">
                Predict exact scores for every match
              </p>
            </div>
            <div className="bg-white border-l-4 border-l-[#cc0000] p-5 shadow-sm">
              <Trophy className="h-7 w-7 text-[#cc0000] mb-3" />
              <h3 className="font-bold text-[#001538] mb-1">Live Leaderboard</h3>
              <p className="text-sm text-[#666]">
                Watch standings update in real-time
              </p>
            </div>
            <div className="bg-white border-l-4 border-l-[#cc0000] p-5 shadow-sm">
              <Calendar className="h-7 w-7 text-[#cc0000] mb-3" />
              <h3 className="font-bold text-[#001538] mb-1">72 Matches</h3>
              <p className="text-sm text-[#666]">
                All group stage fixtures ready
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scoring System - Sky Sports table style */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-[#001538] mb-1 text-center">Scoring System</h2>
          <p className="text-[#666] text-sm mb-6 text-center">Earn points for your prediction accuracy</p>
          
          <div className="border border-[#e0e0e0] rounded overflow-hidden">
            <div className="bg-[#001538] px-4 py-2">
              <span className="font-bold text-white text-sm">POINTS BREAKDOWN</span>
            </div>
            <div className="divide-y divide-[#e0e0e0]">
              <div className="flex items-center justify-between p-4 bg-white">
                <div>
                  <p className="font-semibold text-[#001538]">Exact Score</p>
                  <p className="text-xs text-[#666]">Predict the exact final score</p>
                </div>
                <span className="text-2xl font-bold text-green-600">+5</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white">
                <div>
                  <p className="font-semibold text-[#001538]">Result + Goal Difference</p>
                  <p className="text-xs text-[#666]">Correct result with right margin</p>
                </div>
                <span className="text-2xl font-bold text-[#001538]">+3</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white">
                <div>
                  <p className="font-semibold text-[#001538]">Correct Result</p>
                  <p className="text-xs text-[#666]">Win, lose, or draw correct</p>
                </div>
                <span className="text-2xl font-bold text-[#666]">+2</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#f8f8f8]">
                <div>
                  <p className="font-semibold text-[#999]">Wrong</p>
                  <p className="text-xs text-[#999]">Better luck next time</p>
                </div>
                <span className="text-2xl font-bold text-[#cc0000]">0</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-xl font-bold text-[#001538] mb-3">Ready to prove yourself?</h2>
          <p className="text-[#666] text-sm mb-6">
            Sign up now and start making your predictions before the tournament begins.
          </p>
          <Link 
            href="/auth/sign-up"
            className="inline-block bg-[#cc0000] hover:bg-[#aa0000] text-white text-base font-bold px-10 py-3 rounded transition-colors"
          >
            Join Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-6 text-center sky-header mt-auto">
        <p className="text-white/60 text-sm">
          FIFA World Cup 2026 - USA, Mexico, Canada
        </p>
        <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-white/10">
          <span className="text-white/30 text-xs">A</span>
          <span className="text-white/50 text-xs font-semibold tracking-wide">WOODS LABS INC.</span>
          <span className="text-white/30 text-xs">Product</span>
        </div>
      </footer>
    </main>
  )
}
