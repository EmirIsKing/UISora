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
import { getUser } from "@/actions/getUser"
import { DocumentData } from "firebase/firestore"
import { setUserDetail } from "@/actions/setUserDetail"
import BasicModal from "@/components/smoothui/ui/BasicModal"
import ResetPassword from "@/components/auth/ResetPassword"
import UploadProfilePicture from "@/components/profile/UploadProfilePicture";
import Image from "next/image"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import { Spinner } from "@/components/ui/spinner"
import BuyCreditModal from "@/components/profile/BuyCreditModal"

const Page = () => {
  const router = useRouter()
  const { user, loading: userLoading } = useAuth()
  const [loading, setLoading] = useState(false)
  const [details, setDetails] = useState<DocumentData | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [preferences, setPreferences] = useState({ newsletter: true })
  const [credits, setCredits] = useState("0")
  const [department, setDepartment] = useState("")
  const [userId, setUserId] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [photoUrl, setPhotoUrl] = useState("");
  const [customerId, setCustomerId] = useState("")
  const [subStatus, setSubStatus] = useState("")
  const [manageSubLoader, setManageSubLoader] = useState(false);
  

  // ✅ Fetch user details once when authenticated
  useEffect(() => {
    if (userLoading) return
    if (!user) return

    const fetchDetails = async () => {
      setLoading(true)
      try {
        const details = await getUser()
        if (details) setDetails(details)
      } catch (error) {
        console.error("Failed to fetch user details:", error)
      } finally {
      }
    }

    fetchDetails()
  }, [user, userLoading])

  useEffect(() => {
    if (!details) return
    setLoading(true)

    setEmail(details.email || "")
    setName(details.name || "")
    setPhoneNumber(details.phoneNumber || "")
    setPreferences({
      newsletter: details.preferences?.newsletter ?? true,
    })
    setCredits(details.credits?.toString() || "0")
    setDepartment(details.department || "")
    setUserId(details.uid)
    setPhotoUrl(details.photoURL || "")
    setCustomerId(details.subscription?.customerId ?? "")
    setSubStatus(details.subscription?.status ?? "")
    setLoading(false)

  }, [details])

  const onChangeDepartment = (value:string) =>{
    setDepartment(value)
    setUserDetail(userId,{department: value})
  }
  const onChangePreferences = (value:boolean) =>{
    setPreferences({newsletter: value})
    setUserDetail(userId,{preferences: {newsletter: preferences.newsletter}})
  }

  const handleManageSub = async () => {
  try {
    setManageSubLoader(true)
    const response = await fetch("/api/lemonSqueezy/customerPortal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId })
    });

    const { url } = await response.json();
    console.log(url)
    window.open(url, "_blank");
  } catch (error) {
    console.error("Failed to get portal link:", error);
  } finally{
    setManageSubLoader(false)
  }
};



  return (
      <ProtectedRoute redirectTo="/sign-in">
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
        <div  className="bg-white dark:bg-[#1E1E1E] w-full sm:w-[320px] rounded-xl flex flex-col items-center gap-7 shadow p-5">
          <div className="relative group w-full rounded-xl h-52 sm:h-60 bg-green-500/40 flex justify-center items-center font-medium text-5xl text-white">
            {!loading && photoUrl ? (
              <Image
                src={photoUrl}
                alt="Profile Image"
                width={150}
                height={150}
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-700 text-white text-2xl font-bold transition-all duration-300">
                {(name ? name.charAt(0) : email.charAt(0)).toUpperCase()}
              </div>
            )}


            <div className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black/50">
              <UploadProfilePicture setUrl={setPhotoUrl}/>
            </div>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={()=>setUserDetail(userId,{name: name})}
              placeholder="Full Name"
              className="border border-white/0 border-b-black rounded-none dark:border-b-white bg-transparent outline-none py-2"
            />
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-5 flex flex-col items-center text-center">
              <span className="text-gray-500 text-sm">Your Credits</span>
              <span className="text-4xl font-bold text-blue-400 mt-1">{credits}</span>
              <div className="flex gap-2">
                {
                  subStatus === "Active" ? 
                  (<Button
                    variant="outline"
                    className="mt-3 border-blue-400 text-blue-400 hover:bg-blue-400/10 cursor-pointer hover:scale-[0.98] active:scale-[0.97]"
                    onClick={()=>handleManageSub()}
                  >
                    {manageSubLoader ? <Spinner/> : "Manage subscription"}
                  </Button>
                  ):
                  (
                    <Button
                      variant="outline"
                      className="mt-3 border-blue-400 text-blue-400 hover:bg-blue-400/10 cursor-pointer hover:scale-[0.98] active:scale-[0.97]"
                    >
                     Choose Plan
                    </Button>
                  )

                }
                <BuyCreditModal userId={userId} email={email}/>
              </div>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={()=>setUserDetail(userId,{email: email})}
                placeholder="Email"
                className="border border-white/0 border-b-black rounded-none dark:border-b-white bg-transparent outline-none py-2"
              />
              <input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onBlur={()=>setUserDetail(userId,{phoneNumber: phoneNumber})}
                placeholder="Phone Number"
                className="border border-white/0 border-b-black rounded-none dark:border-b-white bg-transparent outline-none py-2"
              />
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                <span>Password</span>
                <Button onClick={() => setIsOpen(true)} className="rounded-full bg-gradient-to-br from-pink-400 to-blue-400 cursor-pointer hover:scale-[0.98] active:scale-[0.97] text-sm">
                  Change Password
                </Button>
                <BasicModal
                  isOpen={isOpen}
                  onClose={() => setIsOpen(false)}
                  title="Reset Password"
                  size="md"
                >
                  <ResetPassword hideSignIn={true}/>

                </BasicModal>
              </div>
              <Select value={department} onValueChange={onChangeDepartment}>
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
                  checked={preferences.newsletter}
                  id="newsletter"
                  onCheckedChange={(checked) =>
                    onChangePreferences(checked)
                  }
                  className="border border-black dark:border-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuroraBackground>
      </ProtectedRoute>
  )
}

export default Page
