'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, ChevronRight, Coins, Home, LineChart } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { HeroCarousel } from '@/components/hero-carousel'
import { properties } from '@/lib/properties-data'

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-gray-100">
      {/* Hero Section */}
      <div className="relative bg-[#0B1120] h-[80vh]">
        <HeroCarousel />
        <div className="relative z-20 h-full">
          <div className="max-w-7xl mx-auto h-full flex items-center px-4 sm:px-6 lg:px-8">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="block">Invest in Real Estate</span>
                <span className="block text-[#3B82F6]">with Blockchain</span>
              </h1>
              <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                BlockEstate revolutionizes property investment through fractional ownership. 
                Invest in premium real estate with cryptocurrency, starting from just $100.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Button size="lg" className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white">
                    Start Investing
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button variant="outline" size="lg" className="w-full bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      <div className="bg-gray-800/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-white">Featured Properties</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {properties.map((property) => (
              <Card key={property.id} className="overflow-hidden bg-gray-700/50 border-gray-600">
                <Image
                  src={property.image}
                  alt={property.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-white">{property.title}</h3>
                  <p className="text-sm text-gray-300 mt-1">{property.location}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-[#3B82F6] font-bold">${property.price.toLocaleString()}</span>
                    <span className="text-[#10B981]">Expected ROI: {property.roi}%</span>
                  </div>
                  <Link href={`/property/${property.id}`}>
                    <Button className="w-full mt-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works section */}
      <div className="bg-[#0B1120] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-white text-center">How It Works</h2>
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Home, title: "Choose a Property", description: "Browse our curated selection of premium real estate opportunities." },
                { icon: Coins, title: "Invest with Crypto", description: "Use cryptocurrency to purchase fractional ownership in properties." },
                { icon: LineChart, title: "Track Performance", description: "Monitor your investments and returns in real-time through our dashboard." },
                { icon: Building2, title: "Grow Your Portfolio", description: "Diversify your investments across multiple properties and locations." },
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#3B82F6] text-white mx-auto">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-white">{step.title}</h3>
                  <p className="mt-2 text-base text-gray-400">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800/50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="#" className="text-base text-gray-300 hover:text-white">About</Link></li>
                <li><Link href="#" className="text-base text-gray-300 hover:text-white">Careers</Link></li>
                <li><Link href="#" className="text-base text-gray-300 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Resources</h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="#" className="text-base text-gray-300 hover:text-white">Blog</Link></li>
                <li><Link href="#" className="text-base text-gray-300 hover:text-white">Whitepaper</Link></li>
                <li><Link href="#" className="text-base text-gray-300 hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="#" className="text-base text-gray-300 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="#" className="text-base text-gray-300 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Connect</h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="#" className="text-base text-gray-300 hover:text-white">Twitter</Link></li>
                <li><Link href="#" className="text-base text-gray-300 hover:text-white">LinkedIn</Link></li>
                <li><Link href="#" className="text-base text-gray-300 hover:text-white">Telegram</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8">
            <p className="text-base text-gray-400 xl:text-center">
              &copy; 2024 BlockEstate. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}