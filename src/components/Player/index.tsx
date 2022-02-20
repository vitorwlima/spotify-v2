import { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { debounce } from 'ts-debounce'
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  RewindIcon,
  VolumeUpIcon,
} from '@heroicons/react/solid'

import { useSongInfo, useSpotify } from 'src/hooks'
import { isPlayingState } from 'src/atoms'

const Player = () => {
  const spotifyApi = useSpotify()
  const songInfo = useSongInfo()
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volume, setVolume] = useState(25)

  const switchSongPlayingStatus = async () => {
    try {
      const {
        body: { is_playing },
      } = await spotifyApi.getMyCurrentPlaybackState()

      setIsPlaying(!is_playing)

      if (is_playing) {
        await spotifyApi.pause()
      } else {
        await spotifyApi.play()
      }
    } catch (error) {
      console.log('ERROR AT FN: switchSongPlayingStatus', error)
    }
  }

  const updateVolume = useCallback(
    debounce((value: number) => spotifyApi.setVolume(value), 250),
    []
  )

  useEffect(() => {
    updateVolume(volume)
  }, [volume])

  if (!songInfo) return null

  return (
    <div className="absolute bottom-0 grid h-20 w-full grid-cols-3 bg-zinc-800 p-4 text-xs text-gray-500 md:text-sm">
      <div className="flex items-center space-x-4">
        <img
          className="hidden h-12 w-12 md:inline"
          src={songInfo.album.images?.[0].url}
        />
        <div>
          <h3 className="text-white">{songInfo.name}</h3>
          <p>{songInfo.album.name}</p>
        </div>
      </div>
      <div className="flex place-content-center items-center space-x-3">
        <RewindIcon className="h-6 w-6 cursor-pointer text-gray-400 hover:text-white" />
        {isPlaying ? (
          <PauseIcon
            className="h-9 w-9 cursor-pointer text-white"
            onClick={switchSongPlayingStatus}
          />
        ) : (
          <PlayIcon
            className="h-9 w-9 cursor-pointer text-white"
            onClick={switchSongPlayingStatus}
          />
        )}
        <FastForwardIcon className="h-6 w-6 cursor-pointer text-gray-400 hover:text-white" />
      </div>
      <div className="flex place-content-end place-items-center space-x-2">
        <VolumeUpIcon className="h-4 w-4 cursor-pointer text-white" />
        <input
          type="range"
          className="h-3 w-16 rounded-full bg-red-500 p-0 focus:shadow-none focus:outline-none focus:ring-0 md:w-36"
          value={volume}
          onChange={({ target }) => setVolume(Number(target.value))}
          min={0}
          max={100}
        />
      </div>
    </div>
  )
}

export { Player }
