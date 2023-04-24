'use client'

import { useState } from 'react'
import { useSupabase } from '../../../supabase/supabase-provider'


export default function LoginForm({ setSubmitted }) {
  const { supabase } = useSupabase()
  const [error, setError] = useState('')
  const [isLoading, setLoading] = useState(false)

  async function onSubmit(event) {
    setLoading(true)
    event.preventDefault()
    const email = event.target.email.value

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: window.location.origin,
      },
    })
    if (error) {
      setError(error.message)
      setLoading(false)
      console.log('Error sending OTP: ', error)
    } else {
      setError('')
      setLoading(false)
      setSubmitted(email)
    }
  }

  return (
    <form onSubmit={onSubmit} className='content-grid home-hero'>
      {error && (
        <div className='danger' role='alert'>
          {error}
        </div>
      )}
      <h1>Welcome back</h1>
      <div className='email-input'>
        <label htmlFor='email'>Email</label>
        <input id='email' type='email' name='email' autoComplete='email' />
      </div>
      <button disabled={isLoading} type='submit' className='large-button'>
        <div className='large-button-text'>{isLoading ? 'Logging in...' : 'Log in'}</div>
      </button>
    </form>
  )
}
