'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { PredictionForm } from '@/components/prediction-form'
import type { MatchWithTeams, Prediction } from '@/lib/types'
import { ChevronDown, ChevronUp, Lock, Check } from 'lucide-react'

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
  if (matchDate <= now) return 'LIVE' // Simplified - in reality you'd check actual live status
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
  return date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
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
      {/* Group filter - Sky Sports style horizontal scroll */}
      <div className="bg-secondary/50 rounded-lg p-2">
        <div className="flex gap-1 overflow-x-auto pb-1">
          {groups.map((g) => (
            <Button
              key={g}
              variant={filter === g ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilter(g)}
              className={`min-w-[44px] h-9 font-bold ${filter === g ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {g === 'all' ? 'ALL' : `GRP ${g}`}
            </Button>
          ))}
        </div>
      </div>

      {/* Matches grouped by date */}
      <div className="space-y-6">
        {Array.from(groupedMatches.entries()).map(([dateStr, dateMatches]) => {
          const date = new Date(dateStr)
          return (
            <div key={dateStr} className="space-y-2">
              {/* Date header */}
              <div className="flex items-center gap-2 px-2">
                <span className="text-sm font-bold text-primary uppercase tracking-wide">
                  {formatMatchDate(date)}
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Match cards */}
              <div className="space-y-1">
                {dateMatches.map((match) => {
                  const prediction = predictions.get(match.id)
                  const matchDate = new Date(match.match_date)
                  const isLocked = matchDate <= now
                  const isExpanded = expandedMatch === match.id
                  const status = getMatchStatus(match)

                  return (
                    <div key={match.id} className="bg-card rounded overflow-hidden">
                      {/* Main match row */}
                      <button
                        onClick={() => !isLocked && setExpandedMatch(isExpanded ? null : match.id)}
                        disabled={isLocked && !prediction}
                        className={`w-full text-left p-3 border-l-4 transition-all ${
                          match.is_completed ? 'border-l-muted' : 
                          status === 'LIVE' ? 'border-l-primary' : 
                          prediction ? 'border-l-success' : 'border-l-transparent'
                        } ${!isLocked ? 'hover:bg-secondary/30' : ''}`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Status badge */}
                          <div className={`score-badge min-w-[44px] ${
                            status === 'FT' ? 'score-badge-ft' :
                            status === 'LIVE' ? 'score-badge-live' :
                            status === 'HT' ? 'score-badge-ht' :
                            'score-badge-upcoming'
                          }`}>
                            {status === 'upcoming' 
                              ? matchDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
                              : status
                            }
                          </div>

                          {/* Teams and scores */}
                          <div className="flex-1 min-w-0">
                            {/* Home team */}
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="text-base">{match.home_team.flag_emoji}</span>
                                <span className={`font-semibold truncate ${
                                  match.is_completed && match.home_score !== null && match.away_score !== null && match.home_score > match.away_score
                                    ? 'text-foreground' : 'text-muted-foreground'
                                }`}>
                                  {match.home_team.name}
                                </span>
                              </div>
                              <span className="text-lg font-bold tabular-nums min-w-[24px] text-right">
                                {match.is_completed ? match.home_score : prediction?.predicted_home_score ?? '-'}
                              </span>
                            </div>
                            {/* Away team */}
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="text-base">{match.away_team.flag_emoji}</span>
                                <span className={`font-semibold truncate ${
                                  match.is_completed && match.home_score !== null && match.away_score !== null && match.away_score > match.home_score
                                    ? 'text-foreground' : 'text-muted-foreground'
                                }`}>
                                  {match.away_team.name}
                                </span>
                              </div>
                              <span className="text-lg font-bold tabular-nums min-w-[24px] text-right">
                                {match.is_completed ? match.away_score : prediction?.predicted_away_score ?? '-'}
                              </span>
                            </div>
                          </div>

                          {/* Right side info */}
                          <div className="flex flex-col items-end gap-1">
                            {match.is_completed && prediction ? (
                              <span className={`text-sm font-bold px-2 py-0.5 rounded ${
                                prediction.points_earned === 5 ? 'bg-success/20 text-success' :
                                prediction.points_earned === 3 ? 'bg-accent/20 text-accent' :
                                prediction.points_earned === 2 ? 'bg-muted text-muted-foreground' :
                                'bg-destructive/20 text-destructive'
                              }`}>
                                +{prediction.points_earned}
                              </span>
                            ) : isLocked ? (
                              <Lock className="h-4 w-4 text-muted-foreground" />
                            ) : prediction ? (
                              <Check className="h-4 w-4 text-success" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className="text-[10px] text-muted-foreground uppercase">
                              Grp {match.group_letter}
                            </span>
                          </div>
                        </div>
                      </button>

                      {/* Expanded prediction form */}
                      {isExpanded && !isLocked && (
                        <div className="border-t border-border p-3 bg-secondary/30">
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
        <div className="text-center py-12 text-muted-foreground bg-card rounded-lg">
          <p className="text-lg font-semibold">No matches found</p>
          <p className="text-sm">Try selecting a different group</p>
        </div>
      )}
    </div>
  )
}
