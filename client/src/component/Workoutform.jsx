import React from "react";
import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Workoutform = () => {
  const { dispatch } = useWorkoutContext()
  const {user} = useAuthContext()


  const [title, setTitle] = useState("");
  const [loads, setLoads] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyField, setEmptyField] = useState([])

  const handleSubmit = async(e) => {
    e.preventDefault()

    if(!user){
      setError('You must be logged in')
      return
    }

    const workout = {title, loads, reps}

    const response = await fetch('http://localhost:4000/api/workout', {
        method:'POST',
        body: JSON.stringify(workout),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token }`
        }
    })
    const json = await response.json()

    if(!response.ok){
        setError(json.error)
        setEmptyField(json.emptyField)

    }
    if(response.ok){
        setTitle('')
        setLoads('')
        setReps('')
        setError(null)
        setEmptyField([])
        console.log("new workout added")
        dispatch({type: 'create_workout', payload: json})
    }
  }


  return (
    <form className="create" onSubmit={handleSubmit} action="">
      <h3>Add a new Income details</h3>

      <label htmlFor="">Name</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyField?.includes('title') ? 'error' : ''}
      />

      <label htmlFor="">Amount:</label>
      <input
        type="number"
        onChange={(e) => setLoads(e.target.value)}
        value={loads}
        className={emptyField?.includes('loads') ? 'error' : ''}
      />

      <label htmlFor="">Purpose</label>
      <input
        type="text"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyField?.includes('reps') ? 'error' : ''}
      />

      <button>Add details</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Workoutform;
