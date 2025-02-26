import { useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import Header from '../components/header'
import { cities, state } from '../constants/constants'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)
  const [fields, setFields] = useState()
  const nav=useNavigate()
    function handleChanges(event)
    {
        setFields(()=>({...fields,[event.target.id]:event.target.value}))
    }
  async function sendPromt()
  {
    const tosend=Object.assign({}, fields, {
      "user_name": sessionStorage.getItem('name'),
      "user_address":sessionStorage.getItem('address')
    })
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/super_agent', tosend)
      console.log(response.data)
      localStorage.setItem('complain', JSON.stringify(response.data))
      nav('/complains')
    } catch (error) {
      console.error(error)
    }
    console.log(response)
  }
  return (
    <div>
      <Header/>
    <div className="bg-gray-900 min-h-screen flex flex-col items-center p-10 gap-4">
            <div className="w-full max-w-3xl bg-black p-4 border border-blue-500 flex flex-col gap-2">
              <input
                type="text"
                className="w-full p-2 bg-white text-black border border-gray-400 rounded"
                placeholder="Enter your prompt here..." onChange={handleChanges} id="user_request"
          />
          <div className='half'>
          <select className="w-full p-2 bg-white text-black border border-gray-400 rounded" onChange={handleChanges} id="city">
              <option hidden>city</option>
              {cities.map((city, index)=>(<option>{city }</option>))}
            </select>
            <select className="w-full p-2 bg-white text-black border border-gray-400 rounded" onChange={handleChanges} id="state">
              <option hidden>state</option>
              {state.map((city, index)=>(<option>{city}</option>))}
          </select>
          </div>
        </div>    
        <button className='button' onClick={()=>{sendPromt()}}>FILE COMPLAINT</button>
      </div>
      </div>
  )
}

export default App
