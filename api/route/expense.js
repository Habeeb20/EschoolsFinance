const express = require("express");
const exprouter = express.Router()
const expController = require('../controller/expController')
const requireAuth = require("../middleware/requireAuth")

exprouter.use(requireAuth)


exprouter.get('/exp', expController.getAllExpenses)
exprouter.get('/exp/:id', expController.getExpenditure)
exprouter.post('/exp', expController.createExpenditure)
exprouter.delete('/exp/:id', expController.deleteExpenses)
exprouter.patch('exp/:id', expController.updateExpenses)


module.exports = exprouter