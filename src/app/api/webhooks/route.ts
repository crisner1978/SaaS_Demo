import { IncomingMessage } from 'http'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import getRawBody from 'raw-body'
import { stripe } from 'src/pricing/utils/stripe'
import { Readable } from 'stream'
import { Stripe } from 'stripe'
import { supabase } from 'supabase'

type EventType = Record<string, any>

interface Request extends IncomingMessage {
  readonly body: string
}

export async function POST(request: NextRequest & { body: Request }) {
  const headerList = headers()
  const body: IncomingMessage = request.body
  const signature = headerList.get('stripe-signature')
  const signingSecret = process.env.STRIPE_SIGNING_SECRET!

  // create a new Readable stream from the request body
  const stream = Readable.from(request.body)

  let event: EventType = {}

  try {
    const rawBody = await getRawBody(stream, { limit: '2mb' })
    event = stripe.webhooks.constructEvent(rawBody, signature!, signingSecret)
  } catch (error) {
    console.log('Webhook signature verification failed.', error.message)
    return NextResponse.json({ success: false })
  }

  try {
    switch (event.type) {
      case 'customer.subscription.updated':
        await updateSubscription(event)
        break
      case 'customer.subscription.deleted':
        await deleteSubscription(event)
        break
      default:
        console.log('Unhandled event type', event.type)
        break
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.log('Error handling webhook', error.message)
    return NextResponse.json({ success: false })
  }
}

async function updateSubscription(event: EventType) {
  const subscription = event.data.object as Stripe.Subscription
  const stripe_customer_id = subscription.customer as string
  const subscription_status = subscription.status as string
  const price = subscription.items.data[0].price.id as string
  const { data: profile } = await supabase
    .from('profile')
    .select('*')
    .eq('stripe_customer_id', stripe_customer_id)
    .single()

  if (profile) {
    const updatedProfile = {
      subscription_status,
      price,
    }
    await supabase
      .from('profile')
      .update(updatedProfile)
      .eq('stripe_customer_id', stripe_customer_id)
  } else {
    const customer = (await stripe.customers.retrieve(stripe_customer_id)) as Stripe.Customer
    const name = customer.name as string
    const email = customer.email as string
    const newProfile = {
      name,
      email,
      stripe_customer_id,
      subscription_status,
      price,
    }
    await supabase.auth.admin.createUser({
      email,
      email_confirm: true,
      user_metadata: newProfile,
    })
  }
}

async function deleteSubscription(event: EventType) {
  const subscription = event.data.object as Stripe.Subscription
  const stripe_customer_id = subscription.customer as string
  const subscription_status = subscription.status as string

  const deletedSubscription = {
    subscription_status,
    price: null,
  }

  await supabase
    .from('profile')
    .update(deletedSubscription)
    .eq('stripe_customer_id', stripe_customer_id)
}
