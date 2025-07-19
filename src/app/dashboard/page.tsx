'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { createClient } from '@/lib/supabase-client'
import { useRouter } from 'next/navigation'
import { Mail, Share2, FileText, Calendar, LogOut, User } from 'lucide-react'
import GenerationResult from '@/components/GenerationResult'
import toast from 'react-hot-toast'

type Profile = {
  id: string
  email: string
  plan: string
  usage_count: number
}

type GenerationType = 'email' | 'hook' | 'sales'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [generatedContent, setGeneratedContent] = useState<{
    type: GenerationType
    content: string
    title: string
  } | null>(null)
  const [generating, setGenerating] = useState(false)
  const [productName, setProductName] = useState('')
  const [targetAudience, setTargetAudience] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const fetchProfile = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user!.id)
        .single()

      if (error) throw error
      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }, [user, supabase])

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
      return
    }

    if (user) {
      fetchProfile()
    }
  }, [user, loading, router, fetchProfile])

  const handleGenerate = async (type: GenerationType) => {
    if (!productName || !targetAudience) {
      toast.error('Please fill in product name and target audience')
      return
    }

    if (profile?.plan === 'starter' && profile.usage_count >= 3) {
      toast.error('Usage limit reached. Upgrade to Pro for unlimited generations.')
      return
    }

    setGenerating(true)

    try {
      const response = await fetch('/api/generate-copy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          productName,
          targetAudience,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Generation failed')
      }

      setGeneratedContent({
        type,
        content: data.content,
        title: data.title,
      })

      // Refresh profile to update usage count
      fetchProfile()
      toast.success('Content generated successfully!')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Generation failed')
    } finally {
      setGenerating(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || !profile) {
    return null
  }

  const usagePercentage = profile.plan === 'starter' ? (profile.usage_count / 3) * 100 : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4">
            <User className="h-12 w-12 text-gray-400" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{profile.email}</h2>
              <p className="text-gray-600 capitalize">{profile.plan} Plan</p>
              {profile.plan === 'starter' && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    Usage: {profile.usage_count} / 3 generations
                  </p>
                  <div className="w-48 bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${usagePercentage}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g., My SaaS App"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Audience
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g., Small business owners"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Generation Buttons */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <button
            onClick={() => handleGenerate('email')}
            disabled={generating}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 disabled:opacity-50"
          >
            <Mail className="h-8 w-8 text-blue-500 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Launch Email</h3>
            <p className="text-sm text-gray-600">Generate email sequence for your launch</p>
          </button>

          <button
            onClick={() => handleGenerate('hook')}
            disabled={generating}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 disabled:opacity-50"
          >
            <Share2 className="h-8 w-8 text-green-500 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Social Hook</h3>
            <p className="text-sm text-gray-600">Create engaging social media content</p>
          </button>

          <button
            onClick={() => handleGenerate('sales')}
            disabled={generating}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 disabled:opacity-50"
          >
            <FileText className="h-8 w-8 text-purple-500 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Sales Copy</h3>
            <p className="text-sm text-gray-600">Generate persuasive sales page copy</p>
          </button>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <Calendar className="h-8 w-8 text-orange-500 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Launch Planner</h3>
            <p className="text-sm text-gray-600">Coming soon - Weekly launch planning</p>
          </div>
        </div>

        {/* Generated Content */}
        {generatedContent && (
          <GenerationResult
            title={generatedContent.title}
            content={generatedContent.content}
            type={generatedContent.type}
          />
        )}

        {generating && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Generating your content...</p>
          </div>
        )}
      </div>
    </div>
  )
}