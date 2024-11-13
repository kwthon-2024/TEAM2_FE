import type { IconType } from '@/types'

import { ProfileImage } from './ProfileImage'

type PostProfileType = {
  name: string
  year: string
  subText: string
  iconType: IconType
}

type ChattingProfileType = {
  name: string
  title: string
  message: string
  time: string
  iconType: IconType
}

export const PostProfile = ({ name, year, subText, iconType }: PostProfileType) => {
  return (
    <div className="flex-align gap-4 border-b border-b-grey-2 px-4 pb-3">
      <ProfileImage iconType={iconType} size="lg" />
      <div className="flex-column gap-[6px]">
        <div className="flex-align gap-3">
          <h6 className="font-bold">{name}</h6>
          <p className="p-small text-blue-5">예비군 {year}년차</p>
        </div>
        <p className="p-small text-grey-5">{subText}</p>
      </div>
    </div>
  )
}

export const ChattingProfile = ({ name, title, message, time, iconType }: ChattingProfileType) => {
  return (
    <div className="flex-align w-full gap-4 border-b border-b-grey-2 px-4 pb-3">
      <ProfileImage iconType={iconType} size="lg" />
      <div className="flex-column min-w-0 grow gap-[6px]">
        <div className="flex-align gap-3">
          <h6 className="font-bold">{name}</h6>
          <p className="p-small text-blue-5">{title}</p>
        </div>
        <p className="p-small grow truncate text-grey-7">{message}</p>
      </div>
      <p className="p-xsmall ml-auto shrink-0 text-grey-5">{time}</p>
    </div>
  )
}
