'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface CreateGroupFormProps {
  userId: string
}

function generateInviteCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export function CreateGroupForm({ userId }: CreateGroupFormProps) {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const inviteCode = generateInviteCode()

    // Create the group
    const { data: group, error: groupError } = await supabase
      .from('groups')
      .insert({
        name: name.trim(),
        invite_code: inviteCode,
        created_by: userId,
      })
      .select()
      .single()

    if (groupError) {
      setError(groupError.message)
      setLoading(false)
      return
    }

    // Add creator as a member
    const { error: memberError } = await supabase
      .from('group_members')
      .insert({
        group_id: group.id,
        user_id: userId,
      })

    if (memberError) {
      setError(memberError.message)
      setLoading(false)
      return
    }

    setName('')
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
        <Label htmlFor="groupName" className="text-xs uppercase font-semibold text-muted-foreground">
          Group Name
        </Label>
        <Input
          id="groupName"
          type="text"
          placeholder="e.g., The Lads"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          minLength={2}
          maxLength={50}
          className="h-11"
        />
      </div>
      <Button type="submit" className="w-full h-11 font-bold" disabled={loading}>
        {loading ? 'Creating...' : 'Create Group'}
      </Button>
    </form>
  )
}
