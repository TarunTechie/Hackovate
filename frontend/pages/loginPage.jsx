import Header from "../components/header";
import { useState } from "react";
import { api } from "../constants/api";
export default function LoginPage()
{
    const [fields, setFields] = useState()
    function handleChanges(event)
    {
        setFields(()=>({...fields,[event.target.id]:event.target.value}))
    }
    async function login()
    {
      const results = await api.get('/login', { params: { fields } })
      localStorage.setItem('user', JSON.stringify(results.data))
      sessionStorage.setItem('usedid',results.data._id)
      console.log(results.data)
    }
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6 justify-center">
        <span>
            <img src="../assets/civic.png" className="w-22 h-22 m-auto"/>
            <h1 className="text-white text-center font-bold" >Civic Fix</h1>
        </span>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold my-4 text-center">LOGIN</h1>
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Phone Number</label>
              <input 
                onChange={handleChanges} 
                placeholder="Phone Number" 
                id="phone" 
                className="border border-gray-600 bg-gray-900 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Password</label>
              <input 
                onChange={handleChanges} 
                placeholder="Password" 
                id="password" 
                type="password" 
                className="border border-gray-600 bg-gray-900 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button 
            onClick={()=>{login()}} 
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-300 w-full">
            LOGIN
          </button>
        </div>
      </div>
    )
}