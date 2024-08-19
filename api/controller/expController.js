const {default: mongoose} = require('mongoose')
const Exp = require('../models/expmodel')


const createExpenditure = async(req, res) => {
    const {purpose, amount} = req.body

    let emptyField = []

    if(!purpose){
        emptyField.push('purpose')
    }

    if(!amount){
        emptyField.push('amount')
    }

    if(emptyField.length > 0){
        return res.status(400).json({error: "please fill in all fields", emptyField})
    }


    try{
        const user_id = req.user._id
        const exp = await Exp.create({purpose, amount, user_id})
        res.status(200).json(exp)
    } 
    catch (error){
        console.log(error)
        res.status(400).json({error: error.message})

    }

}

const getExpenditure = async(req, res) => {
    try {
        const {id} = req.params

        const exp = await Exp.findById(id)
        if(!mongoose.Types.ObjectId.isValid){
            res.status(404).json({error: "no such expense"})
        }

        if(!exp){
            res.status(404).json({error: "no such details"})
        }

        res.status(200).json(exp)
    } catch (error) {
        
    }
}

const getAllExpenses = async (req, res) => {
    try {
        const user_id = req.user._id
        const exp = await Exp.find({ user_id}).sort({createdAt: -1})
        res.status(200).json(exp)
    } catch (error) {
        
    }
}

const deleteExpenses = async (req, res) => {
    try {
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid){
            res.status(404).json({error: "error"})
        }
        const expense = await Exp.findByIdAndDelete({_id:id})

        if(!expense){
            res.status(400).json({message: "message error"})
        }

        res.status(200).json(expense)
        
    } catch (error) {
        console.log(error)
        
    }
}

const updateExpenses= async (req, res) => {
    try {
        const {id } = req.params
        if(!mongoose.Types.ObjectId.isValid){
            res.status(404).json({error: "error"})
        }
        const expense = await Exp.findByIdAndUpdate({_id:id}, {
            ...req.body
        })
        if(!expense){
            res.status(400).json({message: "no such expense"})
        }

        res.status(200).json(expense)


    } catch (error) {
        
    }
}


module.exports = {
    createExpenditure,
    getAllExpenses,
    getExpenditure,
    deleteExpenses,
    updateExpenses
}



