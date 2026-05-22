'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import type { Group } from '@/lib/types'
import { Users, Copy, Check, Share2 } from 'lucide-react'

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

  const shareGroup = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Join ${group.name} on Da Boyz and Ting`,
          text: `Join my World Cup predictions group! Use code: ${group.invite_code}`,
          url: window.location.origin,
        })
      } catch {
        // User cancelled or share failed
      }
    } else {
      copyInviteCode()
    }
  }

  return (
    <div className="bg-card rounded-lg overflow-hidden">
      {/* Header with primary background */}
      <div className="bg-primary px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-primary-foreground text-lg uppercase tracking-wide truncate">
            {group.name}
          </h1>
          <div className="flex items-center gap-1 text-primary-foreground/80">
            <Users className="h-4 w-4" />
            <span className="text-sm font-semibold">{memberCount}</span>
          </div>
        </div>
      </div>

      {/* Invite code section */}
      <div className="p-4">
        <div className="flex items-center justify-between gap-4 bg-secondary/50 rounded-lg p-3">
          <div>
            <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Invite Code</p>
            <code className="font-mono text-xl font-black tracking-widest text-foreground">
              {group.invite_code}
            </code>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={copyInviteCode}
              className="h-10 w-10"
            >
              {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
            </Button>
            <Button 
              variant="default" 
              size="icon" 
              onClick={shareGroup}
              className="h-10 w-10"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Share this code with your friends so they can join
        </p>
      </div>
    </div>
  )
}
