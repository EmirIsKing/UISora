'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { EyeClosed, Eye } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { IoArrowBackSharp } from "react-icons/io5";
import { FirebaseError } from 'firebase/app';
import {createUser} from "@/actions/createUser";

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [viewPassword, setViewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signIn, clearError, googleSignIn } = useAuth();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) return;

    setIsLoading(true);
    clearError();

    try {
      await signIn(email, password);
      router.push('/dashboard/projects');
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        const errorMessage = error.code.replace("auth/", "").replace(/-/g, " ");
        setError(errorMessage);
      } else {
        setError("Something went wrong");
      }
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      if (result) {
        if (!result.user.email) return;
        const response = await createUser(result.user.email, password, result.user.displayName);
        if (response.success) {
          await fetch("/api/newsletterSubscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: result.user.email }),
          });
          setTimeout(() => router.push("/dashboard/projects"), 1500);
        }
      }
      router.push('/dashboard/projects');
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        const errorMessage = error.code.replace("auth/", "").replace(/-/g, " ");
        setError(errorMessage);
      } else {
        setError("Something went wrong");
      }
      console.error('Sign in error:', error);
    }
  };

  return (
    <div className="
      min-h-screen flex text-white bg-gradient-to-b from-[#0D0D12] to-[#1A1A1A]
      p-16 gap-10
      max-md:flex-col max-md:p-6 max-md:gap-8
    ">

      {/* LEFT SECTION */}
      <div className="
        flex flex-col justify-center gap-6 max-w-[420px]
        max-md:max-w-full max-md:text-center max-md:items-center
      ">
        <Link href="/" className="flex gap-2 items-center max-md:mx-auto">
          <IoArrowBackSharp /> Home
        </Link>

        <h1 className="text-4xl font-semibold max-md:text-3xl">
          Welcome Back to 
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-bold"> UISora</span> 👋
        </h1>

        <p className="text-[#6B7280] max-md:max-w-[260px]">
          Sign in to continue generating and customizing your app UIs.
        </p>
      </div>

      {/* RIGHT SECTION (FORM CARD) */}
      <div className="
        flex flex-col justify-center items-center w-full
        bg-white/5 border border-white/10 rounded-3xl py-10 px-6
        max-md:rounded-2xl max-md:py-8
      ">
        <span className="text-2xl mb-6 font-bold">Sign In</span>

        <form className="flex flex-col gap-5 w-full max-w-[380px]" onSubmit={handleSubmit}>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <InputGroup>
              <InputGroupInput
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </InputGroup>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <InputGroup>
              <InputGroupInput
                id="password"
                name="password"
                autoComplete="current-password"
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={viewPassword ? "text" : "password"}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  size="icon-xs"
                  onClick={() => setViewPassword(!viewPassword)}
                  type="button"
                >
                  {viewPassword ? <Eye /> : <EyeClosed />}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading || !email || !password}
            className="bg-gradient-to-r from-[#635BFF] to-[#3B3799] rounded-full py-2 w-full font-semibold disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>

          {/* Error Message */}
          {error && <p className="text-center text-red-500 text-sm">{error}</p>}

          {/* Forgot Password */}
          <Link href="/forgot-password" className="text-center text-blue-400 underline">
            Forgot Password?
          </Link>

          <Separator className="my-2" />

          {/* Google Button */}
          <Button type="button" onClick={handleGoogleSignIn} className="bg-white text-black rounded-full py-2 w-full font-semibold">
            Sign In with Google
          </Button>

          {/* Link to Create Account */}
          <Link href="/sign-up" className="text-center text-blue-400 underline">
            Don’t have an account? Sign up →
          </Link>

        </form>
      </div>
    </div>
  );
}
