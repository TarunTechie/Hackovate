import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LoginPage from '../pages/loginPage.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import RegisterPage from "../pages/registerPage.jsx";
import ComplainsPage from "../pages/complainsPage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element:<LoginPage/>
  },
  {
    path: "/home",
    element:<App/>
  },
  {
    path: "/register",
    element:<RegisterPage/>
  },
  {
    path: "/complains",
    element:<ComplainsPage/>
  }
])
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
