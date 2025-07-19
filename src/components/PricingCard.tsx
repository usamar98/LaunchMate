'use client'

import { Check } from 'lucide-react'
import { useAuth } from './AuthProvider'
import { useRouter } from 'next/navigation'

type PricingCardProps = {
  title: string
  price: string
  description: string
  features: string[]
  planType: 'starter' | 'pro' | 'agency'
  popular?: boolean
}

export default function PricingCard({
  title,
  price,
  description,
  features,
  planType,
  popular = false
}: PricingCardProps) {
  const { user } = useAuth()
  const router = useRouter()

  const handleClick = () => {
    if (!user) {
      router.push(`/signup?plan=${planType}`)
    } else {
      if (planType === 'starter') {
        router.push('/dashboard')
      } else if (planType === 'pro') {
        router.push(`/checkout?plan=${planType}`)
      } else {
        router.push('/contact-sales')
      }
    }
  }

  return (
    <div className={`relative rounded-lg border p-6 shadow-sm ${
      popular ? 'border-blue-500 shadow-blue-100' : 'border-gray-200'
    }`}>
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="mt-4">
          <span className="text-4xl font-bold text-gray-900">{price}</span>
          {price !== 'Free' && <span className="text-gray-500">/month</span>}
        </div>
        <p className="mt-2 text-gray-500">{description}</p>
      </div>

      <ul className="mt-6 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className="h-4 w-4 text-green-500 mr-3" />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleClick}
        className={`mt-8 w-full py-2 px-4 rounded-md font-medium transition-colors ${
          popular
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
        }`}
      >
        Get Started
      </button>
    </div>
  )
}