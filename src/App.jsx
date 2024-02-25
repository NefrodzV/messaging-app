import { RouterProvider } from 'react-router-dom'
import router from './Router'
import  { UserContext }  from './contexts/UserContext'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

function App() {

  const [token, setToken] = useState(null)

  const resetToken = () => {
    setToken(null)
  }

  useEffect(() => {
    const data = Cookies.get("token")
    if(data && data !== "null") {
      console.log("cookie:" + data)
      setToken(data)
    }
  })

  useEffect(() => {
    if(token) {
      Cookies.set('token', token, { expires: 3 })
    }
  },[token])
  return (
    <>
      <UserContext.Provider value={{
        token, 
        setToken,
        resetToken }} >
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  )
}

export default App
