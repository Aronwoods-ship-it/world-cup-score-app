import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { Group } from '@/lib/types'
import { ChevronRight, Users } from 'lucide-react'

interface GroupListProps {
  groups: Group[]
}

export function GroupList({ groups }: GroupListProps) {
  if (groups.length === 0) {
    return (
      <div className="text-center py-12 bg-card rounded-lg">
        <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-lg font-semibold text-foreground mb-2">No groups yet</p>
        <p className="text-sm text-muted-foreground mb-4">
          Create a group or join one with an invite code
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {groups.map((group) => (
        <Link
          key={group.id}
          href={`/dashboard/group/${group.id}`}
          className="block bg-card rounded-lg border-l-4 border-l-primary hover:bg-secondary/30 transition-colors"
        >
          <div className="p-4 flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-foreground truncate">{group.name}</h3>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-muted-foreground">
                  Code: <code className="font-mono font-semibold">{group.invite_code}</code>
                </span>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          </div>
        </Link>
      ))}
    </div>
  )
}
