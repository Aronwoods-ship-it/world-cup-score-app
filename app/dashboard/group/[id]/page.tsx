import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MatchList } from '@/components/match-list'
import { Leaderboard } from '@/components/leaderboard'
import { GroupInfo } from '@/components/group-info'

interface GroupPageProps {
  params: Promise<{ id: string }>
}

export default async function GroupPage({ params }: GroupPageProps) {
  const { id } = await params
  const supabase = await createClient()
  
  if (!supabase) return null
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  // Get group details
  const { data: group, error: groupError } = await supabase
    .from('groups')
    .select('*')
    .eq('id', id)
    .single()

  if (groupError || !group) {
    notFound()
  }

  // Verify user is a member
  const { data: membership } = await supabase
    .from('group_members')
    .select('id')
    .eq('group_id', id)
    .eq('user_id', user.id)
    .single()

  if (!membership) {
    notFound()
  }

  // Get group members with profiles
  const { data: members } = await supabase
    .from('group_members')
    .select(`
      user_id,
      profiles (
        id,
        display_name
      )
    `)
    .eq('group_id', id)

  // Get all matches with teams
  const { data: matches } = await supabase
    .from('matches')
    .select(`
      *,
      home_team:teams!matches_home_team_id_fkey(*),
      away_team:teams!matches_away_team_id_fkey(*)
    `)
    .order('match_date', { ascending: true })

  // Get user's predictions for this group
  const { data: predictions } = await supabase
    .from('predictions')
    .select('*')
    .eq('group_id', id)
    .eq('user_id', user.id)

  // Get all predictions for leaderboard
  const { data: allPredictions } = await supabase
    .from('predictions')
    .select('*')
    .eq('group_id', id)

  const membersList = members?.map(m => ({
    user_id: m.user_id,
    display_name: m.profiles?.display_name || 'Unknown',
  })) || []

  const predictionsMap = new Map(predictions?.map(p => [p.match_id, p]) || [])

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <GroupInfo group={group} memberCount={membersList.length} />

      <Tabs defaultValue="matches" className="w-full">
        <TabsList className="w-full bg-[#e5e5e5] p-1 rounded-lg">
          <TabsTrigger 
            value="matches" 
            className="flex-1 py-3 text-sm font-bold data-[state=active]:bg-white data-[state=active]:text-[#001538] data-[state=active]:shadow-sm rounded-md text-[#666]"
          >
            Matches
          </TabsTrigger>
          <TabsTrigger 
            value="leaderboard"
            className="flex-1 py-3 text-sm font-bold data-[state=active]:bg-white data-[state=active]:text-[#001538] data-[state=active]:shadow-sm rounded-md text-[#666]"
          >
            Leaderboard
          </TabsTrigger>
        </TabsList>

        <TabsContent value="matches" className="mt-6">
          <MatchList
            matches={matches || []}
            predictions={predictionsMap}
            groupId={id}
            userId={user.id}
          />
        </TabsContent>

        <TabsContent value="leaderboard" className="mt-6">
          <Leaderboard
            members={membersList}
            predictions={allPredictions || []}
            matches={matches || []}
            currentUserId={user.id}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
