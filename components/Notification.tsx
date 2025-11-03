"use client"

import React, { useState,useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useAuth } from '@/contexts/AuthContext';
import { Spinner } from './ui/spinner';
import { Bell } from 'lucide-react';
import { getUser } from '@/actions/getUser';
import type { DocumentData } from 'firebase/firestore';

interface notification {
  id:string;
  message:string;
  date: {seconds:number;nanoseconds:number}
}

const Notification = () => {
  const [isScrollAreaOpen, setScrollAreaOpen] = useState(false);
  const [notification, setNotification] = useState<notification[]>([]);
  const { user, loading: userLoading } = useAuth()
  const [details, setDetails] = useState<DocumentData | null>(null)
  

  useEffect(() => {
      if (userLoading) return
      if (!user) return
  
      const fetchDetails = async () => {
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
        setNotification(details.notifications)
      }, [details])
 


  const toggleScrollArea = () => {
    setScrollAreaOpen((prev) => !prev);
  };




  return (
    <>
      <div onClick={toggleScrollArea} className='active:opacity-65 cursor-pointer relative'>
          <div className='bg-black w-4 h-4 absolute top-[0] right-[0] rounded-full text-white text-xs flex justify-center items-center'>
            {notification == null ? (<Spinner/>) : notification.length}</div>
          <Bell/>
        </div>
      {isScrollAreaOpen && (
        <div onClick={() => setScrollAreaOpen(false)} className='fixed inset-0 z-[99998]'>
          <div className='fixed right-5 top-[90px] z-[99999]' onClick={(e) => e.stopPropagation()}>
            <ScrollArea onClick={(e) => e.stopPropagation()} className="w-auto min-w-64 bg-white h-96 rounded-md border p-4">
              {notification.length > 0 ? notification.map((item) => (
                <div key={item.id} className='cursor-pointer' onClick={(e) => e.stopPropagation()}>
                  <div className='flex gap-3 w-full justify-between'>
                    <span className='max-w-72 text-gray-700 text-opacity-75 leading-5'>{item.message}</span>
                    <span className='text-gray-500 opacity-70 text-sm'>{new Date(item.date.seconds * 1000 + item.date.nanoseconds / 1e6).toLocaleString()}</span>
                  </div>
                  <Separator className="my-2" />
                </div>
              )) : (
                <p>No notifications available.</p>
              )}
            </ScrollArea>
          </div>
          
        </div>
      )}
    </>
  );
};

export default Notification;