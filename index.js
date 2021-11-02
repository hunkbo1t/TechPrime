//imports
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')
//quick config
const port = process.env.PORT || 3000
dotenv.config()
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
//database 
mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database Connected'))
    .catch(err => console.log('Connection Failed', err));
//  ROUTES
const projectRoutes = require('./routes/project')
const loginRoutes = require('./routes/login')
// middleware
app.use('/project', projectRoutes)
app.use('/login', loginRoutes)
app.use(morgan('dev'))
//default
app.get('/', (req, res) => {
    res.json({ status: "Server OK", message:"Server is online"})
})
app.use((req, res) => {
    res.status(400).json({ error: "Bad Request" })
})
//server
app.listen(port, { useNewUrlParser: true }, (err) => {
    if (err) throw err
    console.log(`Connected at ${port}`)
})