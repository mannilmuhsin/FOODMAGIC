import React from 'react'
import { useSelector } from "react-redux"
import { auth } from "../context/authReducer" 
import { useLocation, Outlet, Navigate } from "react-router-dom"

function RequerRout() {
    const authis=useSelector(auth)
    const location = useLocation()
    const from = location.state?.from.pathname || '/'
  return (
    authis?.user
        ? <Navigate to={from} state={{from:location}} replace />
        : <Outlet/>
  )
}

export default RequerRout
