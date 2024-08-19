// import { useState, useEffect } from 'react';
// import WorkoutDetails from '../component/WorkoutDetails';
// import Workoutform from '../component/Workoutform';
// import { useWorkoutContext } from '../hooks/useWorkoutContext';
// import { useAuthContext } from '../hooks/useAuthContext';




// const Home = () => {
//     const {workout, dispatch} = useWorkoutContext()
//     const {user} =useAuthContext()
//     // const [workout, setWorkout] = useState(null)

//     useEffect(() => {
//         const fetchWorkouts = async () => {
//             const response = await fetch('http://localhost:4000/api/workout', {
//                 headers:{
//                     'Authorization': `Bearer ${user.token }`
//                 }
//             })
//             const json = await response.json()

//             if(response.ok){
//                 dispatch({type: 'set_workout', payload:json})
//                 // setWorkout(json)

//             }

//         }
//         if (user) {
//             fetchWorkouts()

//         }
      

//     }, [dispatch, user])

//     return(
//         <div className="home">
//             <div className="workout">
//                 {workout && workout.map((workout)=> (
//                     <WorkoutDetails key={workout._id} workout={workout} />

//                 ))}
//             </div>
//             <Workoutform />
//         </div>
//     )
// }
// export default Home

import { useState, useEffect } from 'react';
import WorkoutDetails from '../component/WorkoutDetails';
import Workoutform from '../component/Workoutform';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {
    const { workout, dispatch } = useWorkoutContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchWorkouts = async () => {
            if (!user) return; // Ensure user is available before making the API call

            try {
                const response = await fetch('http://localhost:4000/api/workout', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                // Check if response is okay
                if (response.ok) {
                    const json = await response.json();

                    // Check if the response data is an array
                    if (Array.isArray(json)) {
                        dispatch({ type: 'set_workout', payload: json });
                    } else {
                        console.error('Unexpected data format received from the server:', json);
                    }
                } else {
                    console.error('Failed to fetch workouts:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching workouts:', error);
            }
        };

        fetchWorkouts();

    }, [dispatch, user]);

    return (
        <div className="home">
            <div className="workout">
                {Array.isArray(workout) && workout.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <Workoutform />
        </div>
    );
};

export default Home;
