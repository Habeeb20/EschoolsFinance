require('dotenv').config();
const express = require('express')
const app = express()
const mongoose = require("mongoose")
const { connectDb } = require('./dataBase/dbconnect')
connectDb()
const path = require('path')
const cors = require('cors')
const PORT = process.env.PORT || 4000;




const {logEvents, loggers} = require('./middleware/logger')
const workout = require('./route/workout')
const userWorkout = require('./route/user')
const corsOptions = require('./config/corsOptions')

// const __dirname = path.resolve()




// app.use(cors(corsOptions))


app.use(express.json())
app.use(cors())

app.use(express.static('public'))

app.use("/api/workout", workout)
app.use("/api/user", userWorkout)



app.use(express.static(path.join(__dirname, '/client/dist')))


app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})






mongoose.connection.once('open', () => {
    console.log("connected")
    app.listen(PORT, () => console.log(`server is listening on port ${PORT}`))
})


