'use client'

import { useMemo } from 'react'
import type { Prediction, MatchWithTeams } from '@/lib/types'
import { Trophy, Target, TrendingUp } from 'lucide-react'
import { players, getRandomRoast } from '@/lib/players'

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
  playerId?: string
}

function calculatePoints(
  predictedHome: number,
  predictedAway: number,
  actualHome: number,
  actualAway: number
): { points: number; isExact: boolean; isCorrectResult: boolean } {
  if (predictedHome === actualHome && predictedAway === actualAway) {
    return { points: 5, isExact: true, isCorrectResult: true }
  }

  const predictedDiff = predictedHome - predictedAway
  const actualDiff = actualHome - actualAway
  
  const predictedResult = predictedHome > predictedAway ? 'home' : predictedHome < predictedAway ? 'away' : 'draw'
  const actualResult = actualHome > actualAway ? 'home' : actualHome < actualAway ? 'away' : 'draw'

  if (predictedResult === actualResult && predictedDiff === actualDiff) {
    return { points: 3, isExact: false, isCorrectResult: true }
  }

  if (predictedResult === actualResult) {
    return { points: 2, isExact: false, isCorrectResult: true }
  }

  return { points: 0, isExact: false, isCorrectResult: false }
}

// Match display name to player data
function findPlayer(displayName: string) {
  const nameLower = displayName.toLowerCase()
  return players.find(p => 
    nameLower.includes(p.id) || 
    nameLower.includes(p.name.toLowerCase()) ||
    (p.nickname && nameLower.includes(p.nickname.toLowerCase()))
  )
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

      const player = findPlayer(member.display_name)

      return {
        user_id: member.user_id,
        display_name: member.display_name,
        total_points,
        predictions_count,
        exact_scores,
        correct_results,
        playerId: player?.id,
      }
    })

    return entries.sort((a, b) => {
      if (b.total_points !== a.total_points) return b.total_points - a.total_points
      if (b.exact_scores !== a.exact_scores) return b.exact_scores - a.exact_scores
      return b.correct_results - a.correct_results
    })
  }, [members, predictions, matches])

  const completedMatchCount = matches.filter(m => m.is_completed).length

  // Get roasts for top and bottom players
  const topPlayer = leaderboard[0]
  const bottomPlayer = leaderboard.length > 1 ? leaderboard[leaderboard.length - 1] : null
  
  const topRoast = topPlayer?.playerId ? getRandomRoast(topPlayer.playerId, 'topOfLeaderboard') : null
  const bottomRoast = bottomPlayer?.playerId ? getRandomRoast(bottomPlayer.playerId, 'bottomOfLeaderboard') : null

  return (
    <div className="bg-white border border-[#e0e0e0] rounded overflow-hidden">
      {/* Header - Sky Sports style */}
      <div className="bg-[#001538] px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-white" />
            <h2 className="font-bold text-white text-sm">LEADERBOARD</h2>
          </div>
          <span className="text-xs text-white/70">
            {completedMatchCount}/{matches.length} played
          </span>
        </div>
      </div>

      {/* Roast banner for top player */}
      {topRoast && completedMatchCount > 0 && (
        <div className="bg-gradient-to-r from-[#b8860b]/10 to-[#ffd700]/10 border-b border-[#b8860b]/30 px-4 py-3">
          <p className="text-sm text-[#8b6914] italic text-center">
            &ldquo;{topRoast}&rdquo;
          </p>
        </div>
      )}

      {/* Table header */}
      <div className="bg-[#f5f5f5] px-4 py-2 grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 text-xs font-semibold text-[#666] uppercase border-b border-[#e0e0e0]">
        <span className="w-8 text-center">#</span>
        <span>Player</span>
        <span className="text-center w-10" title="Exact Scores">
          <Target className="h-3 w-3 inline" />
        </span>
        <span className="text-center w-10" title="Correct Results">
          <TrendingUp className="h-3 w-3 inline" />
        </span>
        <span className="text-right w-14">PTS</span>
      </div>

      {/* Leaderboard entries */}
      {leaderboard.length === 0 ? (
        <div className="text-center text-[#666] py-12">
          <p className="font-semibold">No members yet</p>
          <p className="text-sm">Invite your friends to join!</p>
        </div>
      ) : (
        <div className="divide-y divide-[#e0e0e0]">
          {leaderboard.map((entry, index) => {
            const isCurrentUser = entry.user_id === currentUserId
            const position = index + 1
            const player = entry.playerId ? players.find(p => p.id === entry.playerId) : null
            
            return (
              <div
                key={entry.user_id}
                className={`px-4 py-3 grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center ${
                  isCurrentUser ? 'bg-[#fff9e6]' : 'hover:bg-[#f8f8f8]'
                }`}
              >
                {/* Position */}
                <div className={`w-8 h-8 rounded flex items-center justify-center font-bold text-sm ${
                  position === 1 ? 'pos-1' :
                  position === 2 ? 'pos-2' :
                  position === 3 ? 'pos-3' :
                  'bg-[#f0f0f0] text-[#666]'
                }`}>
                  {position}
                </div>

                {/* Name and traits */}
                <div className="min-w-0">
                  <p className={`font-semibold text-sm truncate ${isCurrentUser ? 'text-[#cc0000]' : 'text-[#001538]'}`}>
                    {entry.display_name}
                    {isCurrentUser && <span className="text-[10px] text-[#cc0000] ml-1">(You)</span>}
                  </p>
                  {player && (
                    <p className="text-[10px] text-[#999] truncate">
                      {player.team} &bull; {player.traits.slice(0, 2).join(', ')}
                    </p>
                  )}
                </div>

                {/* Exact scores */}
                <span className="text-center w-10 tabular-nums font-semibold text-[#666] text-sm">
                  {entry.exact_scores}
                </span>

                {/* Correct results */}
                <span className="text-center w-10 tabular-nums font-semibold text-[#666] text-sm">
                  {entry.correct_results}
                </span>

                {/* Points */}
                <div className="text-right w-14">
                  <span className={`text-lg font-bold tabular-nums ${
                    position === 1 ? 'text-[#b8860b]' :
                    position === 2 ? 'text-[#808080]' :
                    position === 3 ? 'text-[#cd7f32]' :
                    'text-[#001538]'
                  }`}>
                    {entry.total_points}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Roast banner for bottom player */}
      {bottomRoast && completedMatchCount > 0 && leaderboard.length > 1 && (
        <div className="bg-gradient-to-r from-[#cc0000]/5 to-[#ff6666]/5 border-t border-[#cc0000]/20 px-4 py-3">
          <p className="text-sm text-[#cc0000]/80 italic text-center">
            &ldquo;{bottomRoast}&rdquo;
          </p>
        </div>
      )}

      {/* Footer legend */}
      <div className="bg-[#f5f5f5] px-4 py-2 flex items-center gap-4 text-[10px] text-[#666] border-t border-[#e0e0e0]">
        <span className="flex items-center gap-1">
          <Target className="h-3 w-3" /> Exact (+5)
        </span>
        <span className="flex items-center gap-1">
          <TrendingUp className="h-3 w-3" /> Result (+2/+3)
        </span>
      </div>
    </div>
  )
}
