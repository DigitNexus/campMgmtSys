"use client"
import './index.css';
import {Toaster} from 'sonner';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from './App';
import Dashboard from './component/DashBoard';
import { useEffect, useState } from 'react';

export default function Page(){
  const [router, setRouter] = useState(null)

  useEffect(()=>{
    const r = createBrowserRouter([
       { path: "/", element: <Dashboard /> }
      // { path: "/campaign1", element: <C1 /> }
      // { path: "/register", element: <Register /> },
      // { path: "/main", element: <MainComponent /> },
    ]);
    setRouter(r)
  },[])

  if (!router) return null
  return (
    <>
      <RouterProvider router={router}>
        <Toaster />
      </RouterProvider>

    </>
  )
}
