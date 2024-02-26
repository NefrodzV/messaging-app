import { RouterProvider } from 'react-router-dom'
import router from './Router'
import  { UserContext }  from './contexts/UserContext'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

function App() {

  const [token, setToken] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check if a cookie with token exists and update its state
  useEffect(() => {
    const data = Cookies.get("token")
    if(data && data !== "null") {
      console.log("cookie:" + data)
      setToken(data)
      setIsLoggedIn(true) 
    } else {
      setIsLoggedIn(false)
    }
  })
  
  return (
    <>
      <UserContext.Provider value={{
        token, 
        isLoggedIn,
        setToken,
        setIsLoggedIn, 
        }} >
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  )
}

export default App
