import SpotifyWebApi from 'spotify-web-api-node'

import { FinalToken } from 'src/types'

const scopes = [
  'ugc-image-upload',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-private',
  'user-read-email',
  'user-follow-read',
  'user-library-read',
  'streaming',
  'app-remote-control',
  'user-read-playback-position',
  'user-top-read',
  'user-read-recently-played',
  'playlist-modify-private',
  'playlist-read-collaborative',
  'playlist-read-private',
  'playlist-modify-public',
]

const params = {
  scope: scopes.join(','),
}

const queryParams = new URLSearchParams(params).toString()

const spotifyLoginURL = `https://accounts.spotify.com/authorize?${queryParams}`

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_ID,
  clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_SECRET,
})

const refreshSpotifyAccessToken = async (
  token: FinalToken
): Promise<FinalToken> => {
  try {
    if (token.accessToken && token.refreshToken) {
      spotifyApi.setAccessToken(token.accessToken)
      spotifyApi.setRefreshToken(token.refreshToken)
    }

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken()

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpiresAt: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token || token.refreshToken,
    }
  } catch (error) {
    console.log('ERROR AT FN: refreshAccessToken', error)
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export { spotifyLoginURL, spotifyApi, refreshSpotifyAccessToken }
