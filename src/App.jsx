import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading]= useState(true) // loading stores whether the app is still checking authentication.

  const dispatch = useDispatch() // dispatch sends an action to the Redux store to update its state.

  // Checking the logged-in user
  useEffect(()=>{
    authService.getCurrentUser() // attempts to retrieve the currently authenticated user
    .then((userData)=>{
      if(userData){  // If a user exists
        dispatch(login({userData}))  // updates the Redux authentication state.
      }else{  // If no user exists
        dispatch(logout())  // updates the Redux authentication state to represent a logged-out user
      }
    })
    .finally(()=>setLoading(false))   // Once the authentication request finishes, loading becomes false, allowing the UI to render
  }, [])


// condition ? valueIfTrue : valueIfFalse
// !loading means loading is false
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
          TODO <Outlet/>
          
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App
