'use client'

import React, { useState, useEffect } from 'react'
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"

interface FractionalOwnershipSliderProps {
  tokenPrice: number
  totalTokens: number
  cryptoSymbol: string
  cryptoPrice: number
}

export function FractionalOwnershipSlider({
  tokenPrice,
  totalTokens,
  cryptoSymbol,
  cryptoPrice
}: FractionalOwnershipSliderProps) {
  const [tokens, setTokens] = useState(1)
  const [usdValue, setUsdValue] = useState(tokenPrice)
  const [cryptoValue, setCryptoValue] = useState(tokenPrice / cryptoPrice)
  const [ownershipPercentage, setOwnershipPercentage] = useState((1 / totalTokens) * 100)

  useEffect(() => {
    setUsdValue(tokens * tokenPrice)
    setCryptoValue((tokens * tokenPrice) / cryptoPrice)
    setOwnershipPercentage((tokens / totalTokens) * 100)
  }, [tokens, tokenPrice, totalTokens, cryptoPrice])

  return (
    <Card className="w-full bg-gray-800 border-gray-700">
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold text-white mb-4">Fractional Ownership Calculator</h3>
        <Slider
          min={1}
          max={totalTokens}
          step={1}
          value={[tokens]}
          onValueChange={(value) => setTokens(value[0])}
          className="mb-6"
        />
        <div className="grid grid-cols-2 gap-4 text-white">
          <div>
            <p className="text-sm text-gray-400">Tokens</p>
            <p className="text-lg font-bold">{tokens}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">USD Value</p>
            <p className="text-lg font-bold">${usdValue.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">{cryptoSymbol} Equivalent</p>
            <p className="text-lg font-bold">{cryptoValue.toFixed(4)} {cryptoSymbol}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Ownership Percentage</p>
            <p className="text-lg font-bold">{ownershipPercentage.toFixed(2)}%</p>
          </div>
        </div>
        <div className="mt-6 bg-gray-700 h-4 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#3B82F6] to-[#10B981] h-full rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${ownershipPercentage}%` }}
          ></div>
        </div>
      </CardContent>
    </Card>
  )
} 