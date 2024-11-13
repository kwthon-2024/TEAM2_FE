import { Link } from 'react-router-dom'

import { HomeUserSection } from '@/components/domain'
import { ArrowRightIcon, BottomNav, MainHeader } from '@/components/view'
import { NOTICE_ARR } from '@/utils'

const serviceArr = [
  { label: '차 타고 같이 갈 사람 없을까?', url: '/carpool' },
  { label: '나는 조기퇴소가 목표야!', url: '/teammate' },
  { label: '버스 신청하러 왔어요~', url: '/bus-reserve' },
]

export const Home = () => {
  return (
    <div className="flex-column h-full">
      <MainHeader />
      <main className="flex-column scroll grow gap-[6px] bg-grey-1">
        <HomeUserSection />

        <section className="flex-column gap-5 bg-white p-4 shadow-sm">
          <div className="flex-between-align">
            <p className="p-large font-medium">공지사항</p>
            <p className="p-xsmall border-b border-b-blue-4 text-blue-5">전체보기</p>
          </div>

          <div className="flex-column gap-3 text-grey-6">
            {NOTICE_ARR.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </section>

        <section className="flex-column gap-5 bg-white p-4 shadow-sm">
          <p className="p-large font-medium">어떤 서비스를 찾고 있나요?</p>

          <div className="flex-column gap-3">
            {serviceArr.map(({ label, url }) => (
              <Link
                to={url}
                key={label}
                className="p-medium flex-between-align hover-scale rounded-xl bg-blue-4 py-[18px] pl-7 pr-3 font-medium text-grey-1 shadow-sm"
              >
                <p>{label}</p>
                <ArrowRightIcon />
              </Link>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
