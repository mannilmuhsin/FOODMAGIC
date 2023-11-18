import { useSelector } from "react-redux"
import { auth } from "../context/authReducer" 
import { useLocation, Outlet, Navigate } from "react-router-dom"


const RequerAuth = ({allows})=>{
    const authis=useSelector(auth)
    const location = useLocation()
    return (
        authis?.role?.find(role=>allows?.includes(role))
        ? <Outlet/>
        :authis?.user
        ? <Navigate to='/uno' state={{from:location}} replace />
        : <Navigate to='/login' state={{from:location}} replace />
    )
}

export default RequerAuth;