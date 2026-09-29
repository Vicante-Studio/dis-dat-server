import { createClient } from '@supabase/supabase-js'

const url = process.env.SUPABASE_URL
const secretKey = process.env.SUPABASE_SECRET_KEY
const publishableKey = process.env.SUPABASE_PUB_KEY

if (!url || !secretKey || !publishableKey) {
  throw new Error('Missing SUPABASE env Variables')
}

const options = {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
}

// Full access, bypasses RLS. Database work and admin actions only
export const supabaseAdmin = createClient(url, secretKey, options)

// For signUp / signIn only. Never use it for database queries.
export const supabaseAuth = createClient(url, publishableKey, options)