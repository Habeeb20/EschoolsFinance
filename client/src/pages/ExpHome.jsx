import { useState, useEffect } from "react";
import ExpDetails from "../component/ExpDetails";
import ExpForm from "../component/ExpForm";
import { useExpContext } from "../hooks/useExpContext";
import { useAuthContext } from "../hooks/useAuthContext";

import React from 'react'
import ExpList from "../component/ExpList";

const ExpHome = () => {
    const { exp, dispatch } = useExpContext();
    const { user } = useAuthContext();
    const [totalExpenditure, setTotalExpenditure] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [balance, setBalance] = useState(0);


    useEffect(() => {
        const fetchExps = async () => {
            if (!user) return;

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

                } else {
                    console.error('Failed to fetch expenses:', response.statusText);
                }
                const totalResponse = await fetch('http://localhost:4000/api/summary', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const totalResponse1 = await fetch('http://localhost:4000/api/summary', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const totalResponse2 = await fetch('http://localhost:4000/api/summary', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const totalExpenditureJson = await totalResponse.json();
                setTotalExpenditure(totalExpenditureJson.totalExpenditure);

                // const totalAmountPaidStudent = await totalResponse1.json();
                // setTotalIncome(totalAmountPaidStudent.totalAmountPaid)

                // const amountbalance = await totalResponse2.json();
                // setBalance(amountbalance.balance)

            } catch (error) {

            }
        };

        fetchExps()
    }, [dispatch, user])

    const containerStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px',
        paddingTop: '1px',
        margin: '0 auto',
        maxWidth: '1200px',
    };

    const workoutStyles = {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const gridContainerStyles = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        padding: '20px',
        marginTop: '20px',
        width: '100%',
    };

    const gridItemStyles = {
        padding: '20px',
     
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        textAlign: 'center',
        fontFamily: 'Poppins, sans-serif',
        color: '#333',
        transition: 'transform 0.3s ease-in-out',
    };

    const headingStyles = {
        fontSize: '1.5rem',
        marginBottom: '10px',
        color: '#1aac83',
    };




    return (
        <>
                <div className="home" style={containerStyles}>
                    <div style={gridContainerStyles}>
                        <div style={gridItemStyles}>
                            <h2 style={headingStyles}>Total Expenditure</h2>
                            <p>#{totalExpenditure.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            <div className="home">
        
                <div className="workout">
                    {Array.isArray(exp) && exp.map((exp) => (
                        <ExpDetails key={exp._id} exp={exp} />
                    ))}
                </div>
                <ExpForm />
               
                <div>
                    {/* <h2>Total Expenditure: ${totalExpenditure.totalAmountPaid}</h2>
                <h2>Total Expenditure: ${totalExpenditure.totalExpenditure}</h2>
                <h2>Total Income: ${totalIncome.toFixed(2)}</h2>
                <h2>Balance: ${balance.toFixed(2)}</h2> */}
                </div>


            </div>

        </>
    )
}

export default ExpHome



// import { useState, useEffect } from "react";
// import ExpDetails from "../component/ExpDetails";
// import ExpForm from "../component/ExpForm";
// import { useExpContext } from "../hooks/useExpContext";
// import { useAuthContext } from "../hooks/useAuthContext";
// import React from 'react';

// const ExpHome = () => {
//     const { exp, dispatch } = useExpContext();
//     const { user } = useAuthContext();
//     const [totalExpenditure, setTotalExpenditure] = useState(0);
//     const [totalIncome, setTotalIncome] = useState(0);
//     const [balance, setBalance] = useState(0);

//     useEffect(() => {
//         const fetchExps = async () => {
//             if (!user) return;

//             try {
//                 const response = await fetch('http://localhost:4000/api/exp', {
//                     headers: {
//                         'Authorization': `Bearer ${user.token}`
//                     }
//                 });

//                 if (response.ok) {
//                     const json = await response.json();

//                     if (Array.isArray(json)) {
//                         dispatch({ type: 'set_exp', payload: json });
//                     } else {
//                         console.error('Unexpected data format received from the server:', json);
//                     }

//                 } else {
//                     console.error('Failed to fetch expenses:', response.statusText);
//                 }

//                 const totalResponse = await fetch('http://localhost:4000/api/summary', {
//                     headers: {
//                         'Authorization': `Bearer ${user.token}`
//                     }
//                 });
//                 const totalExpenditureJson = await totalResponse.json();
//                 setTotalExpenditure(totalExpenditureJson.totalExpenditure);

//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchExps();
//     }, [dispatch, user]);

//     const containerStyles = {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         padding: '10px',
//         margin: '0 auto',
//         maxWidth: '1200px',
//     };

//     const workoutStyles = {
//         width: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//     };

//     const summaryStyles = {
//         width: '100%',
//         textAlign: 'center',
//         marginTop: '20px',
//         fontSize: '1.2rem',
//     };

//     const totalStyles = {
//         display: 'flex',
//         justifyContent: 'space-around',
//         width: '100%',
//         marginTop: '10px',
//         flexWrap: 'wrap',
//     };

//     const summaryItemStyles = {
//         padding: '10px',
//         margin: '10px',
//         backgroundColor: '#f4f4f4',
//         borderRadius: '5px',
//         width: '100%',
//         maxWidth: '250px',
//         textAlign: 'center',
//     };

//     return (
//         <>
//             <div className="home" style={containerStyles}>
//                 <div className="workout" style={workoutStyles}>
//                     {Array.isArray(exp) && exp.map((exp) => (
//                         <ExpDetails key={exp._id} exp={exp} />
//                     ))}
//                 </div>
//                 <ExpForm />
//                 <div style={summaryStyles}>
//                     <div style={totalStyles}>
//                         <div style={summaryItemStyles}>
//                             <h2>Total Expenditure: ${totalExpenditure.toFixed(2)}</h2>
//                         </div>
//                         <div style={summaryItemStyles}>
//                             <h2>Total Income: ${totalIncome.toFixed(2)}</h2>
//                         </div>
//                         <div style={summaryItemStyles}>
//                             <h2>Balance: ${balance.toFixed(2)}</h2>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default ExpHome;
