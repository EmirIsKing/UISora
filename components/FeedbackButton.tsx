"use client"
import React, {useState} from 'react'
import { Button } from './ui/button';
import { MdFeedback } from "react-icons/md";
import { Button as Feedbackbutton }  from '@heroui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsContent, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import { useAuth } from "@/hooks/useAuth";

const FeedbackButton = () => {


    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [tab, setTab] = useState("feedback")
    const { user } = useAuth()
  
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
      setLoading(true)

      try {
        const formData = new FormData(e.currentTarget)
        const raw = Object.fromEntries(formData.entries()) as Record<string, any>

        const payload = {
          ...raw,
          uid: user?.uid ?? undefined,
          path: typeof window !== 'undefined' ? window.location.pathname : undefined,
        }

        const res = await fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })

        const result = await res.json().catch(() => ({}))

        if (!res.ok || result?.success !== true) {
          throw new Error(result?.message || 'Failed to submit feedback')
        }

        setOpen(false)
      } catch (err) {
        console.error(err)
        alert('There was a problem submitting your feedback. Please try again.')
      } finally {
        setLoading(false)
      }
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Feedbackbutton className='p-2 max-md:px-4 max-md:py-0 rounded-full border border-black cursor-pointer hover:opacity-70'>
            <span className='flex max-md:hidden'>Feedback</span>
            <span className='hidden max-md:flex'><MdFeedback/></span>
        </Feedbackbutton>
      </DialogTrigger>
      <DialogContent className="max-md:max-w-[85%] rounded-md">
        <DialogHeader>
          <DialogTitle>We’d love your feedback</DialogTitle>
        </DialogHeader>
        <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
              <TabsTrigger value="bug">Bug Report</TabsTrigger>
              <TabsTrigger value="suggestion">Suggestion</TabsTrigger>
            </TabsList>

            {/* Feedback Form */}
            <TabsContent value="feedback">
              <form onSubmit={handleSubmit} className="space-y-3">
                <input type="hidden" name="type" value="feedback" />
                <Textarea name="feedback" placeholder="Share your thoughts..." required />
                <Button type="submit" disabled={loading} className='bg-purple-blue'>
                  {loading ? "Submitting..." : "Submit Feedback"}
                </Button>
              </form>
            </TabsContent>

            {/* Bug Report Form */}
            <TabsContent value="bug">
              <form onSubmit={handleSubmit} className="space-y-3">
                <input type="hidden" name="type" value="bug" />
                <Input name="bugTitle" placeholder="Short bug title" required />
                <Textarea name="bugDetails" placeholder="Describe the issue..." required />
                <Input name="screenshot" type="url" placeholder="Screenshot link (optional)" />
                <Button type="submit" disabled={loading} className='bg-purple-blue'>
                  {loading ? "Submitting..." : "Report Bug"}
                </Button>
              </form>
            </TabsContent>

            {/* Suggestion Form */}
            <TabsContent value="suggestion">
              <form onSubmit={handleSubmit} className="space-y-3">
                <input type="hidden" name="type" value="suggestion" />
                <Textarea name="suggestion" placeholder="What feature or improvement do you suggest?" required />
                <Button type="submit" disabled={loading} className='bg-purple-blue'>
                  {loading ? "Submitting..." : "Submit Suggestion"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
      </DialogContent>
  </Dialog>
  )
}

export default FeedbackButton