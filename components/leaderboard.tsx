'use client'

import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Prediction, MatchWithTeams } from '@/lib/types'

interface LeaderboardProps {
  members: { user_id: string; display_name: string }[]
  predictions: Prediction[]
  matches: MatchWithTeams[]
  currentUserId: string
}

type LeaderboardEntry = {
  user_id: string
  display_name: string
  total_points: number
  predictions_count: number
  exact_scores: number
  correct_results: number
}

function calculatePoints(
  predictedHome: number,
  predictedAway: number,
  actualHome: number,
  actualAway: number
): { points: number; isExact: boolean; isCorrectResult: boolean } {
  // Exact score: 5 points
  if (predictedHome === actualHome && predictedAway === actualAway) {
    return { points: 5, isExact: true, isCorrectResult: true }
  }

  const predictedDiff = predictedHome - predictedAway
  const actualDiff = actualHome - actualAway
  
  // Get result type
  const predictedResult = predictedHome > predictedAway ? 'home' : predictedHome < predictedAway ? 'away' : 'draw'
  const actualResult = actualHome > actualAway ? 'home' : actualHome < actualAway ? 'away' : 'draw'

  // Correct result and goal difference: 3 points
  if (predictedResult === actualResult && predictedDiff === actualDiff) {
    return { points: 3, isExact: false, isCorrectResult: true }
  }

  // Correct result only: 2 points
  if (predictedResult === actualResult) {
    return { points: 2, isExact: false, isCorrectResult: true }
  }

  // Wrong: 0 points
  return { points: 0, isExact: false, isCorrectResult: false }
}

export function Leaderboard({ members, predictions, matches, currentUserId }: LeaderboardProps) {
  const leaderboard = useMemo(() => {
    const completedMatches = matches.filter(m => m.is_completed)
    const matchMap = new Map(completedMatches.map(m => [m.id, m]))

    const entries: LeaderboardEntry[] = members.map(member => {
      const userPredictions = predictions.filter(p => p.user_id === member.user_id)
      let total_points = 0
      let exact_scores = 0
      let correct_results = 0
      let predictions_count = 0

      userPredictions.forEach(pred => {
        const match = matchMap.get(pred.match_id)
        if (match && match.home_score !== null && match.away_score !== null) {
          predictions_count++
          const result = calculatePoints(
            pred.predicted_home_score,
            pred.predicted_away_score,
            match.home_score,
            match.away_score
          )
          total_points += result.points
          if (result.isExact) exact_scores++
          if (result.isCorrectResult) correct_results++
        }
      })

      return {
        user_id: member.user_id,
        display_name: member.display_name,
        total_points,
        predictions_count,
        exact_scores,
        correct_results,
      }
    })

    // Sort by points, then by exact scores, then by correct results
    return entries.sort((a, b) => {
      if (b.total_points !== a.total_points) return b.total_points - a.total_points
      if (b.exact_scores !== a.exact_scores) return b.exact_scores - a.exact_scores
      return b.correct_results - a.correct_results
    })
  }, [members, predictions, matches])

  const completedMatchCount = matches.filter(m => m.is_completed).length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Leaderboard</span>
          <span className="text-sm font-normal text-muted-foreground">
            {completedMatchCount} / {matches.length} matches played
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {leaderboard.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No members yet
          </p>
        ) : (
          <div className="space-y-2">
            {leaderboard.map((entry, index) => {
              const isCurrentUser = entry.user_id === currentUserId
              const position = index + 1
              
              return (
                <div
                  key={entry.user_id}
                  className={`flex items-center gap-4 p-3 rounded-lg ${
                    isCurrentUser ? 'bg-primary/10 border border-primary/20' : 'bg-card border'
                  }`}
                >
                  {/* Position */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    position === 1 ? 'bg-gold text-gold-foreground' :
                    position === 2 ? 'bg-silver text-silver-foreground' :
                    position === 3 ? 'bg-bronze text-bronze-foreground' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {position}
                  </div>

                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold truncate ${isCurrentUser ? 'text-primary' : ''}`}>
                      {entry.display_name}
                      {isCurrentUser && <span className="text-xs ml-2">(You)</span>}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {entry.exact_scores} exact, {entry.correct_results} correct
                    </p>
                  </div>

                  {/* Points */}
                  <div className="text-right">
                    <p className="text-2xl font-bold">{entry.total_points}</p>
                    <p className="text-xs text-muted-foreground">pts</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
