import { useNavigate } from 'react-router-dom'

import { Button, TentIcon } from '@/components/view'
import { getSessionStorageItem, SESSION_LOGIN_KEY, SESSION_NICKNAME } from '@/utils'

export const HomeUserSection = () => {
  const navigate = useNavigate()
  const userNickname = getSessionStorageItem(SESSION_NICKNAME)
  const loginSession = getSessionStorageItem(SESSION_LOGIN_KEY)

  return (
    <section className="bg-white shadow-sm">
      {loginSession ? (
        <div className="flex-align px-4 py-7">
          <div className="flex-column grow gap-1">
            <p className="p-medium font-medium">{userNickname}님 안녕하세요.</p>
            <p className="p-medium flex-align gap-1 font-medium">
              <span className="font-bold text-blue-5">BROOM</span>에 오신걸 환영합니다.
            </p>
          </div>
          <TentIcon />
        </div>
      ) : (
        <div className="flex-column gap-4 px-4 py-7">
          <div className="flex-align">
            <div className="flex-column grow gap-1">
              <p className="p-medium flex-align gap-1 font-medium">
                <span className="font-bold text-blue-5">BROOM</span>에 가입하고
              </p>
              <p className="p-medium font-medium">다른 사람들을 모아보세요.</p>
            </div>
            <TentIcon />
          </div>

          <div className="flex-align w-full gap-3">
            <Button size="sm" classname="grow" onClick={() => navigate('/login')}>
              로그인
            </Button>
            <Button size="sm" secondary classname="grow" onClick={() => navigate('/sign-up')}>
              회원가입
            </Button>
          </div>
        </div>
      )}
    </section>
  )
}
