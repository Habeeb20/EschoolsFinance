// import React from 'react'
// import { useWorkoutContext } from '../hooks/useWorkoutContext'
// import formatDistanceToNow  from 'date-fns/formatDistanceToNow'
// import { useAuthContext } from '../hooks/useAuthContext'

// const WorkoutDetails = ({workout}) => {
//   const {dispatch} = useWorkoutContext()
//   const {user} = useAuthContext()
  
//   const handleClick = async () => {
//     if(!user){
//       return
//     }
//     const response = await fetch('http://localhost:4000/api/workout/' + workout._id, {
//       method: 'DELETE',
//       headers: {
//         'Authorization': `Bearer ${user.token}`
//       }
//     })
//     const json = await response.json()

//     if(response.ok){
//       dispatch({type: 'delete_workout', payload: json})


//     }
//   }
  
//   return (
//     <div className='workout-details'>
//         <h4>{workout.title}</h4>
//         <p><strong>Amount:</strong>{workout.loads}</p>
//         <p><strong>Purpose:</strong>{workout.reps}</p>
//         <p>{formatDistanceToNow(new Date(workout.createdAt),{addSuffix: true}) }</p>
//         <button><span onClick={handleClick}>delete</span></button>
      
//     </div>
//   )
// }

// export default WorkoutDetails






































// import React, { useEffect, useState } from 'react';
// import { useWorkoutContext } from '../hooks/useWorkoutContext';
// import formatDistanceToNow from 'date-fns/formatDistanceToNow';
// import { useAuthContext } from '../hooks/useAuthContext';

// const WorkoutDetails = ({ workout }) => {
//   const { dispatch } = useWorkoutContext();
//   const { user } = useAuthContext();
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [balance, setBalance] = useState(0);

//   const calculateTotalAndBalance = (workouts) => {
//     const total = workouts.reduce((acc, workout) => acc + workout.loads, 0);
//     setTotalAmount(total);
//     setBalance(total); // Assuming balance is initially the total amount
//   };

//   useEffect(() => {
//     const fetchWorkouts = async () => {
//       const response = await fetch('http://localhost:4000/api/workout', {
//         headers: {
//           'Authorization': `Bearer ${user.token}`
//         }
//       });
//       const json = await response.json();
//       if (response.ok) {
//         dispatch({ type: 'set_workout', payload: json });
//         calculateTotalAndBalance(json);
//       }
//     };

//     if (user) {
//       fetchWorkouts();
//     }
//   }, [dispatch, user]);

//   const handleClick = async () => {
//     if (!user) {
//       return;
//     }
//     const response = await fetch('http://localhost:4000/api/workout/' + workout._id, {
//       method: 'DELETE',
//       headers: {
//         'Authorization': `Bearer ${user.token}`
//       }
//     });
//     const json = await response.json();

//     if (response.ok) {
//       dispatch({ type: 'delete_workout', payload: json });
//       calculateTotalAndBalance(json); // Update total and balance after deletion
//     }
//   };

//   return (
//     <div className="workout-details">
//       <h4>{workout.title}</h4>
//       <p><strong>Amount:</strong> {workout.loads}</p>
//       <p><strong>Purpose:</strong> {workout.reps}</p>
//       <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
//       <button onClick={handleClick}>Delete</button>
//       {/* <div>
//         <h4>Total Amount: {totalAmount}</h4>
//         <h4>Balance: {balance}</h4>
//       </div> */}
//     </div>
//   );
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
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();

        if (response.ok) {
            onDelete(workout); // Call the onDelete function passed from the parent
        }
    };

    return (
        <div className='workout-details'>
            <h4>{workout.title}</h4>
            <p><strong>Amount:</strong> {workout.loads}</p>
            <p><strong>Purpose:</strong> {workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <button style={{backgroundColor:"red", color: "white"}} onClick={handleClick}>Delete</button>
        </div>
    );
};

export default WorkoutDetails;
