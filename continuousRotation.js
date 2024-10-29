"use client"

import React, { useEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const stocks = [
  { symbol: 'BAJAJFINANCE', price: 6800, change: 0.25 },
  { symbol: 'RELIANCE', price: 2800, change: -1.35 },
  { symbol: 'INFY', price: 1800, change: 2.20 },
  { symbol: 'M&M', price: 3213.5, change: 3.20 },
  { symbol: 'TCS', price: 1234.5, change: -2.35 },
  { symbol: 'ITECH M', price: 1832, change: -2.35 },
  { symbol: 'ITC', price: 195.3, change: 0.25 },
  { symbol: 'WIPRO', price: 635.5, change: -2.30 },
  { symbol: 'PERSISTE', price: 5000, change: 1.50 },
]

export default function StockTicker() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (scrollElement) {
      const scrollWidth = scrollElement.scrollWidth
      let scrollPosition = 0

      const scroll = () => {
        scrollPosition += 1
        if (scrollPosition >= scrollWidth / 2) {
          scrollPosition = 0
        }
        scrollElement.scrollLeft = scrollPosition
      }

      const intervalId = setInterval(scroll, 30)

      return () => clearInterval(intervalId)
    }
  }, [])

  return (
    <div className="overflow-hidden text-white bg-gray-900">
      <div className="flex items-center">
        <ArrowLeft className="w-5 h-5 ml-2 text-gray-400" />
        <div ref={scrollRef} className="flex py-1 overflow-hidden whitespace-nowrap">
          {[...stocks, ...stocks].map((stock, index) => (
            <div key={index} className="inline-flex items-center mx-4">
              <span className="font-semibold">{stock.symbol}</span>
              <span className="ml-2">{stock.price.toFixed(2)}</span>
              <span className={`ml-2 ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
        <ArrowRight className="w-5 h-5 mr-2 text-gray-400" />
      </div>
    </div>
  )
}