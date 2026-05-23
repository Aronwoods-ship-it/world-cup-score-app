'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User, LogOut, HelpCircle, ChevronDown } from 'lucide-react'

interface DashboardHeaderProps {
  displayName: string
  userId: string
  activeTab: string
  onTabChange: (tab: string) => void
}

export function DashboardHeader({ displayName, activeTab, onTabChange }: DashboardHeaderProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    setLoading(true)
    if (supabase) {
      await supabase.auth.signOut()
    }
    router.push('/')
    router.refresh()
  }

  const tabs = [
    { id: 'groups', label: 'My Groups' },
    { id: 'fixtures', label: 'Fixtures' },
    { id: 'leaderboards', label: 'Leaderboards' },
  ]

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar - Navy gradient like Sky Sports */}
      <div className="sky-header">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-12 flex items-center justify-between">
            {/* Logo area */}
            <Link href="/dashboard" className="flex items-center gap-1.5">
              <span className="text-white font-light text-lg tracking-tight">da boyz</span>
              <span className="bg-[#cc0000] text-white font-bold text-sm px-1.5 py-0.5 rounded-sm">scores</span>
            </Link>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              <Link 
                href="/how-to-play"
                className="hidden sm:flex items-center gap-1 text-white/80 hover:text-white text-sm transition-colors"
              >
                <HelpCircle className="h-4 w-4" />
                How to Play
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1.5 text-white/90 hover:text-white text-sm transition-colors">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{displayName}</span>
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem disabled className="text-muted-foreground text-sm">
                    <User className="h-4 w-4 mr-2" />
                    {displayName}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/how-to-play" className="flex items-center text-sm">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      How to Play
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleSignOut} 
                    disabled={loading} 
                    className="text-[#cc0000] text-sm"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {loading ? 'Signing out...' : 'Sign Out'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation bar - White background like Sky Sports */}
      <nav className="bg-white border-b border-[#e0e0e0]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-0 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-[#001538] border-[#cc0000]'
                    : 'text-[#666] border-transparent hover:text-[#cc0000] hover:border-[#cc0000]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
