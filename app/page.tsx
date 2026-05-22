import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Trophy, Users, Target, Calendar } from 'lucide-react'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <main className="min-h-screen flex flex-col bg-background">
      {/* Header - Sky Sports style */}
      <header className="bg-sky-navy border-b border-border">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary px-2 py-1 rounded">
              <span className="font-black text-sm text-primary-foreground tracking-tight">SCORES</span>
            </div>
            <span className="font-bold text-foreground">Da Boyz and Ting</span>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/auth/login">Log In</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/auth/sign-up">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-sky-navy to-background">
        <div className="max-w-2xl space-y-6">
          <div className="inline-block">
            <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              World Cup 2026
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-balance">
            Da Boyz and Ting
            <span className="block text-primary mt-2">Scores and Ting</span>
          </h1>
          
          <p className="text-muted-foreground text-lg max-w-md mx-auto text-pretty">
            Predict every World Cup match. Compete against your friends. 
            Prove you know football better than anyone.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="text-lg px-8 h-12 font-bold">
              <Link href="/auth/sign-up">Get Started Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 h-12">
              <Link href="/auth/login">I Have an Account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features - Sky Sports style cards */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card border-l-4 border-l-primary p-6 rounded-r-lg">
              <Users className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-bold text-lg mb-2">Private Groups</h3>
              <p className="text-sm text-muted-foreground">
                Create groups and invite your friends with a simple code
              </p>
            </div>
            <div className="bg-card border-l-4 border-l-primary p-6 rounded-r-lg">
              <Target className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-bold text-lg mb-2">Score Predictions</h3>
              <p className="text-sm text-muted-foreground">
                Predict exact scores for every World Cup match
              </p>
            </div>
            <div className="bg-card border-l-4 border-l-primary p-6 rounded-r-lg">
              <Trophy className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-bold text-lg mb-2">Live Leaderboard</h3>
              <p className="text-sm text-muted-foreground">
                Watch the standings update in real-time as matches finish
              </p>
            </div>
            <div className="bg-card border-l-4 border-l-primary p-6 rounded-r-lg">
              <Calendar className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-bold text-lg mb-2">All 72 Matches</h3>
              <p className="text-sm text-muted-foreground">
                Pre-loaded fixtures for the entire group stage
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scoring System */}
      <section className="py-16 px-6 bg-card/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-black mb-2">SCORING SYSTEM</h2>
            <p className="text-muted-foreground">Earn points for your prediction accuracy</p>
          </div>
          
          <div className="bg-card rounded-lg overflow-hidden">
            <div className="bg-primary px-4 py-2">
              <span className="font-bold text-primary-foreground text-sm">POINTS BREAKDOWN</span>
            </div>
            <div className="divide-y divide-border">
              <div className="flex items-center justify-between p-4">
                <div>
                  <p className="font-bold">Exact Score</p>
                  <p className="text-sm text-muted-foreground">Predict the exact final score</p>
                </div>
                <span className="text-3xl font-black text-success">+5</span>
              </div>
              <div className="flex items-center justify-between p-4">
                <div>
                  <p className="font-bold">Result + Goal Difference</p>
                  <p className="text-sm text-muted-foreground">Correct result with right margin</p>
                </div>
                <span className="text-3xl font-black text-accent">+3</span>
              </div>
              <div className="flex items-center justify-between p-4">
                <div>
                  <p className="font-bold">Correct Result</p>
                  <p className="text-sm text-muted-foreground">Win, lose, or draw correct</p>
                </div>
                <span className="text-3xl font-black text-muted-foreground">+2</span>
              </div>
              <div className="flex items-center justify-between p-4 opacity-60">
                <div>
                  <p className="font-bold">Wrong</p>
                  <p className="text-sm text-muted-foreground">Better luck next time</p>
                </div>
                <span className="text-3xl font-black text-destructive">0</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-black mb-4">Ready to prove yourself?</h2>
          <p className="text-muted-foreground mb-8">
            Sign up now and start making your predictions before the tournament begins.
          </p>
          <Button asChild size="lg" className="text-lg px-12 h-12 font-bold">
            <Link href="/auth/sign-up">Join Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center border-t bg-sky-navy">
        <p className="text-muted-foreground text-sm">
          FIFA World Cup 2026 - USA, Mexico, Canada
        </p>
        <p className="text-muted-foreground/60 text-xs mt-2">
          Da Boyz and Ting Scores and Ting
        </p>
      </footer>
    </main>
  )
}
