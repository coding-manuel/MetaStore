import { createClient } from '@supabase/supabase-js'
import envHelper from './envHelper'

const supabaseUrl = envHelper(VITE_SUPABASE_URL)
const supabaseAnonKey = envHelper(VITE_SUPABASE_ANON_KEY)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

