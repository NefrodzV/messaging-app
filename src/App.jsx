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
  const [user, setUser] = useState(null)

 
  useEffect(() => {
    const data = Cookies.get('token')
    setToken(data)
  })
  useEffect(() => {
    if(token) {
      // Cookies.set('token', token, { expires: 1 })
      setIsLoggedIn(true)
      getUser()
    } else {
      setIsLoggedIn(false)
    }
  },[token])

  async function getUser() {
    try {
        const response = await fetch(
            'http://localhost:3000/api/users/me',
            {
                headers: {
                    'authorization': 'Bearer ' + token
                }
            }
        )

        const data = await response.json()
        if(!response.ok) {
            console.log(data)
            return console.error("error getting user", data.errors)
        }
        setUser(data.user)
    } catch(e) {
        throw new Error("Error getting user from api: " + e)
    }
}
  
  return (
    <>
      <UserContext.Provider value={{
        token, 
        user,
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
