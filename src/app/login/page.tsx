import Image from 'next/image'
import LoginPanel from 'src/login/components/LoginPanel'
import login from '../../../public/assets/login.png'

export default function LoginPage() {
  return (
    <div className='grid-halves h-screen'>
      <div className='border-right bg-offwhite'>
        <div className='column-padding'>
          <LoginPanel />
        </div>
      </div>
      <div className='bg-navy border-right'>
        <Image src={login} alt='Login' className='callout-image' />
      </div>
    </div>
  )
}
