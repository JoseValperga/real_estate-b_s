import { Suspense } from 'react'
import { PropertyDetail } from '@/components/property-detail'
import { Metadata } from 'next'

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export const metadata: Metadata = {
  title: 'Property Detail',
}

const PropertyDetailPage = async ({ params }: Props) => {
  const resolvedParams = await params
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PropertyDetail id={resolvedParams.id} />
    </Suspense>
  )
}

export default PropertyDetailPage