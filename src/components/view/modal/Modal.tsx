import type { PropsWithChildren } from 'react'

import { Button } from '../Button'

import ModalPortal from './ModalPotal'

type ModalLayoutProps = {
  isOpen: boolean
  closeModal: VoidFunction
  content: string
}
type ModalWithOneButtonProps = ModalLayoutProps & {
  buttonLabel: string
  onClick: VoidFunction
}

type ModalWithTwoButtonProps = ModalLayoutProps & {
  cancleButtonLabel: string
  completeButtonLabel: string
  cancleOnClick: VoidFunction
  completeOnClick: VoidFunction
}

const ModalLayout = ({
  isOpen,
  closeModal,
  content,
  children,
}: PropsWithChildren<ModalLayoutProps>) => {
  return (
    <ModalPortal>
      {isOpen ? (
        <div className="flex-center fixed inset-0 z-20 h-svh w-full">
          <button
            type="button"
            className="fixed inset-0 bg-[#D9D9D9] opacity-[58%]"
            onClick={closeModal}
          />
          <div className="flex-column absolute min-w-[310px] gap-4 rounded-xl bg-white px-4 py-[10px]">
            <p className="p-large py-9 text-center font-medium">{content}</p>
            {children}
          </div>
        </div>
      ) : null}
    </ModalPortal>
  )
}

export const ModalWithOneButton = ({
  isOpen,
  closeModal,
  content,
  buttonLabel,
  onClick,
}: ModalWithOneButtonProps) => {
  return (
    <ModalLayout isOpen={isOpen} closeModal={closeModal} content={content}>
      <Button size="lg" onClick={onClick} classname="w-full">
        {buttonLabel}
      </Button>
    </ModalLayout>
  )
}

export const ModalWithTwoButton = ({
  isOpen,
  closeModal,
  content,
  cancleButtonLabel,
  completeButtonLabel,
  cancleOnClick,
  completeOnClick,
}: ModalWithTwoButtonProps) => {
  return (
    <ModalLayout isOpen={isOpen} closeModal={closeModal} content={content}>
      <div className="grid w-full grid-cols-2 gap-4">
        <Button size="lg" secondary onClick={cancleOnClick}>
          {cancleButtonLabel}
        </Button>
        <Button size="lg" onClick={completeOnClick}>
          {completeButtonLabel}
        </Button>
      </div>
    </ModalLayout>
  )
}
