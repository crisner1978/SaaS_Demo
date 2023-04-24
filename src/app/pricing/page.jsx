import React from 'react'
import { getPricingPlans } from '../../pricing/utils/stripe'
import Plans from '../../pricing/components/Plans'
import Benefits from '../../pricing/components/Benefits'

export default async function PricingPage() {
  const plans = await getPricingPlans()

  
  return (
    <div className="grid-halves h-screen-navbar">
      <Plans plans={plans} />
      <Benefits />
    </div>
  )
}
