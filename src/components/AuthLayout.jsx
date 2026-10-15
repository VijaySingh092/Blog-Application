//protects routes based on the user's Redux authentication status

import React,{useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// children- The component or page you want to protect
export default function Protected({children, authentication = true}){

    const navigate = useNavigate()   // useNavigate() lets you redirect users to another route
    const [loader, setLoader] = useState(true)   // loader starts as true, so the page displays Loading....
    const authStatus = useSelector(state=>state.auth.status)   // useSelector() reads the authentication status from your Redux store.

    useEffect(()=>{
        
        if(authentication && authStatus !== authentication){
            navigate('/login')
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    },[authStatus, navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>    
  // loader is the condition
//   <h1>Loading...</h1> is returned if loader is true.
{/* <>{children}</> is returned if loader is false */}



}