import React from 'react'
import { Button } from '../ui/button'
import { ArrowDownRight } from 'lucide-react'
import Link from "next/link";

const WatchDemo = () => {
  return (
      <Link href="https://youtu.be/7mSMV8g_8mg" target="_blank">
          <Button variant="outline" className='hover:opacity-65 cursor-pointer hover:scale-[0.98]'>
              Watch Demo
              <ArrowDownRight className="size-4" />
          </Button>
      </Link>
  )
}

export default WatchDemo