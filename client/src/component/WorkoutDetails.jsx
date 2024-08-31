





















// import React from 'react';
// import { useWorkoutContext } from '../hooks/useWorkoutContext';
// import formatDistanceToNow from 'date-fns/formatDistanceToNow';
// import { useAuthContext } from '../hooks/useAuthContext';

// const WorkoutDetails = ({ workout, onDelete }) => {
//     const { dispatch } = useWorkoutContext();
//     const { user } = useAuthContext();

//     const handleClick = async () => {
//         if (!user) {
//             return;
//         }
//         const response = await fetch('http://localhost:4000/api/workout/' + workout._id, {
//             method: 'DELETE',
//             headers: {
//                 'Authorization': `Bearer ${user.token}`
//             }
//         });
//         const json = await response.json();

//         if (response.ok) {
//             onDelete(workout); // Call the onDelete function passed from the parent
//         }
//     };

//     return (
//         <div className='workout-details'>
//             <h4>{workout.title}</h4>
//             <p><strong>Amount:</strong> {workout.loads}</p>
//             <p><strong>Purpose:</strong> {workout.reps}</p>
//             <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
//             <button style={{backgroundColor:"red", color: "white"}} onClick={handleClick}>Delete</button>
//         </div>
//     );
// };

// export default WorkoutDetails;










import React from 'react';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutDetails = ({ workout, onDelete }) => {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch('http://localhost:4000/api/workout/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      onDelete(workout); // Call the onDelete function passed from the parent
    }
  };

  return (
    <div
      className='workout-details'
      style={{
        backgroundColor: '#f0f0f0',
        padding: '15px',
        margin: '10px 0',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h4 style={{ fontSize: '1.4rem', color: '#1aac83', marginBottom: '10px' }}>{workout.title}</h4>
      <p style={{ fontSize: '1rem', color: '#555', marginBottom: '5px' }}>
        <strong>Amount:</strong> {workout.loads}
      </p>
      <p style={{ fontSize: '1rem', color: '#555', marginBottom: '5px' }}>
        <strong>Purpose:</strong> {workout.reps}
      </p>
      <p style={{ fontSize: '0.9rem', color: '#777' }}>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <button
        onClick={handleClick}
        style={{
          backgroundColor: 'red',
          color: 'white',
          padding: '10px 15px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '10px',
          fontSize: '1rem',
          width: '100%',
          maxWidth: '150px',
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

export default WorkoutDetails;
