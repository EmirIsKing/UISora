'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { createUser } from '@/actions/createUser';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { EyeClosed, Eye } from 'lucide-react';
import { IoArrowBackSharp } from "react-icons/io5";
import { FirebaseError } from 'firebase/app';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [viewPassword, setViewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();
  const { signUp, clearError, googleSignIn } = useAuth();

  const validateForm = () => {
    if (!email || !password || !confirmPassword || !name) return "All fields are required";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (password !== confirmPassword) return "Passwords do not match";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setSignUpError(validationError);
      return;
    }

    setIsLoading(true);
    setSignUpError("");
    clearError();

    try {
      await signUp(email, password, name);
      const response = await createUser(email, password, name);

      if (response.success) {
        setSuccessMessage("Account created! Redirecting...");
        await fetch("/api/newsletterSubscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        setTimeout(() => router.push("/dashboard/projects"), 1500);
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        setSignUpError(error.code.replace("auth/", "").replace(/-/g, " "));
      } else {
        setSignUpError("Something went wrong");
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await googleSignIn();
      router.push('/dashboard/projects');
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        setSignUpError(error.code.replace("auth/", "").replace(/-/g, " "));
      } else {
        setSignUpError("Something went wrong");
      }
      console.error('Google sign up error:', error);
    }
  };

  return (
    <div className="
      min-h-screen flex text-white bg-gradient-to-b from-[#0D0D12] to-[#1A1A1A]
      p-16 gap-10
      max-md:flex-col max-md:p-6 max-md:gap-8
    ">

      {/* LEFT SIDE TEXT */}
      <div className="
        flex flex-col justify-center gap-6 max-w-[420px]
        max-md:max-w-full max-md:text-center max-md:items-center
      ">
        <Link href="/" className="flex gap-2 items-center max-md:mx-auto">
          <IoArrowBackSharp /> Home
        </Link>

        <h1 className="text-4xl font-semibold max-md:text-3xl leading-tight">
          Create your account and start
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-bold">
            {" "}designing with AI
          </span>
        </h1>

        <p className="text-[#6B7280] max-md:max-w-[260px]">
          It takes less than a minute to get started.
        </p>
      </div>

      {/* RIGHT SIDE CARD */}
      <div className="
        flex flex-col justify-center items-center w-full
        bg-white/5 border border-white/10 rounded-3xl py-10 px-6
        max-md:rounded-2xl max-md:py-8
      ">
        <span className="text-2xl mb-6 font-bold">Create an Account</span>

        <form className="flex flex-col gap-5 w-full max-w-[380px]" onSubmit={handleSubmit}>

          {(signUpError || successMessage) && (
            <p className={`text-center text-sm ${signUpError ? "text-red-400" : "text-green-400"}`}>
              {signUpError || successMessage}
            </p>
          )}

          {/* Name */}
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <InputGroup>
              <InputGroupInput
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
              />
            </InputGroup>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <InputGroup>
              <InputGroupInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </InputGroup>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <InputGroup>
              <InputGroupInput
                type={viewPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton onClick={() => setViewPassword(!viewPassword)}>
                  {viewPassword ? <Eye /> : <EyeClosed />}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium">Confirm Password</label>
            <InputGroup>
              <InputGroupInput
                type={viewPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
              />
            </InputGroup>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-[#635BFF] to-[#3B3799] rounded-full py-2 w-full font-semibold"
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>

          <Separator />

          <Button
            type="button"
            onClick={handleGoogleSignUp}
            className="bg-white text-black rounded-full py-2 w-full font-semibold"
          >
            Sign Up with Google
          </Button>

          <Link href="/sign-in" className="text-center text-blue-400 underline">
            Already have an account? Sign in →
          </Link>

        </form>
      </div>
    </div>
  );
}
