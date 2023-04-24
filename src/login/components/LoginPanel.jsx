'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import Logo from '../../core/components/Logo'
import LoginForm from './LoginForm'
import LoginSubmitted from './LoginSubmitted'

export default function LoginPanel() {
  const [submitted, setSubmitted] = useState('')
  return (
    <div className='tablet-centered'>
      <Link href='/' className='logo-container'>
        <Logo style={{ width: 150 }} />
      </Link>
      {submitted ? (
        <LoginSubmitted submitted={submitted} />
      ) : (
        <LoginForm setSubmitted={setSubmitted} />
      )}
    </div>
  )
}
