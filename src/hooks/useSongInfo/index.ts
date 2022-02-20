import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { useSpotify } from '..'
import { currentTrackIdState, isPlayingState } from 'src/atoms'

const useSongInfo = () => {
  const spotifyApi = useSpotify()
  const { data: session } = useSession()
  const [songInfo, setSongInfo] = useState<SpotifyApi.TrackObjectFull | null>(
    null
  )
  const [currentIdTrack, setCurrentIdTrack] =
    useRecoilState(currentTrackIdState)
  const setIsPlaying = useSetRecoilState(isPlayingState)

  useEffect(() => {
    const getPlayingSong = async () => {
      try {
        const {
          body: { item },
        } = await spotifyApi.getMyCurrentPlayingTrack()
        item?.id && setCurrentIdTrack(item.id)

        const {
          body: { is_playing },
        } = await spotifyApi.getMyCurrentPlaybackState()
        setIsPlaying(is_playing)
      } catch (error) {
        console.log('ERROR AT FN: getPlayingSong', error)
      }
    }

    getPlayingSong()
  }, [session])

  useEffect(() => {
    const getSongInfo = async () => {
      if (currentIdTrack) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentIdTrack}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        )
          .then((res) => res.json())
          .then((res: SpotifyApi.TrackObjectFull) => res)

        setSongInfo(trackInfo)
      }
    }

    getSongInfo()
  }, [currentIdTrack, spotifyApi])

  return songInfo
}

export { useSongInfo }
