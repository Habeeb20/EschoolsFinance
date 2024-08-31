// import React from 'react'
// import { useExpContext } from '../hooks/useExpContext'
// import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
// import {useAuthContext} from '../hooks/useAuthContext'
// const ExpDetails = ({exp}) => {
//     const {dispatch} = useExpContext()
//     const {user} = useAuthContext()

//     const handleClick = async () => {
//         if(!user){
//             return
//         }
//         const response = await fetch('http://localhost:4000/api/exp/' +  exp._id, {
//             method: 'DELETE',
//             headers:{
//                 'Authorization': `Bearer ${user.token}`
//             }
//         })
//         const json = await response.json()

//         if(response.ok){
//             dispatch({type: 'delete_exp', payload: json})
//         }
//     }
//   return (
//     <>
//     <div className='workout-details'>
//         <h3>Expenditure</h3>
//         <h4>{exp.purpose}</h4>
//         <p><strong>Amount:</strong>{exp.amount}</p>
//         <p>{formatDistanceToNow(new Date(exp.createdAt), {addSuffix: true})}</p>
//         <button style={{backgroundColor:"red", color: "white"}} onClick={handleClick}>Delete</button>
//     </div>
      
//     </>
//   )
// }

// export default ExpDetails


import React from 'react';
import { useExpContext } from '../hooks/useExpContext';
import { formatDistanceToNow } from 'date-fns';
import { useAuthContext } from '../hooks/useAuthContext';

const ExpDetails = ({ exp }) => {
  const { dispatch } = useExpContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch('http://localhost:4000/api/exp/' + exp._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'delete_exp', payload: json });
    }
  };

  return (
    <div
      className='workout-details'
      style={{
        backgroundColor: '#f9f9f9',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Expenditure</h3>
      <h4 style={{ fontSize: '1.2rem', color: '#1aac83', marginBottom: '8px' }}>{exp.purpose}</h4>
      <p style={{ fontSize: '1rem', color: '#555' }}>
        <strong>Amount:</strong> {exp.amount}
      </p>
      <p style={{ fontSize: '0.9rem', color: '#777' }}>
        {formatDistanceToNow(new Date(exp.createdAt), { addSuffix: true })}
      </p>
      <button
        onClick={handleClick}
        style={{
          backgroundColor: 'red',
          color: 'white',
          padding: '8px 12px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '10px',
          fontSize: '1rem',
          width: '100%',
          maxWidth: '200px',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'block',
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default ExpDetails;
