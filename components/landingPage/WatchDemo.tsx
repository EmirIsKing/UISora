import React from 'react'
import { Button } from '../ui/button'
import { ArrowDownRight } from 'lucide-react'

const WatchDemo = () => {
  return (
    <Button className='bg-white text-black border border-black hover:opacity-65 hover:bg-white cursor-pointer hover:scale-[0.98]'>
        Watch Demo
        <ArrowDownRight className="size-4" />
    </Button>
  )
}

export default WatchDemo