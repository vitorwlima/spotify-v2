import { Sidebar } from 'src/components'

const HomeTemplate = () => {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <Sidebar />
      <main></main>
    </div>
  )
}

export default HomeTemplate
