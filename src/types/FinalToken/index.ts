import { JWT } from 'next-auth/jwt'

type FinalToken = JWT & {
  accessToken?: string
  refreshToken?: string
  username?: string
  accessTokenExpiresAt?: number
}

export type { FinalToken }
