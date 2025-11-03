"use client"
import React,{useEffect, useState} from "react"
import { PricingCreative } from '@/components/PricingCreative'
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/utils/firebase";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import type { User } from "firebase/auth";

const Pricing = () => {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

useEffect(() => {
  console.log(user)
}, [user])
  

  return (
   <ProtectedRoute>
    <PricingCreative userId={user?.uid} email={user?.email ?? undefined}/>
   </ProtectedRoute>
  )
}

export default Pricing
