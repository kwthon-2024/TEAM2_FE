import { useParams } from 'react-router-dom'

import {
  Kebab,
  ModalWithTwoButton,
  PostBottom,
  PostProfile,
  SubHeaderWithIcon,
  SubHeaderWithoutIcon,
} from '@/components/view'
import { useBoolean } from '@/hooks'
import { useCarpoolDetailPage } from '@/queries'
import type { IconType } from '@/types'
import { getSessionStorageItem, SESSION_LOGIN_KEY, SESSION_NICKNAME } from '@/utils'

type HeaderProps = {
  isMyPost: boolean
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

const Header = ({ isMyPost }: HeaderProps) => {
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
          list={isMyPost ? myKebabMap : kebabMap}
          location="right-4 top-12"
          redIndex={isMyPost ? 0 : 2}
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
  const { id } = useParams()
  const {
    data: detailData,
    isPending,
    isError,
  } = useCarpoolDetailPage({ urls: { carpoolBoardId: parseInt(id as string) } })

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

  return (
    <>
      <div className="flex-column h-full">
        <Header isMyPost={isMyPost} />
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
          onClickChattingButton={() => {}}
        />
      </div>
    </>
  )
}
