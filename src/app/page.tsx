import Link from 'next/link'
import { Rocket, Mail, Share2, FileText, Calendar } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Rocket className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">LaunchMate AI</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
                Pricing
              </Link>
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
              <Link href="/signup" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Launch Your Digital Products
            <span className="text-blue-500"> with AI</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Generate launch email sequences, social media hooks, sales copy, and launch plans 
            in minutes. Perfect for solopreneurs and creators.
          </p>
          <Link 
            href="/signup" 
            className="bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Get Started Free
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Mail className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Launch Email Sequences</h3>
            <p className="text-gray-600">AI-generated email campaigns to build hype and drive sales for your product launch.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Share2 className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Social Media Hooks</h3>
            <p className="text-gray-600">Engaging social media content that captures attention and drives traffic to your launch.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <FileText className="h-12 w-12 text-purple-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Sales Page Copy</h3>
            <p className="text-gray-600">Persuasive sales copy that converts visitors into customers with proven frameworks.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Calendar className="h-12 w-12 text-orange-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Launch Planner</h3>
            <p className="text-gray-600">Notion-style weekly plans to organize and execute your product launch strategy.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
