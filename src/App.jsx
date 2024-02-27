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
