import React from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import useAuthContext from '../hooks/useAuthContext'

const WorkOutDetails = ({workout}) => {
  const {dispatch} = useWorkoutsContext()
  const {user} = useAuthContext()
  
  const handleDelete = async () =>{

    if(!user){
      return
    }

    const response = await fetch('https://backend-sooty-ten.vercel.app/api/workouts/'+ workout._id,{
      method:'DELETE',
      headers:{
        "authorization":`Bearer ${user.token}`
      }
    })
    const json = await response.json()
    if(response.ok){
      dispatch({type:'DELETE_WORKOUT',payload:json})
    }
  }
  return (
    
    <div className='workout-details'>
        <h4>{workout.title}</h4>
        <p><strong>Load (kg):</strong>{workout.load}</p>
        <p><strong>Reps (kg):</strong>{workout.reps}</p>
        <p>{formatDistanceToNow(new Date(workout.createdAt),{addSuffix:true})}</p>
        <span className='material-symbols-outlined' onClick={handleDelete}>delete</span>
    </div>
  )
}

export default WorkOutDetails