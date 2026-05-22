"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Target, Users, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function HowToPlayPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>

        <h1 className="text-3xl font-bold text-center mb-2">How to Play</h1>
        <p className="text-muted-foreground text-center mb-8">
          Everything you need to know about Da Boyz and Ting Scores and Ting
        </p>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                1. Create or Join a Group
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Create your own prediction group and share the 6-character invite code with your friends, 
                or join an existing group using a code. Each group has its own separate leaderboard.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                2. Make Your Predictions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                For each match, predict the final score (e.g., 2-1, 0-0). You can update your predictions 
                as many times as you want before kickoff. Once a match starts, predictions are locked.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                3. Predictions Lock at Kickoff
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Make sure to submit your predictions before the match starts. The system automatically 
                locks predictions at kickoff time - no last-minute changes allowed!
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                4. Scoring System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                  <span className="font-medium">Exact Score</span>
                  <span className="text-2xl font-bold text-primary">5 pts</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  You predicted 2-1 and the match ended 2-1
                </p>

                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="font-medium">Correct Result + Goal Difference</span>
                  <span className="text-2xl font-bold">3 pts</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  You predicted 3-1 and the match ended 2-0 (both home wins by 2 goals)
                </p>

                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="font-medium">Correct Result Only</span>
                  <span className="text-2xl font-bold">2 pts</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  You predicted 3-0 and the match ended 1-0 (both home wins, different margin)
                </p>

                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="font-medium">Wrong Prediction</span>
                  <span className="text-2xl font-bold text-muted-foreground">0 pts</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  You predicted a home win but it was a draw or away win
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Results Explained</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-2">
              <p><strong>Home Win:</strong> Home team scores more goals</p>
              <p><strong>Away Win:</strong> Away team scores more goals</p>
              <p><strong>Draw:</strong> Both teams score the same number of goals</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Link href="/auth/sign-up">
            <Button size="lg" className="w-full sm:w-auto">
              Start Playing Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
