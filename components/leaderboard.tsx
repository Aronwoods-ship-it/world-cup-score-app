'use client'

import { useMemo } from 'react'
import type { Prediction, MatchWithTeams } from '@/lib/types'
import { Trophy, Target, TrendingUp } from 'lucide-react'

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
    <div className="bg-card rounded-lg overflow-hidden">
      {/* Header - Sky Sports style */}
      <div className="bg-primary px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary-foreground" />
            <h2 className="font-bold text-primary-foreground">LEADERBOARD</h2>
          </div>
          <span className="text-xs text-primary-foreground/80">
            {completedMatchCount}/{matches.length} played
          </span>
        </div>
      </div>

      {/* Table header */}
      <div className="bg-secondary/50 px-4 py-2 grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 text-xs font-bold text-muted-foreground uppercase">
        <span className="w-8">#</span>
        <span>Player</span>
        <span className="text-center w-12" title="Exact Scores">
          <Target className="h-3 w-3 inline" />
        </span>
        <span className="text-center w-12" title="Correct Results">
          <TrendingUp className="h-3 w-3 inline" />
        </span>
        <span className="text-right w-16">PTS</span>
      </div>

      {/* Leaderboard entries */}
      {leaderboard.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">
          <p className="font-semibold">No members yet</p>
          <p className="text-sm">Invite your friends to join!</p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {leaderboard.map((entry, index) => {
            const isCurrentUser = entry.user_id === currentUserId
            const position = index + 1
            
            return (
              <div
                key={entry.user_id}
                className={`px-4 py-3 grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center transition-colors ${
                  isCurrentUser ? 'bg-primary/10' : 'hover:bg-secondary/30'
                }`}
              >
                {/* Position */}
                <div className={`w-8 h-8 rounded flex items-center justify-center font-black text-sm ${
                  position === 1 ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-black' :
                  position === 2 ? 'bg-gradient-to-br from-slate-300 to-slate-500 text-black' :
                  position === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-black' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {position}
                </div>

                {/* Name */}
                <div className="min-w-0">
                  <p className={`font-semibold truncate ${isCurrentUser ? 'text-primary' : 'text-foreground'}`}>
                    {entry.display_name}
                  </p>
                  {isCurrentUser && (
                    <span className="text-[10px] text-primary uppercase font-bold">You</span>
                  )}
                </div>

                {/* Exact scores */}
                <span className="text-center w-12 tabular-nums font-semibold text-muted-foreground">
                  {entry.exact_scores}
                </span>

                {/* Correct results */}
                <span className="text-center w-12 tabular-nums font-semibold text-muted-foreground">
                  {entry.correct_results}
                </span>

                {/* Points */}
                <div className="text-right w-16">
                  <span className={`text-xl font-black tabular-nums ${
                    position === 1 ? 'text-amber-400' :
                    position === 2 ? 'text-slate-400' :
                    position === 3 ? 'text-orange-400' :
                    'text-foreground'
                  }`}>
                    {entry.total_points}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Footer legend */}
      <div className="bg-secondary/30 px-4 py-2 flex items-center gap-4 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <Target className="h-3 w-3" /> Exact Score (+5)
        </span>
        <span className="flex items-center gap-1">
          <TrendingUp className="h-3 w-3" /> Correct Result (+2/+3)
        </span>
      </div>
    </div>
  )
}
