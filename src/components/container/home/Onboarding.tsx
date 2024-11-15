import { useNavigate } from 'react-router-dom'

import onboarding_first from '@/assets/onboarding1.svg'
import onboarding_second from '@/assets/onboarding2.svg'
import onboarding_third from '@/assets/onboarding3.svg'
import { Button } from '@/components/view'
import { useTouchEvent } from '@/hooks'

type SectionDotType = {
  currentTab: number
  onDotClick: (index: number) => void
}

const onboardingData = [onboarding_first, onboarding_second, onboarding_third]

const SectionDot = ({ currentTab, onDotClick }: SectionDotType) => {
  return (
    <div className="mt-6 flex gap-2">
      {[...Array(3)].map((_, index) => {
        const dotStyle = index === currentTab ? 'w-6 bg-blue-5' : 'w-2 bg-grey-3 opacity-50'
        return (
          <button
            key={index}
            className={`h-2 cursor-pointer rounded-full opacity-90 ${dotStyle}`}
            onClick={() => onDotClick(index)}
          />
        )
      })}
    </div>
  )
}

export const Onboarding = () => {
  const navigate = useNavigate()
  const { currentTab, carouselRef, onDotClick, ...event } = useTouchEvent()

  return (
    <div className="flex-column-align h-full">
      <div className="flex-column-align flex-1 grow justify-center">
        <div
          ref={carouselRef}
          {...event}
          className="webkit-overflow-scrolling-touch mx-[70px] flex overflow-auto overflow-x-hidden"
        >
          {onboardingData.map((image, index) => (
            <div className="flex w-full shrink-0 items-end" key={index}>
              <img src={image} alt={`onboarding-${index}`} />
            </div>
          ))}
        </div>

        <SectionDot currentTab={currentTab} onDotClick={onDotClick} />
      </div>

      <div className="my-5 w-full shrink-0 px-4 py-10 pt-1">
        <Button size="lg" classname="w-full" onClick={() => navigate('/home')}>
          시작하기
        </Button>
      </div>
    </div>
  )
}
