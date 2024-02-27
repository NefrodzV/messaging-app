import { RouterProvider } from 'react-router-dom'
import router from './Router'
import  { UserContext }  from './contexts/UserContext'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
function App() {

  const [token, setToken] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

 
  useEffect(() => {
    const data = Cookies.get('token')
    setToken(data)
  })
  useEffect(() => {
    if(token) {
      Cookies.set('token', token, { expires: 1 })
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  },[token])
  // Check if a cookie with token exists and update its state
  // useEffect(() => {
  //   // const data = Cookies.get("token")
  //   // console.log(data)
  //   // if(data && data !== "null") {
  //   //   console.log("cookie:" + data)
  //   //   setToken(data)
  //   //   setIsLoggedIn(true)
  //   // } else {
  //   //   setIsLoggedIn(false)
  //   // }
  // },[setToken,setIsLoggedIn])

  // useEffect(() => {
  //     if(token) {
  //       setIsLoggedIn(true)
  //     } else {
  //       setIsLoggedIn(false)
  //     }
  // }, [token])

  // useEffect(() => {
  //   if(!isLoggedIn) Cookies
  // },[isLoggedIn])
  
  return (
    <>
      <UserContext.Provider value={{
        token, 
        isLoggedIn,
        setToken,
        setIsLoggedIn, 
        }} >
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
      </UserContext.Provider>
    </>
  )
}

export default App
