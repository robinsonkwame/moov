'use client'

import { useState, useEffect } from 'react'
import './Button.css'

interface FancyBuyButtonProps {
  value1: number
  value2: number
  cost: number
}

export default function Component({ value1 = 0, value2 = 0, cost = 0 }: FancyBuyButtonProps) {
  const [isClicked, setIsClicked] = useState(false)
  const average = (value1 + value2) / 2
  const totalCost = cost + (cost * (value1 + value2) / 100)

  const handleClick = () => {
    setIsClicked(true)
  }

  useEffect(() => {
    if (isClicked) {
      const timer = setTimeout(() => setIsClicked(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isClicked])

  return (
    <div className="fancy-button-container">
      <button
        onClick={handleClick}
        className={`fancy-button ${isClicked ? 'clicked' : ''}`}
      >
        <span className="button-content">
          Buy Now - ${totalCost.toFixed(2)}
        </span>
        <span 
          className={`button-overlay ${isClicked ? 'clicked' : ''}`}
        />
      </button>
    </div>
  )
}
