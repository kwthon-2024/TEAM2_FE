import { Bubble } from '@/components/domain'
import {
  AdditionIcon,
  Kebab,
  PostProfile,
  ProfileImage,
  SendingIcon,
  SubHeaderWithIcon,
} from '@/components/view'
import { useBoolean } from '@/hooks'

const message = [
  { isMyMessage: false, message: '안녕하세요!', time: '오후 12:00' },
  { isMyMessage: false, message: '팀원 모집 글 보고 연락드립니다.', time: '오후 12:00' },
  { isMyMessage: false, message: '빠른 퇴소를 목표로 함께 하고싶습니다.', time: '오후 12:00' },
  {
    isMyMessage: true,
    message: '좋습니다. 8시 50분까지 물품 보관소 1번 앞에서 뵙겠습니다.',
    time: '오후 12:00',
  },
  { isMyMessage: false, message: '안녕하세요!', time: '오후 12:00' },
  { isMyMessage: false, message: '팀원 모집 글 보고 연락드립니다.', time: '오후 12:00' },
  { isMyMessage: false, message: '빠른 퇴소를 목표로 함께 하고싶습니다.', time: '오후 12:00' },
  {
    isMyMessage: true,
    message: '좋습니다. 8시 50분까지 물품 보관소 1번 앞에서 뵙겠습니다.',
    time: '오후 12:00',
  },
  { isMyMessage: false, message: '안녕하세요!', time: '오후 12:00' },
  { isMyMessage: false, message: '팀원 모집 글 보고 연락드립니다.', time: '오후 12:00' },
  { isMyMessage: false, message: '빠른 퇴소를 목표로 함께 하고싶습니다.', time: '오후 12:00' },
  {
    isMyMessage: true,
    message: '좋습니다. 8시 50분까지 물품 보관소 1번 앞에서 뵙겠습니다.',
    time: '오후 12:00',
  },
  { isMyMessage: false, message: '안녕하세요!', time: '오후 12:00' },
  { isMyMessage: false, message: '팀원 모집 글 보고 연락드립니다.', time: '오후 12:00' },
  { isMyMessage: false, message: '빠른 퇴소를 목표로 함께 하고싶습니다.', time: '오후 12:00' },
  {
    isMyMessage: true,
    message: '좋습니다. 8시 50분까지 물품 보관소 1번 앞에서 뵙겠습니다.',
    time: '오후 12:00',
  },
  { isMyMessage: false, message: '안녕하세요!', time: '오후 12:00' },
  { isMyMessage: false, message: '팀원 모집 글 보고 연락드립니다.', time: '오후 12:00' },
  { isMyMessage: false, message: '빠른 퇴소를 목표로 함께 하고싶습니다.', time: '오후 12:00' },
  {
    isMyMessage: true,
    message: '좋습니다. 8시 50분까지 물품 보관소 1번 앞에서 뵙겠습니다.',
    time: '오후 12:00',
  },
  { isMyMessage: false, message: '안녕하세요!', time: '오후 12:00' },
  { isMyMessage: false, message: '팀원 모집 글 보고 연락드립니다.', time: '오후 12:00' },
  { isMyMessage: false, message: '빠른 퇴소를 목표로 함께 하고싶습니다.', time: '오후 12:00' },
  {
    isMyMessage: true,
    message: '좋습니다. 8시 50분까지 물품 보관소 1번 앞에서 뵙겠습니다.',
    time: '오후 12:00',
  },
]

export const ChattingRoom = () => {
  const [kebabState, setKebabTrue, setKebabFalse] = useBoolean(false)

  const kebabMap = [
    { label: '채팅방 나가기', onClick: () => console.log('채팅방 나가기') },
    { label: '차단하기', onClick: () => console.log('차단하기') },
  ]

  return (
    <div className="flex-column h-full">
      <SubHeaderWithIcon type={'kebab'} onClickKebab={kebabState ? setKebabFalse : setKebabTrue} />
      <PostProfile name="고로케" year="4" subText="소프트 팀원 구해요" iconType="ARMY" />

      {kebabState && <Kebab list={kebabMap} location="right-4 top-12" redIndex={1} />}

      <main className="scroll flex-column mx-4 grow gap-4 py-4">
        {message.map(({ isMyMessage, message, time }, index) => {
          const layoutStyle = isMyMessage ? 'flex flex-row-reverse items-center' : 'flex-align'
          return (
            <div key={index} className={`${layoutStyle} gap-3`}>
              {!isMyMessage && <ProfileImage size="sm" iconType="NAVY" />}
              <Bubble isMyMessage={isMyMessage} message={message} />
              <span className="p-xsmall shrink-0 self-end text-grey-5">{time}</span>
            </div>
          )
        })}
      </main>

      <div className="flex-align gap-2 bg-white px-4 pb-8 pt-3">
        <AdditionIcon />
        <div className="flex-align grow gap-1 rounded-full bg-grey-1 py-2 pl-4 pr-2">
          <input
            type="text"
            placeholder="메세지를 입력해주세요."
            className="grow text-grey-7 placeholder:text-grey-4 focus:outline-none"
          />

          <button className="shrink-0 ">
            <SendingIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
