import { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'

import { spotifyApi } from 'src/lib/spotify'

const useSpotify = () => {
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      if (session.error === 'RefreshAccessTokenError') {
        signIn()
      }

      spotifyApi.setAccessToken(session.user.token?.accessToken || '')
    }
  }, [session])

  return spotifyApi
}

export { useSpotify }
