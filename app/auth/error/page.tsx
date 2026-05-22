import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AuthErrorPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight text-destructive">
            Authentication Error
          </CardTitle>
          <CardDescription className="text-base">
            Something went wrong during authentication
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The link may have expired or already been used. Please try signing up again or contact support if the problem persists.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button asChild className="w-full">
            <Link href="/auth/sign-up">Try Again</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/auth/login">Back to Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}
