'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { MatchWithTeams, Prediction } from '@/lib/types'

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
    existingPrediction?.predicted_home_score?.toString() || ''
  )
  const [awayScore, setAwayScore] = useState(
    existingPrediction?.predicted_away_score?.toString() || ''
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const homeScoreNum = parseInt(homeScore)
    const awayScoreNum = parseInt(awayScore)

    if (isNaN(homeScoreNum) || isNaN(awayScoreNum) || homeScoreNum < 0 || awayScoreNum < 0) {
      setError('Please enter valid scores')
      setLoading(false)
      return
    }

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
          predicted_home_score: homeScoreNum,
          predicted_away_score: awayScoreNum,
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
          predicted_home_score: homeScoreNum,
          predicted_away_score: awayScoreNum,
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
    <form onSubmit={handleSubmit} className="border-t pt-4 mt-2 space-y-4">
      {error && (
        <div className="p-2 text-xs text-destructive bg-destructive/10 rounded">
          {error}
        </div>
      )}
      
      <div className="flex items-center justify-center gap-4">
        <div className="text-center">
          <Label htmlFor="homeScore" className="text-xs text-muted-foreground block mb-1">
            {match.home_team.code}
          </Label>
          <Input
            id="homeScore"
            type="number"
            min="0"
            max="20"
            value={homeScore}
            onChange={(e) => setHomeScore(e.target.value)}
            className="w-16 text-center text-lg font-mono"
            required
          />
        </div>
        <span className="text-muted-foreground">-</span>
        <div className="text-center">
          <Label htmlFor="awayScore" className="text-xs text-muted-foreground block mb-1">
            {match.away_team.code}
          </Label>
          <Input
            id="awayScore"
            type="number"
            min="0"
            max="20"
            value={awayScore}
            onChange={(e) => setAwayScore(e.target.value)}
            className="w-16 text-center text-lg font-mono"
            required
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="button" variant="ghost" size="sm" onClick={onClose} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" size="sm" disabled={loading} className="flex-1">
          {loading ? 'Saving...' : 'Save Prediction'}
        </Button>
      </div>
    </form>
  )
}
