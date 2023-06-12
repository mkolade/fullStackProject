import React, { useState } from 'react'
import {FiEye,FiEyeOff} from 'react-icons/fi'
import useLogIn from '../hooks/useLogIn'


const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isPending,setIspending] = useState(false)
    
    const {logIn,error,isLoading} = useLogIn()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        await logIn(email,password)
    }
  return (
    <form  className="login" onSubmit={handleSubmit}>
        <h3>Login</h3>
        <label htmlFor="">Email:</label>
        <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="">Password:</label>
        <div className="password-field">
            <input 
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`password-toggle ${showPassword ? 'show' : ''}`}
            >
                {showPassword ?  <FiEyeOff/> : <FiEye/>}
            </button>
        </div>
        
        {!isLoading && <button type="submit" > Log in</button>}
        {isLoading && <button type="submit" disabled> Fetching...</button>}
        {error && 
            <div className='error'>
                {error}
            </div>
        }
    </form>
  )
}

export default Login