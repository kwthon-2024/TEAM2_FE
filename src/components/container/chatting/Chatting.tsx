import { Link } from 'react-router-dom'

import { BottomNav, ChattingProfile, MainHeader, Search } from '@/components/view'

export const Chatting = () => {
  return (
    <div className="flex-column h-full">
      <MainHeader />

      <Search placeholder="닉네임을 검색해주세요." onClickSearchButton={() => {}} />

      <main className="flex-column scroll mb-2 mt-[30px] grow gap-4">
        {/* <Link to={`/chatting/chatting-room/${roomId}`}> */}
        <Link to={`/chatting/chatting-room/0`}>
          <ChattingProfile
            name="고로케"
            title="소프트 팀원 구해요"
            message="넵 그때 뵙겠습니다."
            time="1일전"
            iconType="NAVY"
          />
        </Link>
      </main>

      <BottomNav />
    </div>
  )
}
