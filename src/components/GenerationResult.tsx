'use client'

import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

type GenerationResultProps = {
  title: string
  content: string
  type: 'email' | 'hook' | 'sales'  // Remove unused 'type' parameter
}

export default function GenerationResult({ title, content }: GenerationResultProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 text-gray-500" />
          )}
          <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      
      <div className="bg-gray-50 rounded-md p-4">
        <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
          {content}
        </pre>
      </div>
    </div>
  )
}