

// import { useState, useEffect } from 'react';
// import WorkoutDetails from '../component/WorkoutDetails';
// import Workoutform from '../component/Workoutform';
// import { useWorkoutContext } from '../hooks/useWorkoutContext';
// import { useAuthContext } from '../hooks/useAuthContext';
// import { Link } from 'react-router-dom';

// const Home = () => {
//     const { workout, dispatch } = useWorkoutContext();
//     const { user } = useAuthContext();

//     useEffect(() => {
//         const fetchWorkouts = async () => {
//             if (!user) return; // Ensure user is available before making the API call

//             try {
//                 const response = await fetch('http://localhost:4000/api/workout', {
//                     headers: {
//                         'Authorization': `Bearer ${user.token}`
//                     }
//                 });

//                 // Check if response is okay
//                 if (response.ok) {
//                     const json = await response.json();

//                     // Check if the response data is an array
//                     if (Array.isArray(json)) {
//                         dispatch({ type: 'set_workout', payload: json });
//                     } else {
//                         console.error('Unexpected data format received from the server:', json);
//                     }
//                 } else {
//                     console.error('Failed to fetch workouts:', response.statusText);
//                 }
//             } catch (error) {
//                 console.error('Error fetching workouts:', error);
//             }
//         };

//         fetchWorkouts();

//     }, [dispatch, user]);

//     return (
//         <div className="home">
//             <div className="workout">
//                 {Array.isArray(workout) && workout.map((workout) => (
//                     <WorkoutDetails key={workout._id} workout={workout} />
//                 ))}
//             </div>
//             <Workoutform />
//             <Link to='/exp'><button>add expenses</button></Link>
//         </div>
     
//     );
// };

// export default Home;





























import { useState, useEffect } from 'react';
import WorkoutDetails from '../component/WorkoutDetails';
import Workoutform from '../component/Workoutform';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';


const Home = () => {
    const { workout, dispatch } = useWorkoutContext();
    const { user } = useAuthContext();
    const [totalAmount, setTotalAmount] = useState(0);
    const [balance, setBalance] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [summary, setSummary] = useState({})

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
                        calculateTotalAndBalance(json); // Calculate total and balance
                    } else {
                        console.error('Unexpected data format received from the server:', json);
                    }
                } else {
                    console.error('Failed to fetch workouts:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching workouts:', error);
            }

            try {
                const summary = await fetch('http://localhost:4000/api/summary', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                setSummary(summary.data)
            } catch (error) {
                
            }
        };

        fetchWorkouts();

    }, [dispatch, user]);

    const calculateTotalAndBalance = (workouts) => {
        const total = workouts.reduce((acc, workout) => acc + workout.loads, 0);
        setTotalAmount(total);
        setBalance(total); // Assuming balance is initially the total amount
    };

    const handleDelete = (deletedWorkout) => {
        dispatch({ type: 'delete_workout', payload: deletedWorkout });
        setTotalAmount((prevTotal) => prevTotal - deletedWorkout.loads);
        setBalance((prevBalance) => prevBalance - deletedWorkout.loads);
    };

       // Ensure workout is an array before calling filter
    //  const filteredWorkouts = Array.isArray(workout) ? workout.filter(workout =>
    //      (workout.name ? workout.name.toLowerCase().includes(searchQuery.toLowerCase()) : false) ||
    //      (workout.amount ? workout.amount.toString().includes(searchQuery) : false) ||
    //      (workout.purpose ? workout.purpose.toLowerCase().includes(searchQuery.toLowerCase()) : false)
    //  ) : [];


    return (
        <div className="home">
            {/* <p>{summary.totalAmountPaid}</p> */}
            <div className="workout">
                {Array.isArray(workout) && workout.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} onDelete={handleDelete} />
                ))}
            </div>
            {/* <div>
                <h4>Total Amount: {totalAmount}</h4>
                <h4>Balance: {balance}</h4>
            </div> */}
            <Workoutform />
            <Link to='/exp'><button>add expenses</button></Link>
        </div>
    );
};

export default Home;














