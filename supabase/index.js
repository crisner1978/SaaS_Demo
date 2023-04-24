

import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'
import { cache } from 'react'
import { cookies, headers } from 'next/headers'

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
export const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
export const subpaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)



export const getProducts = cache(async () => {
  let { data: products, error } = await supabase.from('product').select('*')
  if (error) throw error
  return products
})

export const getProduct = cache(async({ slug }) => {
  let { data: product, error } = await supabase
    .from('product')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) throw error
  return product
})

export const createServerClient = () => createServerComponentSupabaseClient({cookies, headers})