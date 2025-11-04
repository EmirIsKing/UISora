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

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [viewPassword, setViewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signIn, clearError, googleSignIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      return;
    }

    setIsLoading(true);
    clearError();

    try {
      await signIn(email, password);
      router.push('/dashboard/projects');
    } catch (error) {
      // Error is handled by the auth context
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
      try {
        await googleSignIn();  
        router.push('/dashboard/projects');
  
      } catch (error) {
        console.error('Sign in error:', error);
      }
    }

  return (
    <div className="min-h-screen max-md:h-screen flex pl-16 bg-gradient-to-b text-white from-[#0D0D12] to-[#1A1A1A] sm:pl-6 lg:pl-8 max-md:flex-col max-md:px-0 max-md:pt-10 max-md:pb-0">
      <div className='px-4 justify-center flex flex-col gap-10 max-md:gap-5 text-left max-w-[400px] max-md:pb-6'>
        <Link href={"/"} className='flex gap-2 ml-4 items-center'>
        <IoArrowBackSharp/>
        Home
        </Link>
        <span className='text-4xl font-semibold max-md:text-2xl max-md:text-center'>Welcome Back to  
          <span 
          className='bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-bold'> UISora
          </span>
           👋
        </span>
        <span className='text-[#6B7280] max-md:text-center'>
          Sign in to continue generating and 
          customizing your app UIs.
        </span>
      </div>
      <div className='rounded-l-4xl max-md:h-[60vh] max-md:rounded-4xl h-screen max-md:py-5 w-full bg-white/6 text-white flex flex-col justify-center items-center border border-white/10'>
        <span className='text-2xl mb-6 font-bold'>Sign In</span>
        <form className='flex flex-col gap-5 max-md:w-full max-md:px-10' onSubmit={handleSubmit}>
          <div className='flex flex-col'>
            <div>
                  <label htmlFor="email" className="block text-sm font-medium">
                     Email
                  </label>
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
          </div>
          <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <InputGroup>
                  <InputGroupInput
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    required
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={viewPassword ? "": "password"} 
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      aria-label="view"
                      title="password"
                      size="icon-xs"
                      onClick={() => {
                        setViewPassword(!viewPassword)
                      }}
                    >
                      {viewPassword ? <Eye /> : <EyeClosed />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
          </div>
          <div className='flex justify-center items-center'>
            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="group bg-gradient-to-r from-[#635BFF] to-[#3B3799] rounded-full p-2 w-[150px] cursor-pointer active:opacity-70 hover:scale-[0.97] disabled:scale-[1.0] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
          <div className='flex justify-center items-center'>
            <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500 underline">
              Forgot Password?
            </Link>
          </div>
          <Separator className='bg-gradient-to-r from-black via-white to-black'/>
          <Button type='button' onClick={handleGoogleSignIn} className='border cursor-pointer hover:scale-[0.98] active:scale-[0.99]'>Sign In with Google</Button>
          <div className='flex justify-center items-center'>
            <Link href="/sign-up" className="font-medium text-blue-600 hover:text-blue-500 underline">
              Don’t have an account? Sign up →
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 