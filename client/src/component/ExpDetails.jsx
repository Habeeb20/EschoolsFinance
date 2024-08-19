import React from 'react'
import { useExpContext } from '../hooks/useExpContext'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import {useAuthContext} from '../hooks/useAuthContext'
const ExpDetails = ({exp}) => {
    const {dispatch} = useExpContext()
    const {user} = useAuthContext()

    const handleClick = async () => {
        if(!user){
            return
        }
        const response = await fetch('http://localhost:4000/api/exp/' +  exp._id, {
            method: 'DELETE',
            headers:{
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type: 'delete_exp', payload: json})
        }
    }
  return (
    <>
    <div className='workout-details'>
        <h3>Expenditure</h3>
        <h4>{exp.purpose}</h4>
        <p><strong>Amount:</strong>{exp.amount}</p>
        <p>{formatDistanceToNow(new Date(exp.createdAt), {addSuffix: true})}</p>
        <button style={{backgroundColor:"red", color: "white"}} onClick={handleClick}>Delete</button>
    </div>
      
    </>
  )
}

export default ExpDetails
