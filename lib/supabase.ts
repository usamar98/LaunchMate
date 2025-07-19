import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export const createClient = () => createClientComponentClient()

export const createServerClient = () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { cookies } = require('next/headers')
  return createServerComponentClient({ cookies })
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          plan: string
          usage_count: number
          created_at: string
        }
        Insert: {
          id: string
          email: string
          plan?: string
          usage_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          plan?: string
          usage_count?: number
          created_at?: string
        }
      }
      sales_leads: {
        Row: {
          id: string
          name: string
          email: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          message?: string
          created_at?: string
        }
      }
    }
  }
}