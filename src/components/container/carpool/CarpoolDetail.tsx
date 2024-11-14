import {
  Kebab,
  ModalWithTwoButton,
  PostBottom,
  PostDetailContent,
  PostProfile,
  SubHeaderWithIcon,
  SubHeaderWithoutIcon,
} from '@/components/view'
import { useBoolean } from '@/hooks'
import { getSessionStorageItem, SESSION_LOGIN_KEY } from '@/utils'

type HeaderProps = {
  isMine: boolean
}

const Header = ({ isMine }: HeaderProps) => {
  const loginSession = getSessionStorageItem(SESSION_LOGIN_KEY)

  const [kebabState, setKebabTrue, setKebabFalse] = useBoolean(false)
  const [modalState, openModal, closeModal] = useBoolean(false)

  const kebabMap = [
    { label: '수정하기', onClick: () => console.log('수정하기') },
    { label: '모집 완료로 변경', onClick: () => console.log('모집 완료로 변경') },
    { label: '삭제하기', onClick: openModal },
  ]

  const myKebabMap = [{ label: '차단하기', onClick: () => console.log('차단하기') }]

  return (
    <>
      {loginSession ? (
        <SubHeaderWithIcon type="kebab" onClickKebab={kebabState ? setKebabFalse : setKebabTrue} />
      ) : (
        <SubHeaderWithoutIcon type="null" />
      )}

      {loginSession && kebabState && (
        <Kebab
          list={isMine ? myKebabMap : kebabMap}
          location="right-4 top-12"
          redIndex={isMine ? 0 : 2}
        />
      )}

      <ModalWithTwoButton
        isOpen={modalState}
        closeModal={closeModal}
        content="게시글을 삭제하시겠습니까?"
        cancleButtonLabel="취소"
        completeButtonLabel="삭제"
        cancleOnClick={closeModal}
        completeOnClick={() => {}}
      />
    </>
  )
}

export const CarpoolDetail = () => {
  const isFull = false // 모집 마감 여부
  const isMine = false // 해당 게시물이 내가 작성한 게시물인지

  return (
    <>
      <div className="flex-column h-full">
        <Header isMine={isMine} />
        <PostProfile name="고로케" iconType="ARMY" year="4" subText="2024/04/12 12:33" />

        <div className="scroll mt-6 grow">
          <PostDetailContent
            isCarpool
            title="조기퇴소까지 같이 ㄱㄱ"
            trainingDate="2024-05-21"
            place="광운대역 광장 앞"
            time="08:00"
            numberOfPeople={2}
            price={0}
            memo="빠르게 갔다가 빠르게 돌아오실 분들 구해요! 역 앞 주차장에서 쏘카 빌릴 생각이고 차 값만 1/N 정산하시면 됩니다. 관심있으신 분들 연락 주세요."
          />
        </div>

        <PostBottom
          disabled={isMine || isFull}
          onClickBookmark={() => {}}
          onClickChattingButton={() => {}}
        />
      </div>
    </>
  )
}
