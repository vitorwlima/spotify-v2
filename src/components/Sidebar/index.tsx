import { useEffect, useState } from 'react'
import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon,
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'

import { SidebarButton, SeparatorLine } from 'src/components'
import { useSpotify } from 'src/hooks'
import { playlistIdState } from 'src/atoms'

const SIDEBAR_FIRST_BUTTONS = [
  {
    id: 1,
    label: 'Home',
    icon: <HomeIcon />,
  },
  {
    id: 2,
    label: 'Search',
    icon: <SearchIcon />,
  },
  {
    id: 3,
    label: 'Your Library',
    icon: <LibraryIcon />,
  },
]

const SIDEBAR_SECOND_BUTTONS = [
  {
    id: 1,
    label: 'Create Playlist',
    icon: <PlusCircleIcon />,
  },
  {
    id: 2,
    label: 'Liked Songs',
    icon: <HeartIcon />,
  },
  {
    id: 3,
    label: 'Your Episodes',
    icon: <RssIcon />,
  },
]

const Sidebar = () => {
  const spotifyApi = useSpotify()
  const { data: session } = useSession()
  const [currentPlaylistId, setCurrentPlaylistId] =
    useRecoilState(playlistIdState)

  const [playlists, setPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([])

  useEffect(() => {
    const getUserPlaylists = async () => {
      const {
        body: { items },
      } = await spotifyApi.getUserPlaylists()
      setPlaylists(items)
    }

    if (spotifyApi.getAccessToken()) {
      getUserPlaylists()
    }
  }, [spotifyApi, session])

  return (
    <div className="h-screen overflow-y-scroll border-r border-gray-900 p-5 text-sm text-gray-500 scrollbar-hide">
      <div className="space-y-4">
        {SIDEBAR_FIRST_BUTTONS.map(({ id, icon, label }) => (
          <SidebarButton key={id} icon={icon} label={label} />
        ))}
        <SeparatorLine />
        {SIDEBAR_SECOND_BUTTONS.map(({ id, icon, label }) => (
          <SidebarButton key={id} icon={icon} label={label} />
        ))}
        <SeparatorLine />
        {playlists.map((playlist) => (
          <SidebarButton
            key={playlist.id}
            label={playlist.name}
            selected={playlist.id === currentPlaylistId}
            onClick={() => setCurrentPlaylistId(playlist.id)}
          />
        ))}
      </div>
    </div>
  )
}

export { Sidebar }
