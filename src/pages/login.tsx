import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { ClientSafeProvider, getProviders, LiteralUnion } from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'

import LoginTemplate from 'src/templates/Login'

export type LoginPageProps = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null
}

const LoginPage = (props: LoginPageProps) => {
  return (
    <>
      <Head>
        <title>Spotify V2 - Login</title>
      </Head>
      <LoginTemplate {...props} />
    </>
  )
}

export default LoginPage

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}
