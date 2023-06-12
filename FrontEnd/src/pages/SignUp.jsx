import React, { useState } from 'react'
import {FiEye,FiEyeOff} from 'react-icons/fi'
import useSignUp from '../hooks/useSignUp'

const SignUp = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const {signUp,error,isLoading} = useSignUp()
 
    const handleSubmit = async (e) =>{
        e.preventDefault()
        await signUp(email,password);
    }
  return (
    <form  className="signup" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
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
        {!isLoading && <button type="submit" > Sign Up</button>}
        {isLoading && <button type="submit" disabled> Creating...</button>}
        {error && 
            <div className='error'>
                {error}
            </div>
        }
    </form>
  )
}

export default SignUp