import { useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import Header from '../components/header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header/>
    <div className="bg-gray-900 min-h-screen flex flex-col items-center p-10 gap-4">
            <div className="w-full max-w-3xl bg-black p-4 border border-blue-500 flex flex-col gap-2">
              <input
                type="text"
                className="w-full p-2 bg-white text-black border border-gray-400 rounded"
                placeholder="Enter your prompt here..."
              />
          <select className="w-full p-2 bg-white text-black border border-gray-400 rounded">
            {}
          </select>
      </div>    
      </div>
      </div>
  )
}

export default App
