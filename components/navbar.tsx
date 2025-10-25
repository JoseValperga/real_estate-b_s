'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { SignInModal } from './auth/sign-in-modal'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-white/5 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-white text-xl font-bold">
              BlockEstate
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/properties" 
              className={`text-gray-200 hover:text-white font-medium transition-colors ${isActive('/properties') ? 'text-white' : ''}`}
            >
              Properties
            </Link>
            <Link 
              href="/how-it-works" 
              className={`text-gray-200 hover:text-white font-medium transition-colors ${isActive('/how-it-works') ? 'text-white' : ''}`}
            >
              How it Works
            </Link>
            <Link 
              href="/about" 
              className={`text-gray-200 hover:text-white font-medium transition-colors ${isActive('/about') ? 'text-white' : ''}`}
            >
              About
            </Link>
            <Button 
              variant="outline" 
              className="bg-white/10 border-white/20 hover:bg-white/20 text-white font-medium"
              onClick={() => setIsSignInOpen(true)}
            >
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-200 hover:text-white p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800/95 backdrop-blur-lg">
          <div className="px-4 pt-2 pb-3 space-y-3">
            <Link 
              href="/properties" 
              className={`block text-gray-200 hover:text-white font-medium transition-colors py-2 ${isActive('/properties') ? 'text-white' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Properties
            </Link>
            <Link 
              href="/how-it-works" 
              className={`block text-gray-200 hover:text-white font-medium transition-colors py-2 ${isActive('/how-it-works') ? 'text-white' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How it Works
            </Link>
            <Link 
              href="/about" 
              className={`block text-gray-200 hover:text-white font-medium transition-colors py-2 ${isActive('/about') ? 'text-white' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Button 
              variant="outline" 
              className="w-full bg-white/10 border-white/20 hover:bg-white/20 text-white font-medium mt-2"
              onClick={() => {
                setIsSignInOpen(true)
                setIsMobileMenuOpen(false)
              }}
            >
              Sign In
            </Button>
          </div>
        </div>
      )}

      <SignInModal 
        isOpen={isSignInOpen} 
        onClose={() => setIsSignInOpen(false)} 
      />
    </nav>
  )
} 