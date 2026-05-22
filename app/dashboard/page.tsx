import { createClient } from '@/lib/supabase/server'
import { GroupList } from '@/components/group-list'
import { CreateGroupForm } from '@/components/create-group-form'
import { JoinGroupForm } from '@/components/join-group-form'

export default async function DashboardPage() {
  const supabase = await createClient()
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
    <div className="container mx-auto px-4 py-6 space-y-8">
      <section>
        <h1 className="text-2xl font-bold mb-6">Your Groups</h1>
        
        {groups.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-lg border">
            <h2 className="text-lg font-semibold mb-2">No groups yet</h2>
            <p className="text-muted-foreground mb-6">
              Create a new group or join one with an invite code
            </p>
          </div>
        ) : (
          <GroupList groups={groups as any} />
        )}
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        <section>
          <h2 className="text-lg font-semibold mb-4">Create a Group</h2>
          <CreateGroupForm userId={user.id} />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">Join a Group</h2>
          <JoinGroupForm userId={user.id} />
        </section>
      </div>
    </div>
  )
}
