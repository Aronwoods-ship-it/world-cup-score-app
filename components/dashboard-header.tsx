'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Menu, User, LogOut, HelpCircle } from 'lucide-react'

interface DashboardHeaderProps {
  displayName: string
  userId: string
}

export function DashboardHeader({ displayName }: DashboardHeaderProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    setLoading(true)
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 bg-sky-navy border-b border-border">
      <div className="container mx-auto px-4">
        {/* Top bar with logo and user menu */}
        <div className="h-14 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="bg-primary px-2 py-1 rounded">
              <span className="font-black text-sm text-primary-foreground tracking-tight">SCORES</span>
            </div>
            <span className="font-bold text-foreground hidden sm:inline">Da Boyz and Ting</span>
          </Link>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="hidden sm:flex">
              <Link href="/how-to-play">
                <HelpCircle className="h-4 w-4 mr-1" />
                How to Play
              </Link>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{displayName}</span>
                  <Menu className="h-4 w-4 sm:hidden" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem disabled className="text-muted-foreground">
                  <User className="h-4 w-4 mr-2" />
                  {displayName}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/how-to-play" className="flex items-center">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    How to Play
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} disabled={loading} className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  {loading ? 'Signing out...' : 'Sign Out'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Navigation bar */}
        <nav className="flex items-center gap-1 -mb-px overflow-x-auto pb-px">
          <Link 
            href="/dashboard" 
            className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors whitespace-nowrap"
          >
            My Groups
          </Link>
          <Link 
            href="/dashboard" 
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors whitespace-nowrap"
          >
            Leaderboard
          </Link>
          <Link 
            href="/dashboard" 
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors whitespace-nowrap"
          >
            Fixtures
          </Link>
        </nav>
      </div>
    </header>
  )
}
