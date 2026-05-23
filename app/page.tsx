import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { HomeContent } from '@/components/home-content'

export default async function HomePage() {
  const supabase = await createClient()
  
  if (supabase) {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      redirect('/dashboard')
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <HomeContent />
    </main>
  )
}
