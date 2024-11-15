import { useNavigate, useParams } from 'react-router-dom'

import {
  Kebab,
  ModalWithTwoButton,
  PostBottom,
  PostProfile,
  SubHeaderWithIcon,
  SubHeaderWithoutIcon,
} from '@/components/view'
import { useBoolean } from '@/hooks'
import {
  useCarpoolChattingId,
  useCarpoolCheckFull,
  useCarpoolDelete,
  useCarpoolDetailPage,
} from '@/queries'
import type { IconType } from '@/types'
import {
  getSessionStorageItem,
  SESSION_LOGIN_KEY,
  SESSION_NICKNAME,
  SESSION_ROOM_TYPE,
  setSessionStorageItem,
  TAB_LIST_EN,
} from '@/utils'

type HeaderProps = {
  isMyPost: boolean
  isFull: boolean
}

type InfoFieldProps = {
  label: string
  content: string
}

const InfoField = ({ label, content }: InfoFieldProps) => {
  return (
    <div className="flex-column w-full gap-1">
      <p className="p-small font-medium text-blue-5">{label}</p>
      <p className="p-large text-grey-6">{content}</p>
    </div>
  )
}

const Header = ({ isMyPost, isFull }: HeaderProps) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const loginSession = getSessionStorageItem(SESSION_LOGIN_KEY)

  const [kebabState, setKebabTrue, setKebabFalse] = useBoolean(false)
  const [modalState, openModal, closeModal] = useBoolean(false)

  const { mutate: deleteMutation } = useCarpoolDelete()
  const { mutate: checkFullMutation } = useCarpoolCheckFull()

  const kebabMap = [{ label: '차단하기', onClick: () => console.log('차단하기') }]

  const handleClickCheckFull = () => {
    checkFullMutation({ body: { full: !isFull }, urls: { carpoolBoardId: parseInt(id as string) } })
  }

  const handleClickModalDelete = () => {
    deleteMutation(
      { urls: { carpoolBoardId: parseInt(id as string) } },
      {
        onSuccess: () => {
          navigate('/carpool', { replace: true })
        },
      },
    )
  }

  const myKebabMap = [
    { label: '수정하기', onClick: () => navigate(`/carpool/edit/${id}`) },
    { label: isFull ? '모집 중으로 변경' : '모집 완료로 변경', onClick: handleClickCheckFull },
    { label: '삭제하기', onClick: openModal },
  ]

  return (
    <>
      {loginSession ? (
        <SubHeaderWithIcon type="kebab" onClickKebab={kebabState ? setKebabFalse : setKebabTrue} />
      ) : (
        <SubHeaderWithoutIcon type="null" />
      )}

      {loginSession && kebabState && (
        <Kebab
          list={isMyPost ? myKebabMap : kebabMap}
          location="right-4 top-12"
          redIndex={isMyPost ? 2 : 0}
        />
      )}

      <ModalWithTwoButton
        isOpen={modalState}
        closeModal={closeModal}
        content="게시글을 삭제하시겠습니까?"
        cancleButtonLabel="취소"
        completeButtonLabel="삭제"
        cancleOnClick={closeModal}
        completeOnClick={handleClickModalDelete}
      />
    </>
  )
}

export const CarpoolDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    data: detailData,
    isPending,
    isError,
  } = useCarpoolDetailPage({ urls: { carpoolBoardId: parseInt(id as string) } })
  const { mutate: chattingMutation } = useCarpoolChattingId()

  if (isPending || isError) return <div>loading</div>

  const {
    author,
    createdAt,
    full,
    title,
    departTime,
    personnel,
    trainingDate,
    departPlace,
    price,
    content,
  } = detailData

  const isMyPost = author.nickname === getSessionStorageItem(SESSION_NICKNAME)

  const handleClickChatting = () => {
    chattingMutation(
      { urls: { carpoolBoardId: id as string } },
      {
        onSuccess: ({ chatRoomId }) => {
          setSessionStorageItem(SESSION_ROOM_TYPE, TAB_LIST_EN[0])
          navigate(`/chatting/chatting-room/${chatRoomId}`)
        },
      },
    )
  }

  return (
    <>
      <div className="flex-column h-full">
        <Header isMyPost={isMyPost} isFull={full} />
        <PostProfile
          name={author.nickname}
          iconType={author.militaryChaplain as IconType}
          year={author.dischargeYear.toString()}
          subText={createdAt}
        />

        <div className="scroll mt-6 grow">
          <div className="flex-column px-4">
            <h5 className="mb-8 font-bold text-blue-6">{title}</h5>
            <div className="flex-column gap-6">
              <InfoField label="훈련 날짜" content={trainingDate} />

              <div className="flex-between-align">
                <InfoField label="출발 장소" content={departPlace} />
                <InfoField label="시간" content={departTime} />
              </div>

              <div className="flex-between-align">
                <InfoField label="모집 인원" content={`${personnel}명`} />
                <InfoField label="금액" content={price === 0 ? '무료' : `${price}원`} />
              </div>

              <InfoField label="메모" content={content} />
            </div>
          </div>
        </div>

        <PostBottom
          isMyPost={isMyPost}
          disabled={full}
          onClickBookmark={() => {}}
          onClickChattingButton={handleClickChatting}
        />
      </div>
    </>
  )
}
