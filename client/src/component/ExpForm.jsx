import React from 'react'
import { useState } from 'react'
import { useExpContext } from '../hooks/useExpContext'
import { useAuthContext } from '../hooks/useAuthContext'
const ExpForm = () => {
    const {dispatch} = useExpContext()
    const {user} = useAuthContext()


    const [purpose, setPurpose] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState(null);
    const [emptyField, setEmptyField] = useState([])

    const handleSubmit= async(e) => {
        e.preventDefault()

        if(!user){
            setError('you must be logged in')
            return
        }

        const exp = {purpose, amount}

        const response = await fetch('http://localhost:4000/api/exp', {
            method:'POST',
            body:JSON.stringify(exp),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token }`
            }
        })
        const  json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyField(json.emptyField)
        }

        if(response.ok){
            setPurpose('')
            setAmount('')
            setError(null)
            setEmptyField([])
            console.log("new expenditure added")
            dispatch({type: 'create_exp', payload:json})
        }
    }
  return (
    <>
    <form className="create" onSubmit={handleSubmit} action="">
        <h3>add expenditure</h3>
        <label htmlFor="">Purpose</label>
      <input
        type="text"
        onChange={(e) => setPurpose(e.target.value)}
        value={purpose}
        className={emptyField?.includes('purpose') ? 'error' : ''}
      />

<label htmlFor="">Amount:</label>
      <input
        type="number"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
        className={emptyField?.includes('amount') ? 'error' : ''}
      />
      <button>Add expenses</button>
      {error && <div className="error">{error}</div>}

    </form>
      
    </>
  )
}

export default ExpForm
