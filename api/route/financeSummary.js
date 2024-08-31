const express = require("express")
const income = require('../models/models')
const expense = require('../models/expmodel')
const summaryrouter = express.Router()
const requireAuth = require('../middleware/requireAuth')

summaryrouter.use(requireAuth)

summaryrouter.get('/summary', async(req, res) => {
    const {id} = req.params
    try {
        const student = await income.find({userId: req.userId})
        const expenditure = await expense.find({userId: req.userId})

        const totalAmountPaid = student.reduce((sum, stud)=> sum + stud.reps, 0);
        const totalExpenditure = expenditure.reduce((sum, exp) => sum + exp.amount, 0);
        const balance = totalAmountPaid - totalExpenditure;
        const numberOfStudentPaid = student.filter(stud => stud.reps > 0).length;
        const totalOutstanding = student.reduce((sum, stud) => sum + (stud.reps === 0 ? stud.reps:0), 0);
        
        res.status(200).json({
            totalAmountPaid,
            totalExpenditure,
            balance,
            numberOfStudentPaid,
            totalOutstanding
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})


module.exports= summaryrouter;