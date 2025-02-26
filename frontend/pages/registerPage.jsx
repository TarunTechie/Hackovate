import Header from "../components/header";
import { useState } from "react";
import { api } from "../constants/api";
import { cities,state } from "../constants/constants";
export default function RegisterPage()
{
    const [fields, setFields] = useState()
    function handleChanges(event)
    {
        setFields(()=>({...fields,[event.target.id]:event.target.value}))
    }
    async function register()
    {
      const user = await api.post('/register', fields, { params: { type: "user" } })
      if (user.data != null)
      {
        alert("registered go back to login page")
      }
    }
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6 justify-center">
         <span>
            <img src="../assets/civic.png" className="w-22 h-22 m-auto"/>
            <h1 className="text-white text-center font-bold" >Civic Fix</h1>
          </span>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold my-4 text-center">REGISTER</h1>
        <div className="space-y-4">
          {[
            { label: "Name", id: "name", type: "text" },
            { label: "Email", id: "email", type: "email" },
            { label: "Phone Number", id: "phone", type: "number" },
            { label: "Password", id: "password", type: "password" }
          ].map((field) => (
            <div key={field.id} className="flex flex-col">
              <label className="text-sm font-semibold mb-1">{field.label}</label>
              <input 
                onChange={handleChanges} 
                placeholder={field.label} 
                id={field.id} 
                type={field.type}
                className="border border-gray-600 bg-gray-900 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
        <h1 className="text-xl font-bold my-4">Address</h1>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1">City</label>
            <select 
              onChange={handleChanges} 
              id="city" 
              className="border border-gray-600 bg-gray-900 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {cities.map((city, index) => (
                <option key={index} className="bg-gray-800">{city}</option>
              ))}
            </select>
          </div>
          {[
            { label: "State", id: "state", type: "text" },
            { label: "Pincode", id: "pin", type: "number" },
            { label: "Street", id: "street", type: "text" }
          ].map((field) => (
            <div key={field.id} className="flex flex-col">
              <label className="text-sm font-semibold mb-1">{field.label}</label>
              <input 
                onChange={handleChanges} 
                placeholder={field.label} 
                id={field.id} 
                type={field.type}
                className="border border-gray-600 bg-gray-900 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
        <button 
          onClick={()=>{register()}} 
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-300 w-full">
          REGISTER
        </button>
      </div>
    </div>
    )
}