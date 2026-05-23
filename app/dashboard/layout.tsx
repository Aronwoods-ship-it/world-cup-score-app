import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardClient } from '@/components/dashboard-client'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  if (!supabase) {
    redirect('/auth/login')
  }
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

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
    <DashboardClient 
      displayName={profile?.display_name || 'Player'} 
      userId={user.id}
      groups={groups as any}
    />
  )
}
