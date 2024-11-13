type PostDetailContentProps = {
  isCarpool?: boolean
  title: string
  trainingDate: string
  place: string
  time: string
  numberOfPeople: number
  price?: number
  memo: string
}

type InfoFieldProps = {
  label: string
  content: string
}

const InfoField = ({ label, content }: InfoFieldProps) => {
  return (
    <div className="flex-column w-full gap-1">
      <p className="p-small font-medium text-blue-5">{label}</p>
      <p className="p-large text-grey-7">{content}</p>
    </div>
  )
}

/**
 *
 * @todo 해당 페이지에 직접 코딩 예정
 */

export const PostDetailContent = ({
  isCarpool = false,
  title,
  trainingDate,
  place,
  time,
  numberOfPeople,
  price,
  memo,
}: PostDetailContentProps) => {
  return (
    <div className="flex-column px-4">
      <h5 className="mb-8 font-bold text-blue-6">{title}</h5>
      <div className="flex-column gap-6">
        <InfoField label="훈련 날짜" content={trainingDate} />

        <div className="flex-between-align">
          <InfoField label={isCarpool ? '출발 장소' : '만날 장소'} content={place} />
          <InfoField label="시간" content={time} />
        </div>

        <div className="flex-between-align">
          <InfoField label="모집 인원" content={`${numberOfPeople}명`} />
          {isCarpool && <InfoField label="금액" content={price === 0 ? '무료' : `${price}원`} />}
        </div>

        <InfoField label="메모" content={memo} />
      </div>
    </div>
  )
}
