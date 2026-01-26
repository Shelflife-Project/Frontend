import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Link } from 'react-router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Link to="https://vite.dev" target="_blank">
          <img src={viteLogo} alt="Vite logo" />
        </Link>
        <Link to="https://react.dev" target="_blank">
          <img src={reactLogo} alt="React logo" />
        </Link>
      </div>
      <h1>Vite + React</h1>
      <div>
        <button className='btn btn-primary' onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p>
        Click on the Vite and React logos to learn more
      </p>
    </>
  )



}

export default App
