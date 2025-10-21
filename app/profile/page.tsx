"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { AuroraBackground } from "@/components/ui/shadcn-io/aurora-background"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { SimpleThemeToggle } from "@/components/ThemeToggle"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft } from "lucide-react"

const Page = () => {
  const router = useRouter()
  const { user, loading: userLoading } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (userLoading) return
    const fetchSettings = async () => {
      setLoading(true)
      setLoading(false)
    }
    fetchSettings()
  }, [user, userLoading])

  return (
    <AuroraBackground className="min-h-screen flex justify-center items-center px-4 py-10">
      <div className="relative bg-black/10 dark:bg-white/10 rounded-xl p-6 sm:p-10 flex flex-col lg:flex-row justify-center items-center gap-8 w-full max-w-5xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => router.push("/dashboard/projects")}
          className="absolute top-4 left-4 max-md:top-0 flex items-center gap-2 text-md font-medium text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Left Section */}
        <div className="bg-white dark:bg-[#1E1E1E] w-full sm:w-[320px] rounded-xl flex flex-col items-center gap-7 shadow p-5">
          <div className="w-full rounded-xl h-52 sm:h-60 bg-green-500"></div>
          <div className="flex flex-col gap-5 w-full">
            <input
              placeholder="Full Name"
              className="border border-white/0 border-b-black rounded-none dark:border-b-white bg-transparent outline-none py-2"
            />
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-5 flex flex-col items-center text-center">
              <span className="text-gray-500 text-sm">Your Credits</span>
              <span className="text-4xl font-bold text-blue-400 mt-1">300</span>
              <Button
                variant="outline"
                className="mt-3 border-blue-400 text-blue-400 hover:bg-blue-400/10 cursor-pointer hover:scale-[0.98] active:scale-[0.97]"
              >
                Buy More
              </Button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-5 w-full sm:w-[320px]">
          {/* Account Card */}
          <div className="h-auto bg-white dark:bg-[#1E1E1E] flex flex-col rounded-xl items-center shadow">
            <div className="w-full border border-white/0 border-b-black dark:border-b-white py-3 px-5">
              <span className="font-semibold">Account</span>
            </div>
            <div className="flex flex-col py-4 w-full px-5 gap-5">
              <input
                placeholder="Email"
                className="border border-white/0 border-b-black rounded-none dark:border-b-white bg-transparent outline-none py-2"
              />
              <input
                placeholder="Phone Number"
                className="border border-white/0 border-b-black rounded-none dark:border-b-white bg-transparent outline-none py-2"
              />
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                <span>Password</span>
                <Button className="rounded-full bg-gradient-to-br from-pink-400 to-blue-400 cursor-pointer hover:scale-[0.98] active:scale-[0.97] text-sm">
                  Change Password
                </Button>
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#1E1E1E]">
                  <SelectGroup>
                    <SelectItem value="ui/ux" className="cursor-pointer">
                      UI/UX
                    </SelectItem>
                    <SelectItem value="developer" className="cursor-pointer">
                      Developer
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Preferences Card */}
          <div className="h-auto bg-white dark:bg-[#1E1E1E] flex flex-col rounded-xl items-center shadow">
            <div className="w-full border border-white/0 border-b-black dark:border-b-white py-3 px-5">
              <span className="font-semibold">Preferences</span>
            </div>
            <div className="flex flex-col py-4 w-full px-5 gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <Label htmlFor="theme" className="font-medium">
                    Theme
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Switch to theme appearance
                  </p>
                </div>
                <SimpleThemeToggle />
              </div>
              <Separator className="dark:bg-white/30" />
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <Label htmlFor="newsletter" className="font-medium">
                    Newsletter
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Opt out/in our newsletter
                  </p>
                </div>
                <Switch
                  id="newsletter"
                  onCheckedChange={() => {}}
                  className="border border-black dark:border-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuroraBackground>
  )
}

export default Page
