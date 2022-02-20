import { Sidebar, Center, Player } from 'src/components'

const HomeTemplate = () => {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <main className="flex">
        <Sidebar />
        <Center />
      </main>

      <div>
        <Player />
      </div>
    </div>
  )
}

export default HomeTemplate
