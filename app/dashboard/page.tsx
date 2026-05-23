import { createClient } from '@/lib/supabase/server'
import { GroupList } from '@/components/group-list'
import { CreateGroupForm } from '@/components/create-group-form'
import { JoinGroupForm } from '@/components/join-group-form'
import { Trophy, Users, Plus, UserPlus } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  if (!supabase) return null
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  // Get user's groups
  const { data: memberships } = await supabase
    .from('group_members')
    .select(`
      group_id,
      groups (
        id,
        name,
        invite_code,
        created_by,
        created_at
      )
    `)
    .eq('user_id', user.id)

  const groups = memberships?.map(m => m.groups).filter(Boolean) || []

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 max-w-4xl">
      {/* Your Groups Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold uppercase tracking-wide">My Groups</h1>
        </div>
        <GroupList groups={groups as any} />
      </section>

      {/* Create/Join Section */}
      <div className="grid md:grid-cols-2 gap-4">
        <section className="bg-card rounded-lg overflow-hidden">
          <div className="bg-primary/10 border-b border-border px-4 py-3 flex items-center gap-2">
            <Plus className="h-4 w-4 text-primary" />
            <h2 className="font-bold text-sm uppercase tracking-wide">Create New Group</h2>
          </div>
          <div className="p-4">
            <CreateGroupForm userId={user.id} />
          </div>
        </section>

        <section className="bg-card rounded-lg overflow-hidden">
          <div className="bg-primary/10 border-b border-border px-4 py-3 flex items-center gap-2">
            <UserPlus className="h-4 w-4 text-primary" />
            <h2 className="font-bold text-sm uppercase tracking-wide">Join a Group</h2>
          </div>
          <div className="p-4">
            <JoinGroupForm userId={user.id} />
          </div>
        </section>
      </div>

      {/* Quick info */}
      <section className="bg-secondary/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Users className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-semibold text-foreground mb-1">How it works</p>
            <p>Create a group and share the invite code with your friends. Everyone predicts scores for all 72 World Cup group stage matches. The leaderboard updates as matches finish!</p>
          </div>
        </div>
      </section>
    </div>
  )
}
