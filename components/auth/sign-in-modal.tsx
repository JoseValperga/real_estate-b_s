'use client'

import React from 'react'
import { 
  Dialog, 
  DialogContent, 
  DialogTitle 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Github, Mail } from 'lucide-react'

interface SignInModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SignInModal({ isOpen, onClose }: SignInModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-800/90 backdrop-blur-lg text-white border-gray-700">
        <DialogTitle className="text-2xl font-bold text-center">
          Sign In
        </DialogTitle>
        
        <div className="grid gap-6">
          <div className="space-y-2 text-center">
            <p className="text-gray-400">Choose your preferred sign in method</p>
          </div>
          
          <div className="space-y-4">
            <Button variant="outline" className="w-full bg-white/5 border-gray-700 hover:bg-white/10 text-white space-x-2">
              <Github className="h-5 w-5" />
              <span>Continue with Github</span>
            </Button>
            <Button variant="outline" className="w-full bg-white/5 border-gray-700 hover:bg-white/10 text-white space-x-2">
              <Mail className="h-5 w-5" />
              <span>Continue with Email</span>
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-800/90 px-2 text-gray-400">Or</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                placeholder="john@example.com"
                type="email"
                className="bg-white/5 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <Input
                id="password"
                type="password"
                className="bg-white/5 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-blue-500"
              />
            </div>
            <Button className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white">
              Sign In
            </Button>
          </div>

          <div className="text-center text-sm">
            <a href="#" className="text-[#3B82F6] hover:text-[#2563EB]">Forgot password?</a>
          </div>

          <div className="text-center text-sm text-gray-400">
            Don&apos;t have an account?{' '}
            <a href="#" className="text-[#3B82F6] hover:text-[#2563EB]">Sign up</a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 