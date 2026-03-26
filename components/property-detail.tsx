"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { FractionalOwnershipSlider } from "@/components/fractional-ownership-slider";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { properties } from "@/lib/properties-data";
import type { Property } from "@/lib/properties-data";
import RealEstateSharesClient from "./real-estate-shares-client";

interface PropertyDetailProps {
  id: string;
}

export function PropertyDetail({ id }: PropertyDetailProps) {
  const router = useRouter();
  const propertyId = parseInt(id);
  const property = properties.find((p: Property) => p.id === propertyId);

  if (!property) {
    return (
      <div className="min-h-screen bg-[#0B1120] text-gray-100 p-8">
        <h1 className="text-2xl font-bold text-white">Property not found</h1>
      </div>
    );
  }

  const isBlockchainProperty =
    property.title === "Luxury Apartment in Downtown";
    
  return (
    <div className="min-h-screen bg-[#0B1120] text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-[#3B82F6] hover:text-[#2563EB] mb-6"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Properties
        </button>

        <Card className="overflow-hidden bg-gray-700/50 border-gray-600">
          <div className="relative h-96">
            <Image
              src={property.image}
              alt={property.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <CardContent className="p-6">
            <h1 className="text-3xl font-bold text-white mb-2">
              {property.title}
            </h1>
            <p className="text-xl text-gray-300 mb-4">{property.location}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-300">Price</h3>
                <p className="text-2xl font-bold text-[#3B82F6]">
                  ${property.price.toLocaleString("en-US")}
                </p>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-300">
                  Expected ROI
                </h3>
                <p className="text-2xl font-bold text-[#10B981]">
                  {property.roi}%
                </p>
              </div>
            </div>

            <div className="mt-6">
              <FractionalOwnershipSlider
                tokenPrice={100}
                totalTokens={property.price / 100}
                cryptoSymbol="ETH"
                cryptoPrice={2000}
              />
            </div>

            {isBlockchainProperty ? (
              <div className="mt-8">
                <RealEstateSharesClient />
              </div>
            ) : (
              <button className="w-full mt-6 bg-[#3B82F6] text-white py-3 rounded-md font-medium hover:bg-[#2563EB] transition">
                Invest Now
              </button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
