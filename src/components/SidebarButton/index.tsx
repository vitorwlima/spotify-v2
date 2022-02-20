import { HTMLAttributes, ReactNode } from 'react'

type SidebarButtonProps = HTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode
  label: string
  selected?: boolean
}

const SidebarButton = ({
  icon,
  label,
  selected,
  ...rest
}: SidebarButtonProps) => {
  return (
    <button
      className={`flex w-full items-center space-x-2 text-left ${
        selected && 'text-white'
      } hover:text-white`}
      {...rest}
    >
      {icon && <div className="h-5 w-5">{icon}</div>}
      <p>{label}</p>
    </button>
  )
}

export { SidebarButton }
