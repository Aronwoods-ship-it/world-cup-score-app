import { Button } from "@/components/ui/button"
import { Trophy, Target, Users, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function HowToPlayPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-sky-navy border-b border-border">
        <div className="container mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary px-2 py-1 rounded">
              <span className="font-black text-sm text-primary-foreground tracking-tight">SCORES</span>
            </div>
            <span className="font-bold text-foreground hidden sm:inline">Da Boyz and Ting</span>
          </Link>
        </div>
      </header>

      <div className="container max-w-2xl mx-auto px-4 py-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-black uppercase tracking-wide mb-2">How to Play</h1>
          <p className="text-muted-foreground">
            Everything you need to know about the competition
          </p>
        </div>

        <div className="space-y-4">
          {/* Step 1 */}
          <div className="bg-card rounded-lg overflow-hidden">
            <div className="bg-primary px-4 py-2 flex items-center gap-2">
              <Users className="h-4 w-4 text-primary-foreground" />
              <span className="font-bold text-primary-foreground text-sm uppercase">Step 1: Create or Join</span>
            </div>
            <div className="p-4 text-sm text-muted-foreground">
              <p>
                Create your own prediction group and share the 6-character invite code with your friends, 
                or join an existing group using a code. Each group has its own separate leaderboard.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-card rounded-lg overflow-hidden">
            <div className="bg-primary px-4 py-2 flex items-center gap-2">
              <Target className="h-4 w-4 text-primary-foreground" />
              <span className="font-bold text-primary-foreground text-sm uppercase">Step 2: Make Predictions</span>
            </div>
            <div className="p-4 text-sm text-muted-foreground">
              <p>
                For each match, predict the final score (e.g., 2-1, 0-0). You can update your predictions 
                as many times as you want before kickoff. Once a match starts, predictions are locked.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-card rounded-lg overflow-hidden">
            <div className="bg-primary px-4 py-2 flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary-foreground" />
              <span className="font-bold text-primary-foreground text-sm uppercase">Step 3: Watch the Results</span>
            </div>
            <div className="p-4 text-sm text-muted-foreground">
              <p>
                Make sure to submit your predictions before the match starts. The system automatically 
                locks predictions at kickoff time - no last-minute changes allowed!
              </p>
            </div>
          </div>

          {/* Scoring System */}
          <div className="bg-card rounded-lg overflow-hidden border-2 border-primary/30">
            <div className="bg-primary px-4 py-3 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary-foreground" />
              <span className="font-bold text-primary-foreground uppercase">Scoring System</span>
            </div>
            <div className="divide-y divide-border">
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-foreground">Exact Score</span>
                  <span className="text-2xl font-black text-success">+5</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  You predicted 2-1 and the match ended 2-1
                </p>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-foreground">Result + Goal Difference</span>
                  <span className="text-2xl font-black text-accent">+3</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  You predicted 3-1 and the match ended 2-0 (both home wins by 2 goals)
                </p>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-foreground">Correct Result</span>
                  <span className="text-2xl font-black text-muted-foreground">+2</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  You predicted 3-0 and the match ended 1-0 (both home wins)
                </p>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-foreground">Wrong</span>
                  <span className="text-2xl font-black text-destructive">0</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  You predicted a home win but it was a draw or away win
                </p>
              </div>
            </div>
          </div>

          {/* Results Explained */}
          <div className="bg-secondary/30 rounded-lg p-4">
            <h3 className="font-bold text-sm uppercase mb-3">Results Explained</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold text-foreground">Home Win:</span> <span className="text-muted-foreground">Home team scores more goals</span></p>
              <p><span className="font-semibold text-foreground">Away Win:</span> <span className="text-muted-foreground">Away team scores more goals</span></p>
              <p><span className="font-semibold text-foreground">Draw:</span> <span className="text-muted-foreground">Both teams score the same</span></p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button asChild size="lg" className="w-full sm:w-auto font-bold">
            <Link href="/auth/sign-up">Start Playing Now</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
