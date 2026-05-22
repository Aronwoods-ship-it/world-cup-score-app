import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="text-primary">Da Boyz</span>
            <span className="block text-2xl md:text-3xl text-muted-foreground mt-2">
              and Ting
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl font-semibold text-foreground">
            Scores and Ting
          </p>
          
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            World Cup 2026 score predictions competition. 
            Compete with your friends and prove you know football.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/auth/sign-up">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-6 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold text-lg">Create or Join</h3>
              <p className="text-muted-foreground text-sm">
                Start a group and share the invite code with your friends
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold text-lg">Predict Scores</h3>
              <p className="text-muted-foreground text-sm">
                Enter your predictions for every World Cup match before kickoff
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold text-lg">Climb the Board</h3>
              <p className="text-muted-foreground text-sm">
                Earn points for correct predictions and compete for the top spot
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scoring */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">Scoring System</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card p-4 rounded-lg border">
              <p className="text-3xl font-bold text-primary">5</p>
              <p className="text-sm text-muted-foreground">Exact Score</p>
            </div>
            <div className="bg-card p-4 rounded-lg border">
              <p className="text-3xl font-bold text-accent">3</p>
              <p className="text-sm text-muted-foreground">Result + Goal Diff</p>
            </div>
            <div className="bg-card p-4 rounded-lg border">
              <p className="text-3xl font-bold text-muted-foreground">2</p>
              <p className="text-sm text-muted-foreground">Correct Result</p>
            </div>
            <div className="bg-card p-4 rounded-lg border">
              <p className="text-3xl font-bold text-destructive">0</p>
              <p className="text-sm text-muted-foreground">Wrong</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-muted-foreground text-sm border-t">
        <p>World Cup 2026 - USA, Mexico, Canada</p>
      </footer>
    </main>
  )
}
