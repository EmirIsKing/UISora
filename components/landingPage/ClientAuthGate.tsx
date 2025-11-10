"use client"
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useEffect } from 'react'
import Lenis from "lenis"

export default function ClientAuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  // Redirect logged-in users
  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard/projects')
    }
  }, [loading, user, router])

  // Initialize Lenis
  useEffect(() => {
    const lenis = new Lenis();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).lenis = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).lenis
      lenis.destroy()
    }
  }, [])

  if (loading) return null
  if (user) return null

  return <>{children}</>
}
