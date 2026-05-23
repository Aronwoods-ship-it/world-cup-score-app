'use client'

import { useState } from 'react'
import { DashboardHeader } from '@/components/dashboard-header'
import { GroupList } from '@/components/group-list'
import { CreateGroupForm } from '@/components/create-group-form'
import { JoinGroupForm } from '@/components/join-group-form'
import { MatchList } from '@/components/match-list'
import { Leaderboard } from '@/components/leaderboard'
import { Trophy, Plus, UserPlus, Users } from 'lucide-react'

interface Group {
  id: string
  name: string
  invite_code: string
  created_by: string
  created_at: string
}

interface DashboardClientProps {
  displayName: string
  userId: string
  groups: Group[]
}

export function DashboardClient({ displayName, userId, groups }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState('groups')

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <DashboardHeader 
        displayName={displayName} 
        userId={userId}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6 space-y-6 max-w-4xl">
          {activeTab === 'groups' && (
            <>
              {/* Your Groups Section */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="h-5 w-5 text-primary" />
                  <h1 className="text-xl font-bold uppercase tracking-wide">My Groups</h1>
                </div>
                <GroupList groups={groups} />
              </section>

              {/* Create/Join Section */}
              <div className="grid md:grid-cols-2 gap-4">
                <section className="bg-card rounded-lg overflow-hidden">
                  <div className="bg-primary/10 border-b border-border px-4 py-3 flex items-center gap-2">
                    <Plus className="h-4 w-4 text-primary" />
                    <h2 className="font-bold text-sm uppercase tracking-wide">Create New Group</h2>
                  </div>
                  <div className="p-4">
                    <CreateGroupForm userId={userId} />
                  </div>
                </section>

                <section className="bg-card rounded-lg overflow-hidden">
                  <div className="bg-primary/10 border-b border-border px-4 py-3 flex items-center gap-2">
                    <UserPlus className="h-4 w-4 text-primary" />
                    <h2 className="font-bold text-sm uppercase tracking-wide">Join a Group</h2>
                  </div>
                  <div className="p-4">
                    <JoinGroupForm userId={userId} />
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
            </>
          )}

          {activeTab === 'fixtures' && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="h-5 w-5 text-primary" />
                <h1 className="text-xl font-bold uppercase tracking-wide">All Fixtures</h1>
              </div>
              <MatchList 
                matches={[]} 
                predictions={{}}
                groupId=""
                userId={userId}
                isGlobalView={true}
              />
            </section>
          )}

          {activeTab === 'leaderboards' && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="h-5 w-5 text-primary" />
                <h1 className="text-xl font-bold uppercase tracking-wide">Leaderboards</h1>
              </div>
              {groups.length > 0 ? (
                <div className="space-y-6">
                  {groups.map((group) => (
                    <div key={group.id} className="bg-card rounded-lg overflow-hidden">
                      <div className="sky-header px-4 py-3">
                        <h2 className="text-white font-bold">{group.name}</h2>
                      </div>
                      <Leaderboard groupId={group.id} currentUserId={userId} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-card rounded-lg p-8 text-center">
                  <p className="text-muted-foreground">Join or create a group to see leaderboards</p>
                </div>
              )}
            </section>
          )}
        </div>
      </main>
      <footer className="py-4 px-4 text-center border-t border-[#e0e0e0] bg-white">
        <div className="flex items-center justify-center gap-2">
          <span className="text-[#999] text-xs">A</span>
          <span className="text-[#666] text-xs font-semibold tracking-wide">WOODS LABS INC.</span>
          <span className="text-[#999] text-xs">Product</span>
        </div>
      </footer>
    </div>
  )
}
