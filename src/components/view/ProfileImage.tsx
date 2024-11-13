import type { ElementType } from 'react'

import type { IconType } from '@/types'

import { AirforceIcon, ArmyIcon, EtcIcon, MarineIcon, NavyIcon } from './icons/ProfileIcons'

const sizeMap = {
  lg: '64',
  md: '48',
  sm: '40',
} as const

type ProfileImageProps = {
  iconType: IconType
  size: keyof typeof sizeMap
}

const iconMap: Record<IconType, ElementType> = {
  ARMY: ArmyIcon,
  MARINE: MarineIcon,
  NAVY: NavyIcon,
  AIRFORCE: AirforceIcon,
  ETC: EtcIcon,
}

export const ProfileImage = ({ iconType, size }: ProfileImageProps) => {
  const IconComponent = iconMap[iconType]

  return (
    <div className="shrink-0">
      <IconComponent size={sizeMap[size]} />
    </div>
  )
}
