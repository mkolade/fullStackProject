import {useContext} from 'react'
import { AuthContext } from '../context/AuthContext'


const useAuthContext = () => {
    const context = useContext(AuthContext)
    if(!context){
        return 'Context can only be used within its provider'
    }
  return  context;
}

export default useAuthContext