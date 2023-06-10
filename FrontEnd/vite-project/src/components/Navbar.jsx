import React from 'react'
import { Link } from 'react-router-dom'
import useLogOut from '../hooks/useLogOut'
import useAuthContext from '../hooks/useAuthContext'


const Navbar = () => {
  
  const {logOut} = useLogOut()
  const {user} = useAuthContext()

  const handleClick = async () =>{
    await logOut()
  }
  return (
    <header>
        <div className="container">
            <Link to={'/'}>
                <h2>Workout Guru</h2>
            </Link>
            <nav>
              {user &&
                (<div>
                  <span>Welcome {user.email}</span>
                  <button onClick={handleClick}>Log out</button>
                </div>)
              }
              {!user &&(
                <div>
                  <Link to={'/login'}>  Login  </Link>
                  <Link to={'/Signup'}>  Sign up  </Link>
              </div>
              )}
              
            </nav>
        </div>
    </header>
  )
}

export default Navbar