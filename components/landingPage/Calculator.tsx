"use client"
import React, { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Coins } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"

const Calculator = () => {
  const [value, setValue] = useState<number>(5)
  const [credit, setCredit] = useState<number>(value * 3000)

  const handleValueChange = (val: number[]) => {
    const newValue = val[0]
    setValue(newValue)
    setCredit(newValue * 3000)
  }

  const handleCreditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCredit = parseFloat(e.target.value) || 0
    setCredit(newCredit)
    setValue(newCredit / 3000)
  }

  const handleValueInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value) || 0
    setValue(newValue)
    setCredit(newValue * 3000)
  }

  return (
    <section className="relative" id="pricing">
      <div className="wavy-background"></div>

      <div className="relative z-10 py-10">
        <div className="flex flex-col gap-6 justify-center items-center">
          <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl text-center text-foreground">
            Simple pricing for everyone
          </h2>

          <div className="w-[270px] border border-border rounded-lg p-8 bg-card shadow-lg flex flex-col gap-4">
            <h3 className="text-xl font-bold text-center text-card-foreground">Credit Calculator</h3>

            <div className="grid w-full max-w-sm gap-3">
              {/* USD Input */}
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText className="text-[#8b5cf6]">$</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                type="number"
                  value={value}
                  onChange={handleValueInputChange}
                  placeholder="5.00"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>USD</InputGroupText>
                </InputGroupAddon>
              </InputGroup>

              {/* Credit Input */}
              <InputGroup>
                <InputGroupAddon>
                  <Coins className="w-4 h-4 text-[#8b5cf6]" />
                </InputGroupAddon>
                <InputGroupInput
                  value={credit}
                  onChange={handleCreditChange}
                  placeholder="5000"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>Credit</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>

            {/* Slider */}
            <Slider
              value={[value]}
              onValueChange={handleValueChange}
              max={250}
              step={1}
              className="
                [&_[data-orientation=horizontal]>div:first-child]:bg-gray-200
                [&_[data-orientation=horizontal]>div:last-child]:bg-[#8b5cf6]
                [&_[role=slider]]:border-[#8b5cf6]
              "
            />
            
          </div>
        </div>
      </div>
    </section>
  )
}

export default Calculator
