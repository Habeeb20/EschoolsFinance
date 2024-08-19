import React, { useState, useEffect } from 'react';
import ExpDetails from '../component/ExpDetails';
import { useExpContext } from '../hooks/useExpContext';
import { useAuthContext } from '../hooks/useAuthContext';

const ExpList = () => {
    const { exp, dispatch } = useExpContext();
    const { user } = useAuthContext();
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        // Calculate the total amount whenever the `exp` list changes
        if (Array.isArray(exp)) {
            const total = exp.reduce((acc, expense) => acc + expense.amount, 0);
            setTotalAmount(total);
        }
    }, [exp]);

    return (
        <div>
            <h2>Total Expenditure: {totalAmount}</h2>
            {Array.isArray(exp) && exp.map((expense) => (
                <ExpDetails key={expense._id} exp={expense} />
            ))}
        </div>
    );
};

export default ExpList;
