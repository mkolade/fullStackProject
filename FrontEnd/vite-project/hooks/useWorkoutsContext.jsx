import { WorkoutsContext } from "../context/WorkOutsContext";
import { useContext } from "react";

export const useWorkoutsContext = ()=>{
    const context = useContext(WorkoutsContext)
    if(!context){
        throw new Error('useworkoutscontext must be used inside a workoutsprovider')
    }
    return context
}