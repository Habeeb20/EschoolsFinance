import { useState, useEffect } from "react";
import ExpDetails from "../component/ExpDetails";
import ExpForm from "../component/ExpForm";
import { useExpContext } from "../hooks/useExpContext";
import { useAuthContext } from "../hooks/useAuthContext";

import React from 'react'
import ExpList from "../component/ExpList";

const ExpHome = () => {
    const {exp, dispatch} = useExpContext();
    const {user} = useAuthContext();

    useEffect(() => {
        const fetchExps = async() => {
            if(!user) return;

            try {
                const response = await fetch('http://localhost:4000/api/exp', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                if (response.ok) {
                    const json = await response.json();

                    if (Array.isArray(json)) {
                        dispatch({ type: 'set_exp', payload: json });
                    } else {
                        console.error('Unexpected data format received from the server:', json);
                    }

                }else {
                    console.error('Failed to fetch expenses:', response.statusText);
                }
            } catch (error) {
                
            }
        };

        fetchExps()
    }, [dispatch, user])
  return (
    <>
    <div className="home">
        <div className="workout">
        {Array.isArray(exp) && exp.map((exp) => (
                    <ExpDetails key={exp._id} exp={exp} />
                ))}
        </div>
        <ExpForm />
      

    </div>
      
    </>
  )
}

export default ExpHome
