import { RouterProvider } from 'react-router-dom'
import router from './Router'
import  { UserContext }  from './contexts/UserContext'
import { useState } from 'react'

function App() {

  const [token, setToken] = useState(null)
  const resetToken = () => {

    setToken(null)
  }

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
