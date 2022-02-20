import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRecoilValue } from 'recoil'
import { ChevronDownIcon } from '@heroicons/react/outline'

import { getRandomIntFrom } from 'src/utils'
import { playlistIdState } from 'src/atoms'

const TOP_SECTION_COLORS = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
]

const Center = () => {
  const { data: session } = useSession()
  const [gradientColor, setGradientColor] = useState(TOP_SECTION_COLORS[0])
  const currentPlaylistId = useRecoilValue(playlistIdState)

  useEffect(() => {
    const setColor = () => {
      const index = getRandomIntFrom(0, TOP_SECTION_COLORS.length - 1)

      if (
        index ===
        TOP_SECTION_COLORS.findIndex((color) => color === gradientColor)
      ) {
        setColor()
        return
      }

      setGradientColor(TOP_SECTION_COLORS[index])
    }

    setColor()
  }, [currentPlaylistId])

  return (
    <main className="flex-grow">
      <header className="absolute top-5 right-8">
        <div className="flex cursor-pointer items-center space-x-3 rounded-full bg-black p-1 pr-2 text-white opacity-90 hover:opacity-80">
          <img
            className="h-10 w-10 rounded-full"
            src={session?.user?.image ?? ''}
            alt={session?.user?.name ?? ''}
          />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex h-80 items-end space-x-7 bg-gradient-to-b ${gradientColor} to-black text-white`}
      ></section>
    </main>
  )
}

export { Center }
