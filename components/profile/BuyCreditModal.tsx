"use client"
import React, {useState} from 'react'
import BasicModal from '../smoothui/ui/BasicModal'
import { Button } from '../ui/button'
import { Coins } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import BasicToast from '../smoothui/ui/BasicToast'
import { AnimatePresence } from 'framer-motion'
import { Spinner } from '../ui/spinner'
import { ToastType } from '../smoothui/ui/BasicToast'


const BuyCreditModal = ({userId, email}:{userId:string; email:string;}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState<number>(5)
    const [credit, setCredit] = useState<number>(value * 3000)
    const [showToast, setShowToast] = useState(false)
    const [toastType, setToastType] = useState<ToastType>("success")
    const [loading, setLoading] = useState(false)
    

    const handleShowToast = (type:ToastType) => {
        setToastType(type)
        setShowToast(true)
    }
    
      const handleCreditChange = (e: { target: { value: string } }) => {
        const newCredit = parseFloat(e.target.value) || 0
        setCredit(newCredit)
        setValue(newCredit / 3000)
      }
    
      const handleValueInputChange = (e: { target: { value: string } }) => {
        const newValue = parseFloat(e.target.value) || 0
        setValue(newValue)
        setCredit(newValue * 3000)
      }


    const buyCredit = async () => {
        if (!userId) return;
        if (value < 5) {
            handleShowToast("warning")
            return;
        }
    
        console.log(email)
        console.log(userId)
    
      
        try {
          setLoading(true)
          const response = await fetch("/api/lemonSqueezy/buyCredits", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              productId: process.env.NEXT_PUBLIC_BUY_CREDIT_ID,
              userId,
              email,
              amount: value,
            }),
          });
      
          const data = await response.json();
      
          window.open(data.checkoutUrl, "_blank");
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false)
          setIsOpen(false)
        }
      };
    

  return (
    <div className="">
        <Button
                variant="outline"
                className="mt-3 border-blue-400 text-blue-400 hover:bg-blue-400/10 cursor-pointer hover:scale-[0.98] active:scale-[0.97]"
                onClick={() => setIsOpen(true)}
              >
                Buy Credit
        </Button>

      <BasicModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add to credit balance"
        size="md"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="relative z-10 py-10">
        <div className="flex flex-col gap-6 justify-center items-center">
            <div className="grid w-full max-w-sm gap-3">
              {/* USD Input */}
              <InputGroup className='h-12'>
                <InputGroupAddon>
                  <InputGroupText className="text-[#8b5cf6]">$</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                type="number"
                  value={value}
                  onChange={handleValueInputChange}
                  placeholder="Min 5.00"
                  min={5}
                  
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>USD</InputGroupText>
                </InputGroupAddon>
              </InputGroup>

              {/* Credit Input */}
              <InputGroup className='h-12'>
                <InputGroupAddon>
                  <Coins className="w-4 h-4 text-[#8b5cf6]" />
                </InputGroupAddon>
                <InputGroupInput
                type='number'
                  min={15000}
                  value={credit}
                  onChange={handleCreditChange}
                  className='!text-xl'
                  placeholder="Min 15000"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>Credit</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>
        </div>
      </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-secondary rounded-lg border cursor-pointer hover:scale-[0.98] px-4 py-2 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() =>buyCredit()}
              className="bg-purple-blue hover:bg-purple-blue/80 cursor-pointer hover:scale-[0.98] rounded-lg px-4 py-2 text-white transition-colors"
            >
              {loading? <Spinner/> : "Buy"}
            </button>
          </div>
        </div>
      </BasicModal>
      <AnimatePresence>
        {showToast && (
          <BasicToast
            message={`Amount cannot be less than $5`}
            type={toastType}
            duration={3000}
            onClose={() => setShowToast(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default BuyCreditModal
