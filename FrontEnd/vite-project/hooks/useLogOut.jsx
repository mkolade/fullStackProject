import useAuthContext from './useAuthContext'
import {useWorkoutsContext} from './useWorkoutsContext'

const useLogOut = () => {
    const {dispatch} = useAuthContext()
    const {dispatch:workoutsDispatch} = useWorkoutsContext()

    const logOut = () =>{
        //remove user from local storage
        localStorage.removeItem('user')

        workoutsDispatch({type:'SET_WORKOUTS',payload:null})
        dispatch({type:'LOGOUT'})
    }
  return (
    {logOut}
  )
}

export default useLogOut