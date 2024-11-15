import { useRef, useState } from 'react'

export const useTouchEvent = () => {
  const [currentTab, setCurrentTab] = useState(0)
  const [touchStartPosition, setTouchStartPosition] = useState(0)
  const [touchEndPosition, setTouchEndPosition] = useState(0)

  const carouselRef = useRef<HTMLDivElement | null>(null)

  let mouseDown = false
  let startX = 0
  let endX = 0

  const onScroll = () => {
    if (carouselRef.current !== null) {
      const index = Math.round(carouselRef.current.scrollLeft / carouselRef.current.offsetWidth)
      setCurrentTab(index)
    }
  }

  const onDotClick = (index: number) => {
    if (carouselRef.current !== null) {
      carouselRef.current.scrollTo({
        left: index * carouselRef.current.offsetWidth,
        behavior: 'smooth',
      })

      setTimeout(() => {
        setCurrentTab(index)
      }, 200)
    }
  }

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartPosition(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndPosition(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    const threshold = 50
    const direction = touchStartPosition - touchEndPosition

    if (direction > threshold) {
      const newIndex = currentTab + 1 < 3 ? currentTab + 1 : currentTab
      onDotClick(newIndex)
    } else if (direction < -threshold) {
      const newIndex = currentTab - 1 >= 0 ? currentTab - 1 : currentTab
      onDotClick(newIndex)
    }
  }

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    mouseDown = true
    startX = e.clientX
  }

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mouseDown) return
    endX = e.clientX
  }

  const onMouseUp = () => {
    mouseDown = false
    const threshold = 50
    const direction = startX - endX

    if (direction > threshold) {
      const newIndex = currentTab + 1 < 3 ? currentTab + 1 : currentTab
      onDotClick(newIndex)
    } else if (direction < -threshold) {
      const newIndex = currentTab - 1 >= 0 ? currentTab - 1 : currentTab
      onDotClick(newIndex)
    }
  }

  return {
    currentTab,
    carouselRef,
    onScroll,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onDotClick,
  }
}
