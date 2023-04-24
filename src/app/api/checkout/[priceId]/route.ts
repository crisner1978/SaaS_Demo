
import { NextResponse } from 'next/server'
import { SITE_URL } from 'src/core/utils'
import { stripe } from 'src/pricing/utils/stripe'

export async function GET(request: Request, { params }: { params: { priceId: string } }) {
  const { priceId } = params

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${SITE_URL}/success`,
    cancel_url: `${SITE_URL}/pricing`,
  })

  return NextResponse.json({ id: session.id })
}
