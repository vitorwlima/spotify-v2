import { Sidebar, Center } from 'src/components'

const HomeTemplate = () => {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <main className="flex">
        <Sidebar />
        <Center />
      </main>
    </div>
  )
}

export default HomeTemplate
