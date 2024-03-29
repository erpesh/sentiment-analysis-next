import '../styles/globals.css'
import {useState} from 'react'
import type {AppProps} from 'next/app'
import {createBrowserSupabaseClient} from '@supabase/auth-helpers-nextjs'
import {Session, SessionContextProvider} from '@supabase/auth-helpers-react'
import NavBar from "../components/NavBar";

function MyApp({Component, pageProps}: AppProps<{ initialSession: Session }>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <NavBar/>
      <Component {...pageProps} />
    </SessionContextProvider>
  )
}

export default MyApp