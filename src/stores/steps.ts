import { create } from 'zustand'

type Actions = {
  setCurrentStep: (newStep: number) => void
  setTotalStep: (newStep: number) => void
  goNextStep: () => void
  goPreviousStep: () => void
}

type StepsStore = {
  currentStep: number
  totalStep: number
  actions: Actions
}

const defaultValue = {
  currentStep: 1,
  totalStep: 1,
}

export const useStepsStore = create<StepsStore>((set, get) => ({
  currentStep: defaultValue.currentStep,
  totalStep: defaultValue.totalStep,
  actions: {
    setCurrentStep: (newStep) =>
      set(() => {
        const { totalStep } = get()
        const boundedStep = Math.max(1, Math.min(newStep, totalStep))
        return { currentStep: boundedStep }
      }),

    goNextStep: () => {
      set(() => {
        const { currentStep, totalStep } = get()
        const nextStep = currentStep + 1
        const boundedStep = Math.max(1, Math.min(nextStep, totalStep))
        return { currentStep: boundedStep }
      })
    },

    goPreviousStep: () => {
      set(() => {
        const { currentStep } = get()
        const previousStep = currentStep - 1
        const boundedStep = Math.max(1, previousStep)
        return { currentStep: boundedStep }
      })
    },

    setTotalStep: (newStep) => set(() => ({ totalStep: newStep })),
  },
}))

export const useCurrentStep = () => useStepsStore((state) => state.currentStep)
export const useTotalStep = () => useStepsStore((state) => state.totalStep)
export const useStepsActions = () => useStepsStore((state) => state.actions)
