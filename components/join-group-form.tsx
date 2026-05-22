'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface JoinGroupFormProps {
  userId: string
}

export function JoinGroupForm({ userId }: JoinGroupFormProps) {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const normalizedCode = code.trim().toUpperCase()

    // Find the group
    const { data: group, error: groupError } = await supabase
      .from('groups')
      .select('id')
      .eq('invite_code', normalizedCode)
      .single()

    if (groupError || !group) {
      setError('Invalid invite code. Please check and try again.')
      setLoading(false)
      return
    }

    // Check if already a member
    const { data: existingMember } = await supabase
      .from('group_members')
      .select('id')
      .eq('group_id', group.id)
      .eq('user_id', userId)
      .single()

    if (existingMember) {
      setError('You are already a member of this group.')
      setLoading(false)
      return
    }

    // Join the group
    const { error: joinError } = await supabase
      .from('group_members')
      .insert({
        group_id: group.id,
        user_id: userId,
      })

    if (joinError) {
      setError(joinError.message)
      setLoading(false)
      return
    }

    setCode('')
    router.refresh()
    router.push(`/dashboard/group/${group.id}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded">
          {error}
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="inviteCode" className="text-xs uppercase font-semibold text-muted-foreground">
          Invite Code
        </Label>
        <Input
          id="inviteCode"
          type="text"
          placeholder="e.g., ABC123"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          required
          maxLength={6}
          className="font-mono uppercase h-11 text-center text-lg tracking-widest"
        />
      </div>
      <Button type="submit" variant="outline" className="w-full h-11 font-bold" disabled={loading}>
        {loading ? 'Joining...' : 'Join Group'}
      </Button>
    </form>
  )
}
