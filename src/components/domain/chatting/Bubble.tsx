type BubbleProps = {
  isMyMessage: boolean
  message: string
}

export const Bubble = ({ isMyMessage, message }: BubbleProps) => {
  const bubbleStyle = isMyMessage
    ? 'rounded-[20px] rounded-tr-none bg-blue-4 text-grey-1'
    : 'rounded-[20px] rounded-tl-none bg-grey-2 text-grey-7'
  return <div className={`px-4 py-[10px] ${bubbleStyle}`}>{message}</div>
}
