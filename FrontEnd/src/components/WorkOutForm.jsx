import React, { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import useAuthContext from '../hooks/useAuthContext'


const WorkOutForm = () => {
    const {dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()
    
    const [title,setTitle] = useState('')
    const [load,setLoad] = useState('')
    const [reps,setReps] = useState('')
    const [error,setError] = useState(null)
    const [isPending,setIspending] = useState(false)
    const [emptyFields,setEmptyFields] = useState([])


    const handleSubmit = async (e) =>{
        e.preventDefault()
        setIspending(true)
        if(!user){
            setError('You must be logged in')
            return
        }
        const workout = {title,load,reps}

        const response = await fetch('https://backend-sooty-ten.vercel.app/api/workouts',{
            method:'POST',
            body:JSON.stringify(workout),
            headers:{
                'Content-type':'application/json',
                "authorization":`Bearer ${user.token}`
            }
        })
        //console.log(response)
        const json = await response.json()
        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
            setIspending(false)
        }else{
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            //console.log('new workout created',await json)
            dispatch({type:'CREATE_WORKOUT',payload:json})
            setIspending(false)
        }
    }
  return (
    <form className="create" onSubmit={handleSubmit}>
        <h3>Add a workout</h3>

        <label>Exercise Title</label>
        <input 
            type="text"
            value={title}
            className={emptyFields.includes('title') ? 'error' : ''}
            onChange={(e) => setTitle(e.target.value)}
        />

        <label>Load (in Kg):</label>
        <input 
            type="number"
            value={load}
            className={emptyFields.includes('load') ? 'error' : ''}
            onChange={(e) => setLoad(e.target.value)}
        />

        <label>Reps:</label>
        <input 
            type="number"
            value={reps}
            className={emptyFields.includes('reps') ? 'error' : ''}
            onChange={(e) => setReps(e.target.value)}
        />  
        {error && <div className='error'>{error}</div>}
        {!isPending && <button>Add Workout</button>}
        {isPending && <button disabled>Adding...</button>}
    </form>
  )
}

export default WorkOutForm