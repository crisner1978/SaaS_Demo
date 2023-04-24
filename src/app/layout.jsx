import SupabaseProvider from '../../supabase/supabase-provider'
import Navbar from '../core/components/Navbar'
import '../styles/globals.css'
import { createServerClient, supaClient } from '../../supabase'

export const metadata = {
  title: 'Epic SaaS',
  description: 'All the most epic things on the internet, all in one place.',
}

export default async function RootLayout({ children }) {
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()
  console.log('session', session)
  return (
    <html lang='en'>
      <body>
        <SupabaseProvider>
          <Navbar session={session} />
          {children}
        </SupabaseProvider>
      </body>
    </html>
  )
}
