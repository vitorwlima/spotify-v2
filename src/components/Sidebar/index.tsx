import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon,
} from '@heroicons/react/outline'

import { SidebarButton, SeparatorLine } from 'src/components'

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
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <SidebarButton key={item} label="Playlist name" />
        ))}
      </div>
    </div>
  )
}

export { Sidebar }
