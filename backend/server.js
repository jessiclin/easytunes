import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'


import userRouter from './routes/users.js'

const app = express()
app.use(express.json())
app.use(cors())

// Connect to MongoDB
const CONNECTION_URL = 'mongodb+srv://jessiclin:jessiclin@cluster0.qjshq.mongodb.net/EasyTunes?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000; 

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established')
})




// app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
