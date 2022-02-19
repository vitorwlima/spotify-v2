import { ReactNode } from 'react'

type SidebarButtonProps = {
  icon?: ReactNode
  label: string
}

const SidebarButton = ({ icon, label }: SidebarButtonProps) => {
  return (
    <button className="flex w-full items-center space-x-2 hover:text-white">
      {icon && <div className="h-5 w-5">{icon}</div>}
      <p>{label}</p>
    </button>
  )
}

export { SidebarButton }
