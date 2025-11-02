"use client"
import React, { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from "@/utils/firebase"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {Loader} from "@/components/ui/shadcn-io/ai/loader"

const ResetPassword = ({hideSignIn}:{hideSignIn:boolean}) => {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setError("")

    try {
      setLoading(true)
      await sendPasswordResetEmail(auth, email)
      setLoading(false)
      setMessage("✅ Password reset email sent! Check your inbox.")
      setEmail("")
    } catch (err) {
      setLoading(false)
      setError(err.message)
    }
  }

  return (
    <Card className="mx-auto max-w-sm bg-white dark:bg-[#1E1E1E] dark:text-white">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
        <CardDescription>Enter your email below to reset your password</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full cursor-pointer border hover:scale-[0.98] active:[scale-[0.99]">
            {loading ? <Loader size={16} /> : "Reset Password"}
          </Button>

          {message && <p className="text-green-600 text-sm">{message}</p>}
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </form>

        <div hidden={hideSignIn} className="mt-4 text-center text-sm">
          Remember your password?{" "}
          <Link href="/sign-in" className="underline" prefetch={false}>
            Return to Login
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default ResetPassword
