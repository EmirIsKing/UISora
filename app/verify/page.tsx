"use client";
import React, { useState, useEffect } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Mail, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import type { User } from "firebase/auth";

const Verify = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // ✅ Proper Firebase Auth Listener (Fix for refresh)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // 🔥 Auto-check verification
  useEffect(() => {
    const interval = setInterval(async () => {
      if (auth.currentUser) {
        await auth.currentUser.reload();
        if (auth.currentUser.emailVerified) {
          router.push("/dashboard/projects");
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [router]);

  useEffect(() => {

    const interval = setInterval(async () => {
     if (auth.currentUser){
       const tempUser = auth.currentUser;
       await sendEmailVerification(tempUser);
     }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const resendVerification = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return setMessage("No user signed in.");

    try {
      setLoading(true);
      await sendEmailVerification(currentUser);
      setMessage("Verification email sent! Check your inbox.");
    } catch (error) {
      console.log(error);
      setMessage("Could not resend email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex h-full justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="rounded-full bg-purple-blue/60 flex w-12 h-12 justify-center items-center">
            <Mail />
          </div>

          <span className="text-3xl font-bold">Verify your email address</span>

          <span className="text-md">
            We have sent a verification link to{" "}
            <span className="font-semibold">{user?.email || "Loading..."}</span>
          </span>

          <div className="text-center">
            <span className="text-md">
              Click on the link to complete your verification process.
            </span>
            <br />
            <span className="text-md">
              You might need to check your <span className="font-bold">spam</span> folder.
            </span>
          </div>

          {message && <p className="text-sm text-gray-600">{message}</p>}

          <div className="flex justify-center items-center gap-3">
            <Button
              onClick={resendVerification}
              className="bg-purple-blue cursor-pointer hover:bg-purple-blue/70"
            >
              {loading ? <Spinner /> : "Resend Email"}
            </Button>

            <Link href={"/sign-in"}>
              <Button className="cursor-pointer">
                Return to site <MoveRight />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Verify;
