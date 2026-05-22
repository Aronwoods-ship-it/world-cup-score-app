'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { MatchWithTeams, Prediction } from '@/lib/types'
import { Minus, Plus } from 'lucide-react'

interface PredictionFormProps {
  match: MatchWithTeams
  groupId: string
  userId: string
  existingPrediction?: Prediction
  onClose: () => void
}

export function PredictionForm({
  match,
  groupId,
  userId,
  existingPrediction,
  onClose,
}: PredictionFormProps) {
  const [homeScore, setHomeScore] = useState(
    existingPrediction?.predicted_home_score ?? 0
  )
  const [awayScore, setAwayScore] = useState(
    existingPrediction?.predicted_away_score ?? 0
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const adjustScore = (team: 'home' | 'away', delta: number) => {
    if (team === 'home') {
      setHomeScore(Math.max(0, Math.min(20, homeScore + delta)))
    } else {
      setAwayScore(Math.max(0, Math.min(20, awayScore + delta)))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    // Check if match is locked
    const matchDate = new Date(match.match_date)
    if (matchDate <= new Date()) {
      setError('This match is already locked')
      setLoading(false)
      return
    }

    if (existingPrediction) {
      // Update existing prediction
      const { error: updateError } = await supabase
        .from('predictions')
        .update({
          predicted_home_score: homeScore,
          predicted_away_score: awayScore,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingPrediction.id)

      if (updateError) {
        setError(updateError.message)
        setLoading(false)
        return
      }
    } else {
      // Create new prediction
      const { error: insertError } = await supabase
        .from('predictions')
        .insert({
          user_id: userId,
          group_id: groupId,
          match_id: match.id,
          predicted_home_score: homeScore,
          predicted_away_score: awayScore,
        })

      if (insertError) {
        setError(insertError.message)
        setLoading(false)
        return
      }
    }

    router.refresh()
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-2 text-xs text-destructive bg-destructive/10 rounded">
          {error}
        </div>
      )}
      
      <div className="flex items-center justify-center gap-6">
        {/* Home Team */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-bold text-muted-foreground uppercase">{match.home_team.code}</span>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-10 w-10"
              onClick={() => adjustScore('home', -1)}
              disabled={homeScore <= 0}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              min="0"
              max="20"
              value={homeScore}
              onChange={(e) => setHomeScore(Math.max(0, Math.min(20, parseInt(e.target.value) || 0)))}
              className="w-14 h-12 text-center text-xl font-bold tabular-nums"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-10 w-10"
              onClick={() => adjustScore('home', 1)}
              disabled={homeScore >= 20}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <span className="text-2xl font-bold text-muted-foreground">-</span>

        {/* Away Team */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-bold text-muted-foreground uppercase">{match.away_team.code}</span>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-10 w-10"
              onClick={() => adjustScore('away', -1)}
              disabled={awayScore <= 0}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              min="0"
              max="20"
              value={awayScore}
              onChange={(e) => setAwayScore(Math.max(0, Math.min(20, parseInt(e.target.value) || 0)))}
              className="w-14 h-12 text-center text-xl font-bold tabular-nums"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-10 w-10"
              onClick={() => adjustScore('away', 1)}
              disabled={awayScore >= 20}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="button" variant="ghost" onClick={onClose} className="flex-1 h-11">
          Cancel
        </Button>
        <Button type="submit" disabled={loading} className="flex-1 h-11 font-bold">
          {loading ? 'Saving...' : existingPrediction ? 'Update' : 'Save Prediction'}
        </Button>
      </div>
    </form>
  )
}
