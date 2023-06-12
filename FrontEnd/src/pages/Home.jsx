import React from 'react'
import { useEffect, useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

//components
import WorkOutDetails from '../components/workOutDetails'
import WorkOutForm from '../components/WorkOutForm'
import useAuthContext from '../hooks/useAuthContext'

const Home = () => {
  const {workouts,dispatch} = useWorkoutsContext()
  const [error, setError] = useState(null);
  const [isLoading,setIsLoading] = useState(false)
  const {user} = useAuthContext()
  useEffect(() =>{
    const fetchWorkouts = async () =>{
      
      try {
        setIsLoading(true)
        
        const response = await fetch('https://backend-sooty-ten.vercel.app/api/workouts',{
          headers:{
            'authorization':`Bearer ${user.token}`
          }
        });
        const json = await response.json();
        if (response.ok) {
          setIsLoading(false)
          dispatch({type:'SET_WORKOUTS',payload:json})
        
        } else {
          setIsLoading(false)
          throw new Error('Network response was not ok');
          
        }
      } catch (error) {
        setIsLoading(false)
        setError(error);

      }
    }

    if (user && user.token) {
      fetchWorkouts();
    }
    
  },[dispatch,user])
  return (
    <div className='home'>
      {isLoading && (
        <div>
          <p>Loading...</p>
        </div>
      )}
      {!isLoading && (
        <div className='workouts'>
         {error &&
           <p>Somethingso went wrong: {error.message}</p>
         }
          {workouts !== null && workouts !== undefined && workouts.length > 0 ? 
              (
                workouts.map((workout) => (
                  <WorkOutDetails key={workout._id} workout={workout} />
                ))
              ): 
              (
                <div>
                  <p>Fill in a workout to start your Fitness Journey</p>
                </div>
              ) 
          }
        </div>
      )}
     
      <WorkOutForm/>
    </div>
  )
}

export default Home
