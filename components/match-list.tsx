'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PredictionForm } from '@/components/prediction-form'
import type { MatchWithTeams, Prediction } from '@/lib/types'

interface MatchListProps {
  matches: MatchWithTeams[]
  predictions: Map<string, Prediction>
  groupId: string
  userId: string
}

type GroupFilter = 'all' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L'

export function MatchList({ matches, predictions, groupId, userId }: MatchListProps) {
  const [filter, setFilter] = useState<GroupFilter>('all')
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null)

  const groups: GroupFilter[] = ['all', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']

  const filteredMatches = filter === 'all' 
    ? matches 
    : matches.filter(m => m.group_letter === filter)

  const now = new Date()

  return (
    <div className="space-y-4">
      {/* Group filter */}
      <div className="flex flex-wrap gap-2">
        {groups.map((g) => (
          <Button
            key={g}
            variant={filter === g ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(g)}
            className="min-w-[40px]"
          >
            {g === 'all' ? 'All' : g}
          </Button>
        ))}
      </div>

      {/* Match list */}
      <div className="space-y-3">
        {filteredMatches.map((match) => {
          const prediction = predictions.get(match.id)
          const matchDate = new Date(match.match_date)
          const isLocked = matchDate <= now
          const isExpanded = expandedMatch === match.id

          return (
            <Card key={match.id} className={match.is_completed ? 'opacity-80' : ''}>
              <CardContent className="pt-4 space-y-3">
                {/* Match header */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Group {match.group_letter}</span>
                  <span>
                    {matchDate.toLocaleDateString('en-GB', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short',
                    })}{' '}
                    {matchDate.toLocaleTimeString('en-GB', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                {/* Teams and scores */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 text-right">
                    <span className="text-lg mr-2">{match.home_team.flag_emoji}</span>
                    <span className="font-semibold">{match.home_team.code}</span>
                  </div>

                  <div className="flex items-center gap-2 min-w-[80px] justify-center">
                    {match.is_completed ? (
                      <span className="text-xl font-bold">
                        {match.home_score} - {match.away_score}
                      </span>
                    ) : prediction ? (
                      <span className="text-lg font-mono bg-primary/10 px-3 py-1 rounded">
                        {prediction.predicted_home_score} - {prediction.predicted_away_score}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">vs</span>
                    )}
                  </div>

                  <div className="flex-1 text-left">
                    <span className="font-semibold">{match.away_team.code}</span>
                    <span className="text-lg ml-2">{match.away_team.flag_emoji}</span>
                  </div>
                </div>

                {/* Prediction status and points */}
                <div className="flex items-center justify-between">
                  {match.is_completed && prediction ? (
                    <span className={`text-sm font-semibold ${
                      prediction.points_earned === 5 ? 'text-primary' :
                      prediction.points_earned === 3 ? 'text-accent' :
                      prediction.points_earned === 2 ? 'text-muted-foreground' :
                      'text-destructive'
                    }`}>
                      +{prediction.points_earned} pts
                    </span>
                  ) : isLocked ? (
                    <span className="text-xs text-muted-foreground">Locked</span>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      {prediction ? 'Prediction saved' : 'No prediction'}
                    </span>
                  )}

                  {!isLocked && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedMatch(isExpanded ? null : match.id)}
                    >
                      {prediction ? 'Edit' : 'Predict'}
                    </Button>
                  )}
                </div>

                {/* Prediction form */}
                {isExpanded && !isLocked && (
                  <PredictionForm
                    match={match}
                    groupId={groupId}
                    userId={userId}
                    existingPrediction={prediction}
                    onClose={() => setExpandedMatch(null)}
                  />
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredMatches.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No matches found for this group
        </div>
      )}
    </div>
  )
}
