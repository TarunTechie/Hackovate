import { useEffect, useState } from "react"

export default function ComplainsPage()
{
    const [login,setlogin]=useState('false')
    useEffect(() => {
        if (localStorage.getItem('user') != null)
        {
            setlogin(true)
        }
    },[])
    return (
        <div>
            
        </div>
    )
}