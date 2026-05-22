import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Group } from '@/lib/types'

interface GroupListProps {
  groups: Group[]
}

export function GroupList({ groups }: GroupListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => (
        <Card key={group.id} className="hover:border-primary/50 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{group.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Invite Code</span>
              <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
                {group.invite_code}
              </code>
            </div>
            <Button asChild className="w-full">
              <Link href={`/dashboard/group/${group.id}`}>
                View Group
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
