import { useState } from 'react'
import { useAuthContext } from '../shared/useAuthContext'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)
    const response = await fetch('/Login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()
console.log(response) ;
console.log(json) ;

    if (!response.ok) {
      setIsLoading(false)
      setError(json.message )
   
    }
    if (response.ok) {
    
      // save the user to local storage
      sessionStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      setIsLoading(false)
    }
  }


/*     fetch('/Login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    }).then(response=>response.json())
    .then(data=> {
  
      console.log(data)
      sessionStorage.setItem("token",JSON.stringify(data.access_token))
      dispatch({type: 'LOGIN', payload: data})

      setIsLoading(false)
    
    })
    .catch(error=>{alert(error)
      setIsLoading(false)
      setError(error) 
    }) */

  return { login, isLoading, error }
}