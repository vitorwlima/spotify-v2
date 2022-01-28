import { ReactNode } from 'react'

type SidebarButtonProps = {
  icon?: ReactNode
  label: string
}

const SidebarButton = ({ icon, label }: SidebarButtonProps) => {
  return (
    <button className="flex items-center space-x-2 hover:text-white">
      {icon}
      <p>{label}</p>
    </button>
  )
}

export { SidebarButton }