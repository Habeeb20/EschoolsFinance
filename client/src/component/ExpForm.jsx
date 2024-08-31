// import React from 'react'
// import { useState } from 'react'
// import { useExpContext } from '../hooks/useExpContext'
// import { useAuthContext } from '../hooks/useAuthContext'
// const ExpForm = () => {
//     const {dispatch} = useExpContext()
//     const {user} = useAuthContext()


//     const [purpose, setPurpose] = useState("");
//     const [amount, setAmount] = useState("");
//     const [error, setError] = useState(null);
//     const [emptyField, setEmptyField] = useState([])

//     const handleSubmit= async(e) => {
//         e.preventDefault()

//         if(!user){
//             setError('you must be logged in')
//             return
//         }

//         const exp = {purpose, amount}

//         const response = await fetch('http://localhost:4000/api/exp', {
//             method:'POST',
//             body:JSON.stringify(exp),
//             headers:{
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${user.token }`
//             }
//         })
//         const  json = await response.json()

//         if(!response.ok){
//             setError(json.error)
//             setEmptyField(json.emptyField)
//         }

//         if(response.ok){
//             setPurpose('')
//             setAmount('')
//             setError(null)
//             setEmptyField([])
//             console.log("new expenditure added")
//             dispatch({type: 'create_exp', payload:json})
//         }
//     }
//   return (
//     <>
//     <form className="create" onSubmit={handleSubmit} action="">
//         <h3>add expenditure</h3>
//         <label htmlFor="">Purpose</label>
//       <input
//         type="text"
//         onChange={(e) => setPurpose(e.target.value)}
//         value={purpose}
//         className={emptyField?.includes('purpose') ? 'error' : ''}
//       />

// <label htmlFor="">Amount:</label>
//       <input
//         type="number"
//         onChange={(e) => setAmount(e.target.value)}
//         value={amount}
//         className={emptyField?.includes('amount') ? 'error' : ''}
//       />
//       <button>Add expenses</button>
//       {error && <div className="error">{error}</div>}

//     </form>
      
//     </>
//   )
// }

// export default ExpForm



import React, { useState } from 'react';
import { useExpContext } from '../hooks/useExpContext';
import { useAuthContext } from '../hooks/useAuthContext';

const ExpForm = () => {
  const { dispatch } = useExpContext();
  const { user } = useAuthContext();

  const [purpose, setPurpose] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(null);
  const [emptyField, setEmptyField] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    const exp = { purpose, amount };

    const response = await fetch('http://localhost:4000/api/exp', {
      method: 'POST',
      body: JSON.stringify(exp),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyField(json.emptyField);
    }

    if (response.ok) {
      setPurpose('');
      setAmount('');
      setError(null);
      setEmptyField([]);
      console.log('New expenditure added');
      dispatch({ type: 'create_exp', payload: json });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: '#f9f9f9',
        padding: '20px',
        margin: '20px auto',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '100%',
        width: '100%',
        fontFamily: 'Arial, sans-serif',
        boxSizing: 'border-box',
      }}
    >
      <h3
        style={{
          fontSize: '1.5rem',
          color: '#333',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        Add Expenditure
      </h3>

      <label
        style={{
          display: 'block',
          marginBottom: '10px',
          fontSize: '1rem',
          color: '#555',
        }}
      >
        Purpose
      </label>
      <input
        type="text"
        onChange={(e) => setPurpose(e.target.value)}
        value={purpose}
        className={emptyField?.includes('purpose') ? 'error' : ''}
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '10px',
          borderRadius: '4px',
          border: emptyField?.includes('purpose') ? '1px solid red' : '1px solid #ccc',
          fontSize: '1rem',
          boxSizing: 'border-box',
        }}
      />

      <label
        style={{
          display: 'block',
          marginBottom: '10px',
          fontSize: '1rem',
          color: '#555',
        }}
      >
        Amount
      </label>
      <input
        type="number"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
        className={emptyField?.includes('amount') ? 'error' : ''}
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '10px',
          borderRadius: '4px',
          border: emptyField?.includes('amount') ? '1px solid red' : '1px solid #ccc',
          fontSize: '1rem',
          boxSizing: 'border-box',
        }}
      />

      <button
        type="submit"
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1rem',
          marginTop: '10px',
        }}
      >
        Add Expenses
      </button>

      {error && (
        <div
          style={{
            marginTop: '10px',
            padding: '10px',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            borderRadius: '4px',
            textAlign: 'center',
            fontSize: '0.9rem',
          }}
        >
          {error}
        </div>
      )}
    </form>
  );
};

export default ExpForm;
