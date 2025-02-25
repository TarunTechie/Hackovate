import { useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import Header from '../components/header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
    <Link to={'/login'}><h1>LOGIN</h1></Link>
    <Link to={'/register'}><h1>Rgister</h1></Link>
    <Link to={'/complains'}><h1>Complains</h1></Link>
    </>
  )
}

export default App
