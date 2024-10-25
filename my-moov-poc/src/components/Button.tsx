import { Moov } from '@moovio/moov-js';
import { processPayment } from '../utils/processPayment.ts'

import { useState, useEffect } from 'react'
import './Button.css'

interface FancyBuyButtonProps {
  value1: number
  value2: number
  cost: number,
  moov: Moov
}

export default function Component({ value1 = 0, value2 = 0, cost = 0, moov }: FancyBuyButtonProps) {
  const [isClicked, setIsClicked] = useState(false)
  const average = (value1 + value2) / 2
  const totalCost = cost

  const handleClick = async () => {
    setIsClicked(true)

    try {
      await processPayment({
        user1Percentage: value1,
        user2Percentage: value2,
        totalAmount: cost,
        moov
      });
    } catch (error) {
      console.error('Payment failed:', error);
      // Handle error (e.g., show error message to user)
    }
  };  

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
          Buy Now - ${totalCost.toFixed(2)} (${(totalCost * 0.03).toFixed(2)} shared)
        </span>
        <span 
          className={`button-overlay ${isClicked ? 'clicked' : ''}`}
        />
      </button>
    </div>
  )
}
