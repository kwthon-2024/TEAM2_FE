export type IconType = 'ARMY' | 'MARINE' | 'NAVY' | 'AIRFORCE' | 'ETC'
export type FilterNameType = '제목' | '훈련 날짜' | '출발 장소'

export type SvgIconProps = {
  size?: string
  active?: boolean
}

export type KebabMapType = {
  label: FilterNameType
  type: string
  placeholder: string
}[]
