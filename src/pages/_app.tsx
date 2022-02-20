import Head from 'next/head'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'

import '../styles/globals.css'

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Head>
          <title>Spotify V2</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp
