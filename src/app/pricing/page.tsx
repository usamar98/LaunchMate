import PricingCard from '@/components/PricingCard'
import Link from 'next/link'
import { Rocket } from 'lucide-react'

export default function PricingPage() {
  const plans = [
    {
      title: 'Starter',
      price: 'Free',
      description: 'Perfect for trying out LaunchMate AI',
      features: [
        '3 AI generations per month',
        'Basic email templates',
        'Social media hooks',
        'Community support'
      ],
      planType: 'starter' as const
    },
    {
      title: 'Pro',
      price: '$29',
      description: 'Best for active creators and solopreneurs',
      features: [
        'Unlimited AI generations',
        'Advanced email sequences',
        'Custom sales page copy',
        'Launch planner access',
        'Priority support',
        'Export to popular tools'
      ],
      planType: 'pro' as const,
      popular: true
    },
    {
      title: 'Agency',
      price: '$99',
      description: 'For agencies and teams',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'White-label options',
        'Custom integrations',
        'Dedicated account manager',
        'Custom training'
      ],
      planType: 'agency' as const
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <Rocket className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">LaunchMate AI</span>
            </Link>
            <div className="flex space-x-4">
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
              <Link href="/signup" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600">
            Start free and scale as you grow
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </div>
  )
}