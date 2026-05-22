'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Group } from '@/lib/types'

interface GroupInfoProps {
  group: Group
  memberCount: number
}

export function GroupInfo({ group, memberCount }: GroupInfoProps) {
  const [copied, setCopied] = useState(false)

  const copyInviteCode = async () => {
    await navigator.clipboard.writeText(group.invite_code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{group.name}</h1>
            <p className="text-sm text-muted-foreground">
              {memberCount} {memberCount === 1 ? 'member' : 'members'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-muted px-3 py-2 rounded-lg">
              <p className="text-xs text-muted-foreground">Invite Code</p>
              <code className="font-mono text-lg font-bold">{group.invite_code}</code>
            </div>
            <Button variant="outline" size="sm" onClick={copyInviteCode}>
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
