'use client'

import { useState, useMemo } from 'react'
import { PredictionForm } from '@/components/prediction-form'
import type { MatchWithTeams, Prediction } from '@/lib/types'
import { Lock, Check, ChevronRight } from 'lucide-react'

interface MatchListProps {
  matches: MatchWithTeams[]
  predictions: Map<string, Prediction>
  groupId: string
  userId: string
}

type GroupFilter = 'all' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L'

function getMatchStatus(match: MatchWithTeams): 'FT' | 'LIVE' | 'HT' | 'upcoming' {
  if (match.is_completed) return 'FT'
  const now = new Date()
  const matchDate = new Date(match.match_date)
  if (matchDate <= now) return 'LIVE'
  return 'upcoming'
}

function formatMatchDate(date: Date): string {
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  if (date.toDateString() === now.toDateString()) {
    return 'Today'
  }
  if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow'
  }
  return date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })
}

function groupMatchesByDate(matches: MatchWithTeams[]): Map<string, MatchWithTeams[]> {
  const grouped = new Map<string, MatchWithTeams[]>()
  matches.forEach(match => {
    const date = new Date(match.match_date).toDateString()
    if (!grouped.has(date)) {
      grouped.set(date, [])
    }
    grouped.get(date)!.push(match)
  })
  return grouped
}

export function MatchList({ matches, predictions, groupId, userId }: MatchListProps) {
  const [filter, setFilter] = useState<GroupFilter>('all')
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null)

  const groups: GroupFilter[] = ['all', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']

  const filteredMatches = filter === 'all' 
    ? matches 
    : matches.filter(m => m.group_letter === filter)

  const groupedMatches = useMemo(() => groupMatchesByDate(filteredMatches), [filteredMatches])
  const now = new Date()

  return (
    <div className="space-y-4">
      {/* Group filter - Sky Sports horizontal scroll tabs */}
      <div className="bg-white border-b border-[#e0e0e0] -mx-4 px-4 overflow-x-auto">
        <div className="flex">
          {groups.map((g) => (
            <button
              key={g}
              onClick={() => setFilter(g)}
              className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                filter === g 
                  ? 'text-[#cc0000] border-[#cc0000]' 
                  : 'text-[#666] border-transparent hover:text-[#001538]'
              }`}
            >
              {g === 'all' ? 'All' : `Group ${g}`}
            </button>
          ))}
        </div>
      </div>

      {/* Matches grouped by date - Sky Sports style */}
      <div className="space-y-0">
        {Array.from(groupedMatches.entries()).map(([dateStr, dateMatches]) => {
          const date = new Date(dateStr)
          return (
            <div key={dateStr}>
              {/* Date header - Sky Sports grey bar */}
              <div className="date-header">
                {formatMatchDate(date)}
              </div>

              {/* Match rows */}
              <div>
                {dateMatches.map((match) => {
                  const prediction = predictions.get(match.id)
                  const matchDate = new Date(match.match_date)
                  const isLocked = matchDate <= now
                  const isExpanded = expandedMatch === match.id
                  const status = getMatchStatus(match)

                  return (
                    <div key={match.id}>
                      {/* Match row - Sky Sports score ticker style */}
                      <button
                        onClick={() => !isLocked && setExpandedMatch(isExpanded ? null : match.id)}
                        disabled={isLocked && !prediction}
                        className="score-row w-full text-left"
                      >
                        {/* Status badge */}
                        <div className={`
                          ${status === 'FT' ? 'badge-ft' : ''}
                          ${status === 'LIVE' ? 'badge-live' : ''}
                          ${status === 'HT' ? 'badge-ht' : ''}
                          ${status === 'upcoming' ? 'badge-upcoming' : ''}
                          min-w-[48px] text-center
                        `}>
                          {status === 'upcoming' 
                            ? matchDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
                            : status
                          }
                        </div>

                        {/* Teams and scores */}
                        <div className="flex-1 mx-4">
                          {/* Home team */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-base">{match.home_team.flag_emoji}</span>
                              <span className={`team-name ${
                                match.is_completed && match.home_score !== null && match.away_score !== null && match.home_score > match.away_score
                                  ? 'text-[#001538] font-bold' : ''
                              }`}>
                                {match.home_team.name}
                              </span>
                            </div>
                            <span className="team-score">
                              {match.is_completed ? match.home_score : (prediction?.predicted_home_score ?? '-')}
                            </span>
                          </div>
                          {/* Away team */}
                          <div className="flex items-center justify-between mt-1">
                            <div className="flex items-center gap-2">
                              <span className="text-base">{match.away_team.flag_emoji}</span>
                              <span className={`team-name ${
                                match.is_completed && match.home_score !== null && match.away_score !== null && match.away_score > match.home_score
                                  ? 'text-[#001538] font-bold' : ''
                              }`}>
                                {match.away_team.name}
                              </span>
                            </div>
                            <span className="team-score">
                              {match.is_completed ? match.away_score : (prediction?.predicted_away_score ?? '-')}
                            </span>
                          </div>
                        </div>

                        {/* Competition & status */}
                        <div className="flex flex-col items-end gap-1 min-w-[60px]">
                          {match.is_completed && prediction ? (
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                              prediction.points_earned === 5 ? 'bg-green-100 text-green-700' :
                              prediction.points_earned === 3 ? 'bg-blue-100 text-blue-700' :
                              prediction.points_earned === 2 ? 'bg-gray-100 text-gray-600' :
                              'bg-red-100 text-red-600'
                            }`}>
                              +{prediction.points_earned} pts
                            </span>
                          ) : isLocked ? (
                            <Lock className="h-4 w-4 text-[#999]" />
                          ) : prediction ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-[#ccc]" />
                          )}
                          <span className="comp-badge">WC Grp {match.group_letter}</span>
                        </div>
                      </button>

                      {/* Expanded prediction form */}
                      {isExpanded && !isLocked && (
                        <div className="bg-[#f8f8f8] border-b border-[#e0e0e0] p-4">
                          <PredictionForm
                            match={match}
                            groupId={groupId}
                            userId={userId}
                            existingPrediction={prediction}
                            onClose={() => setExpandedMatch(null)}
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {filteredMatches.length === 0 && (
        <div className="text-center py-12 text-[#666] bg-white border border-[#e0e0e0] rounded">
          <p className="text-base font-semibold">No matches found</p>
          <p className="text-sm">Try selecting a different group</p>
        </div>
      )}
    </div>
  )
}
