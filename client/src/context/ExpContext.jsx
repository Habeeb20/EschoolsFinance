import  { createContext, useReducer } from 'react';

// this page is to update the page locally without refreshing the page. this is called react context
import React from 'react'


export const ExpContext = createContext()

export const expReducer = (state, action) => {
    switch(action.type){
        case 'set_exp':
            return {
                exp:action.payload
            }
        case 'create_exp':
            return{
                exp: action.payload, ...state.exp
            }
        case 'delete_exp':
            return{
                exp: state.exp.filter((w) => w.id !== action.payload._id)
            }
        default: 
            return state
    }
}

export const ExpContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(expReducer, {
        exp: null
    })

    return (
        <ExpContext.Provider value={{...state, dispatch}}>
            {children}
        </ExpContext.Provider>
    )
}