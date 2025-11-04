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


export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();
  const { signUp, error, clearError, googleSignIn } = useAuth();
  const [viewPassword, setViewPassword] = useState(false)

  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
      return 'All fields are required';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    if (password !== confirmPassword) {
      return 'Passwords do not match';
    }
    if (!email.includes('@')) {
      return 'Please enter a valid email address';
    }
    return null;
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await googleSignIn();

      if (result.user.email) {
        const response = await createUser(result.user.email);

        if (response.success) {
          setSuccessMessage('Account created successfully! Please check your email for verification.');
          await fetch("/api/newsletterSubscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });
          setTimeout(() => {
            router.push('/dashboard/projects');
          }, 2000);
        } else {
          throw new Error(response.message || 'Failed to create user account');
        }
      }

    } catch (error) {
      console.error('Sign up error:', error);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      return;
    }

    setIsLoading(true);
    clearError();
    setSuccessMessage('');

    try {
      // First create the user in Firebase Auth
      await signUp(email, password, name);
      
      // Then create the user document in Firestore
      const response = await createUser(email, password, name);
      
      if (response.success) {
        setSuccessMessage('Account created successfully! Please check your email for verification.');
        await fetch("/api/newsletterSubscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        setTimeout(() => {
          router.push('/dashboard/projects');
        }, 2000);
      } else {
        throw new Error(response.message || 'Failed to create user account');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      // Error is handled by the auth context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex pl-16 bg-gradient-to-b text-white from-[#0D0D12] to-[#1A1A1A] sm:pl-6 lg:pl-8 max-md:flex-col max-md:px-0 max-md:pt-10 overflow-hidden">
      <div className='px-4 justify-center flex flex-col gap-10 max-md:gap-5 text-left max-w-[400px] max-md:pb-6'>
      <Link href={"/"} className='flex gap-2 ml-4 items-center'>
        <IoArrowBackSharp/>
        Home
        </Link>
        <span className='text-4xl font-semibold max-md:text-2xl max-md:text-center'>
          Create your account and start
          <span 
          className='bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent
          font-bold'> designing with AI
          </span>

        </span>
        <span className='text-[#6B7280] max-md:text-center'>
        It takes less than a minute to get started.
        </span>
      </div>
      <div className="rounded-l-4xl max-md:w-full max-md:h-[70vh] max-md:rounded-4xl h-screen max-md:py-5 w-full bg-white/6 text-white flex flex-col justify-center items-center border border-white/10">
        <span className='text-2xl mb-6 font-bold'>Create an Account</span>
        <form className="flex flex-col gap-5 max-md:w-full max-md:px-10 justify-center items-center" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}
          
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
              {successMessage}
            </div>
          )}
          
          <div className="space-y-4 w-[300px] max-md:w-full">
            <div>
              <label htmlFor="name" className="block text-sm font-medium ">
                Full Name
              </label>
              <InputGroup>
                <InputGroupInput 
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your full name"
                    />                    
              </InputGroup>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email address
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
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your email"
                    />                    
                </InputGroup>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <InputGroup>
                  <InputGroupInput
                  id="password"
                  name="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Create a password (min 6 characters)"
                  type={viewPassword ? "": "password"} />
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
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium">
                Confirm Password
              </label>

              <InputGroup>
                  <InputGroupInput
                  id="confirmPassword"
                  name="confirmPassword"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm your password"
                  type={viewPassword ? "": "password"} />
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
          </div>

          <div className='flex justify-center items-center'>
            <button
              type="submit"
              disabled={isLoading || !email || !password || !confirmPassword}
              className="group bg-gradient-to-r from-[#635BFF] to-[#3B3799] rounded-full p-2 w-[150px] cursor-pointer active:opacity-70 hover:scale-[0.97] disabled:scale-[1.0] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center ustify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating account...
                </div>
              ) : (
                'Create account'
              )}
            </button>
          </div>
          <Separator className='bg-gradient-to-r from-black via-white to-black'/>
          <Button type='button' onClick={handleGoogleSignUp} className='border w-full cursor-pointer hover:scale-[0.98] active:scale-[0.99]'>Sign Up with Google</Button>
          <div className='flex justify-center items-center'>
            <Link href="/sign-in" className="font-medium text-blue-600 hover:text-blue-500 underline">
            Already have an account? Sign in →
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 