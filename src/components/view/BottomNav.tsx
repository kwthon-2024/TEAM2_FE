import { Link, useLocation } from 'react-router-dom'

import {
  BusReservationIcon,
  CarpoolIcon,
  ChattingIcon,
  HomeIcon,
  TeammateIcon,
} from './icons/NavIcons'

const navItems = [
  { icon: BusReservationIcon, url: '/bus-reserve' },
  { icon: CarpoolIcon, url: '/carpool' },
  { icon: HomeIcon, url: '/home' },
  { icon: ChattingIcon, url: '/chatting' },
  { icon: TeammateIcon, url: '/teammate' },
]

export const BottomNav = () => {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <div className="flex-between px-4 pb-[19px] pt-[9px] shadow-md">
      {navItems.map(({ icon: Icon, url }, index) => (
        <Link key={index} to={url} className="flex-center">
          <Icon active={currentPath.startsWith(url)} />
        </Link>
      ))}
    </div>
  )
}
