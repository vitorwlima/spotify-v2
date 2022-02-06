import { Sidebar } from 'src/components'
import { Center } from '../../components/Center'

const HomeTemplate = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-black">
      <Sidebar />
      <Center />
    </div>
  )
}

export default HomeTemplate
