import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/view'

export const SignupCompletePage = () => {
  const navigate = useNavigate()
  return (
    <div className="flex-column h-full">
      <h1 className="mt-[30svh] text-center font-jalnan text-6xl leading-[44px] text-blue-6">
        BROOM
      </h1>
      <p className="p-large mx-4 mt-[30px] text-center font-bold text-blue-5">
        회원가입이 완료되었습니다.
      </p>
      <Button size="lg" classname="mx-4 mt-auto mb-10" onClick={() => navigate('/login')}>
        로그인 페이지로 이동
      </Button>
    </div>
  )
}
