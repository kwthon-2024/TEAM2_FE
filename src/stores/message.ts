import { create } from 'zustand'

import type { MessegeType } from '@/types'

type Actions = {
  setMessage: (messages: MessegeType[]) => void
  addMessage: (message: MessegeType) => void
  sendMessage: (message: MessegeType) => void
}

type MessageStore = {
  messages: MessegeType[]
  actions: Actions
}

const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  actions: {
    setMessage: (messages) => set(() => ({ messages: [...messages] })),
    addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
    sendMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  },
}))

export const useMessageData = () => useMessageStore((state) => state.messages)
export const useMessageActions = () => useMessageStore((state) => state.actions)
