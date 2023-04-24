/* eslint-disable @next/next/no-html-link-for-pages */
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSupabase } from '../../../supabase/supabase-provider'
import { SITE_URL } from '../utils'
import Logo from './Logo'

const hideNavbarPage = ['/success']

export default function Navbar({ session }) {
  const { supabase } = useSupabase()
  const pathname = usePathname()
  const hideNavbar = hideNavbarPage.includes(pathname)

  if (hideNavbar) return null

  function signOut() {
    supabase.auth.signOut()
  }

  async function onManageBilling() {
    const response = await fetch(`${SITE_URL}/api/manage_billing`)
    const data = await response.json()
    if (data) window.location.href = data.url
  }

  // TODO: Add Pricing Link if Customer cancels or is not a current subscriber

  return (
    <div className='nav-container border-b-2 border-black'>
      <Link href='/'>
        <Logo />
      </Link>
      {session ? (
        <div className='nav-menu'>
          <Link href='/products' className='nav-link white'>
            Products
          </Link>
          <a onClick={onManageBilling} className='nav-link border-left white'>
            <div>Billing</div>
          </a>
          <div onClick={signOut} className='nav-link black'>
            <div>Sign out</div>
          </div>
        </div>
      ) : (
        <div className='nav-menu'>
          <Link href='/login' className='nav-link white'>
            Login
          </Link>
          <Link href='/pricing' className='nav-link black'>
            Pricing
          </Link>
        </div>
      )}
    </div>
  )
}
