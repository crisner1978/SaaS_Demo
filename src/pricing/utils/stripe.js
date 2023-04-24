import 'server-only'
import { cache } from 'react'
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})

export const getPricingPlans = cache(async () => {
  const { data: prices } = await stripe.prices.list()
  const plans = []

  for (const price of prices) {
    const product = await stripe.products.retrieve(price.product)

    plans.push({
      name: product.name,
      id: price.id,
      price: price.unit_amount / 100,
      interval: price.recurring.interval,
    })
  }
  return plans
})
