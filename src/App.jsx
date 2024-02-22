import { RouterProvider } from 'react-router-dom'
import router from './Router'
import  UserContext  from './contexts/UserContext'
import { useState } from 'react'

function App() {
  
  const [token, setToken] = useState(null)

  // const updateToken = (data) => {
  //   setToken(data)
  // }
  
  return (
    <>
      <UserContext.Provider value={{token: token, updateToken:setToken}} >
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  )
}

export default App
