import { Link } from 'react-router-dom'

import { AdditionCircleIcon, StopIcon } from '../icons/NonActiveIcons'

type PostItemProps = {
  title: string
  createdAt: string
  trainingDate: string
  place: string
  time: string
  isFull: boolean
  to: string
}

export const PostItem = ({
  title,
  createdAt,
  trainingDate,
  place,
  time,
  isFull,
  to,
}: PostItemProps) => {
  return (
    <Link className="flex-column mx-4 block gap-[10px] border-b border-b-grey-2 px-3 py-6" to={to}>
      <div className="flex-between-align gap-3">
        <p className="p-large truncate font-bold text-blue-5">{title}</p>
        <p className="p-xsmall text-grey-4">{createdAt}</p>
      </div>
      <div className="flex-between-align gap-3 text-left">
        <div className="flex-column gap-1">
          <p className="p-small font-bold text-grey-6">{trainingDate} 훈련</p>
          <div className="p-small text-grey-5">
            <span>{place}</span>
            <span className="mx-2">|</span>
            <span>{time}</span>
          </div>
        </div>
        {isFull ? <StopIcon /> : <AdditionCircleIcon />}
      </div>
    </Link>
  )
}
