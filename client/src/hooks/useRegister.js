import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useRegister = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const register = async (email, password, admin) => {
        const response = await fetch('http://localhost:' + process.env.REACT_APP_PORT + '/user/register', {
            method: "POST",
            body: JSON.stringify({email, password, admin}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            setError(null)
            
            
            //save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update the auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
            console.log("Signed up")
        }
    }

    return { register, isLoading, error }
}