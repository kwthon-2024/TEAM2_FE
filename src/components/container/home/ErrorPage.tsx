import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/view'

export const ErrorPage = () => {
  const navigate = useNavigate()
  return (
    <div className="grid size-full place-items-center">
      <div className="flex-column-align gap-8">
        <h1 className="font-jalnan text-[64px] font-bold text-blue-6">404</h1>
        <p className="p-medium font-medium text-blue-5">{`네트워크 에러가 발생했어요...\n재시도 부탁드립니다.`}</p>
        <div className="w-full pt-20">
          <Button size="lg" classname="w-full" onClick={() => navigate('/home')}>
            홈으로 이동하기
          </Button>
        </div>
      </div>
    </div>
  )
}
