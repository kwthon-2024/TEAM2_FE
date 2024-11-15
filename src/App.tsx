import { useEffect, useState } from 'react'

import { Splash } from './components/container'
import { RouterComponent } from './components/view'

function App() {
  const [showSplash, setShowSplash] = useState<boolean>(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 1800)

    return () => clearTimeout(timer)
  }, [])
  return (
    <div className="flex-center">
      <div className="scroll relative h-svh w-full min-w-[320px] max-w-[450px] border-x">
        {showSplash ? <Splash /> : <RouterComponent />}
      </div>
    </div>
  )
}

export default App
