import { Link } from 'react-router-dom'

import type { IconType } from '@/types'
import { getSessionStorageItem, SESSION_LOGIN_KEY, SESSION_MILITARY_CHPLAIN } from '@/utils'

import { ProfileImage } from '../ProfileImage'

export const MainHeader = () => {
  const iconType = (getSessionStorageItem(SESSION_MILITARY_CHPLAIN) as IconType) || null
  const loginSession = getSessionStorageItem(SESSION_LOGIN_KEY)

  return (
    <header className="flex-between-align relative mx-4 h-20 py-4">
      <Link to={'/home'}>
        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-jalnan text-[28px] leading-9 text-blue-6">
          BROOM
        </h1>
      </Link>

      {loginSession && iconType && (
        <Link to={'/mypage'} className="cursor-pointer">
          <ProfileImage iconType={iconType} size="md" />
        </Link>
      )}
    </header>
  )
}
