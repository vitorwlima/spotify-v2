import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'

import { spotifyLoginURL, refreshSpotifyAccessToken } from 'src/lib/spotify'
import { FinalToken } from 'src/types'

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_SPOTIFY_ID!,
      clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_SECRET!,
      authorization: spotifyLoginURL,
    }),
  ],
  secret: process.env.JWT_SECRET!,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    jwt: async ({ token, account, user }) => {
      const finalToken: FinalToken = {
        ...token,
        accessToken: account?.access_token,
        refreshToken: account?.refresh_token,
        username: account?.providerAccountId,
        accessTokenExpiresAt: account?.expires_at
          ? account.expires_at * 1000
          : undefined,
      }

      if (
        (account && user) ||
        (finalToken.accessTokenExpiresAt &&
          Date.now() < finalToken.accessTokenExpiresAt)
      ) {
        return finalToken
      }

      return await refreshSpotifyAccessToken(token)
    },
  },
})
