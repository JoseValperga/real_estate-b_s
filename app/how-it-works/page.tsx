'use client'

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Building2, Coins, FileCheck, Shield, Split, Users } from 'lucide-react'

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-white">How BlockEstate Works</h1>
          <p className="text-xl text-gray-400">Revolutionizing real estate investment through blockchain-enabled fractional ownership</p>
        </div>

        {/* Legal Structure Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-white">Legal Structure</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-[#3B82F6] mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">LLC Ownership Structure</h3>
                <p className="text-gray-400">
                  Each property is owned by a dedicated LLC, which is then subdivided into membership interests. 
                  This creates a legally compliant structure that protects investor rights while enabling fractional ownership.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <FileCheck className="h-12 w-12 text-[#3B82F6] mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">Regulatory Compliance</h3>
                <p className="text-gray-400">
                  Our structure complies with SEC regulations as a direct property interest rather than a security, 
                  allowing for simplified investment without extensive securities regulations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-white">Investment Process</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Building2,
                title: "Property Selection",
                description: "Our team identifies and acquires premium real estate properties with strong potential for appreciation and rental income."
              },
              {
                icon: Split,
                title: "Tokenization",
                description: "The LLC membership interests are tokenized on the blockchain, creating verifiable digital ownership records."
              },
              {
                icon: Users,
                title: "Fractional Ownership",
                description: "Investors can purchase any percentage of the property through our platform, starting from as little as $100."
              }
            ].map((step, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6">
                  <step.icon className="h-12 w-12 text-[#3B82F6] mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div>
          <h2 className="text-2xl font-bold mb-8 text-white">Benefits</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-white">For Investors</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center">
                    <Coins className="h-5 w-5 text-[#3B82F6] mr-2" />
                    Low minimum investment threshold
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-5 w-5 text-[#3B82F6] mr-2" />
                    Direct property ownership rights
                  </li>
                  <li className="flex items-center">
                    <Building2 className="h-5 w-5 text-[#3B82F6] mr-2" />
                    Access to premium real estate
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-white">Platform Features</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center">
                    <Shield className="h-5 w-5 text-[#3B82F6] mr-2" />
                    Secure blockchain records
                  </li>
                  <li className="flex items-center">
                    <Users className="h-5 w-5 text-[#3B82F6] mr-2" />
                    Automated distribution of rental income
                  </li>
                  <li className="flex items-center">
                    <Building2 className="h-5 w-5 text-[#3B82F6] mr-2" />
                    Professional property management
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 