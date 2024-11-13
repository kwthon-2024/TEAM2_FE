import { AdditionIcon } from '../icons/NonActiveIcons'

type PostAdditionButtonProps = {
  onClick: VoidFunction
}

export const PostAdditionButton = ({ onClick }: PostAdditionButtonProps) => {
  return (
    <button
      type="button"
      className="flex-center absolute bottom-[88px] left-1/2 -translate-x-1/2 gap-1 rounded-2xl border-2 border-grey-2 bg-grey-1 py-2 pl-[10px] pr-4 shadow-sm"
      onClick={onClick}
    >
      <AdditionIcon />
      <p className="p-small font-medium">글 올리기</p>
    </button>
  )
}
