import React from 'react'
import { Button } from '../ui/button'
import { ArrowDownRight } from 'lucide-react'

const WatchDemo = () => {
  return (
    <Button variant="outline" className='hover:opacity-65 cursor-pointer hover:scale-[0.98]'>
        Watch Demo
        <ArrowDownRight className="size-4" />
    </Button>
  )
}

export default WatchDemo