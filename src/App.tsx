import { RouterComponent } from './components/view'

function App() {
  return (
    <div className="flex-center">
      <div className="scroll relative h-svh w-full min-w-[320px] max-w-[450px] border-x">
        <RouterComponent />
      </div>
    </div>
  )
}

export default App
