import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardHeader } from '@/components/dashboard-header'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <DashboardHeader 
        displayName={profile?.display_name || 'Player'} 
        userId={user.id}
      />
      <main className="flex-1">
        {children}
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
