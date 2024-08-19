import  { createContext, useReducer } from 'react';

// this page is to update the page locally without refreshing the page. this is called react context
import React from 'react'

export const WorkoutContext = createContext()

export const workoutReducer = (state, action) => {
    switch(action.type){
        case 'set_workout':
            return{
                workout: action.payload
            }
        case 'create_workout':
            return{
                workout: action.payload, ...state.workout
            }
        case 'delete_workout':
            return{
                workout: state.workout.filter((w) => w._id !== action.payload._id) 
            }
        default: 
            return state

    }
}

export const WorkoutContextProvider = ({ children}) => {
    const [state, dispatch ] = useReducer(workoutReducer, {
        workout:null // the null is an initial value just like the initial value in useState
    })
    
   // dispatch({type: 'create_workout', payload:[{}, {}]})


    return(
        <WorkoutContext.Provider value={{...state, dispatch}}>
            { children }

        </WorkoutContext.Provider>
          
    )
}


