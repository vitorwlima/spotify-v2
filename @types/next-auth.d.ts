import NextAuth, { DefaultSession } from 'next-auth'

import { FinalToken } from 'src/types'

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      token?: FinalToken
    }
  }
}
