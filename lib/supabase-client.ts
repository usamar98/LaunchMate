import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from './supabase'

export const createClient = () => createClientComponentClient<Database>()