import { useEffect, useState } from "react"

export default function ComplainsPage()
{
    const [login,setlogin]=useState(false)
    useEffect(() => {
        const id=sessionStorage.getItem('userid')
        if (id!=null){setlogin(true)}
    },[])
    return (
        login ? <div>
            LOGIN TO ACCESS
        </div> :
            <div className="bg-gray-900 min-h-screen flex flex-col items-center p-4 gap-4">
            <div className="w-full max-w-3xl bg-black p-4 border border-blue-500 flex flex-col gap-2">
              <input
                type="text"
                className="w-full p-2 bg-white text-black border border-gray-400 rounded"
                placeholder="Enter your prompt here..."
              />
              <select className="w-full p-2 bg-white text-black border border-gray-400 rounded">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
            <div className="w-full max-w-3xl bg-black p-4 border border-blue-500 flex flex-col gap-2">
              <div className="flex justify-between">
                <textarea
                  className="w-1/3 h-16 p-2 bg-green-200 text-black font-bold"
                  placeholder="From"
                />
                <textarea
                  className="w-1/3 h-8 p-2 bg-green-200 text-black font-bold"
                  placeholder="Date"
                />
              </div>
              <textarea
                className="w-1/3 h-16 p-2 bg-green-200 text-black font-bold"
                placeholder="To"
              />
              <textarea
                className="w-full h-10 p-2 bg-green-200 text-black font-bold"
                placeholder="Subject"
              />
              <textarea
                className="w-full flex-grow p-2 bg-green-200 text-black font-bold"
                placeholder="Body"
              />
            </div>
          </div>
    )
}