import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { SITE_URL } from 'src/core/utils'
import { stripe } from 'src/pricing/utils/stripe'

export const revalidate = 0

export async function GET(request: NextRequest) {
  const supabase = createServerComponentSupabaseClient({ headers, cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { data: profile } = await supabase
    .from('profile')
    .select('stripe_customer_id')
    .eq('user_id', user.id)
    .single()

  if (!profile) {
    return new Response('Unauthorized', { status: 401 })
  } else {
    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: SITE_URL,
    })

    return NextResponse.json({ url: session.url })
  }
}
