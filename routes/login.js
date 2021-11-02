const express = require('express')
const router = express.Router()
const Login = require('../models/loginModel')
const mongoose = require('mongoose')

//get user by email|pass
router.post('/', (req, res) => {
    //console.log(req.body.email, req.body.password)
    Login.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({ status: "Failed", message: "Invalid email" })
            } //console.log(req.body.password, user[0].password)
            if (req.body.password == user[0].password) {
                return res.status(200).json({ status: "Success", message: "Valid credentials" })
            } else {
                return res.status(401).json({ status: "Failed", message: "Invalid Password" })
            }
        })
        .catch(err => {
            res.status(500).json({
                status: "Failed",
                message: "Failed to verify credentials",
                error: err
            })
        })
})

//add user
router.post('/add', async (req, res) => {
    const log = new Login({
        _id: new mongoose.Types.ObjectId,
        email: req.body.email,
        password: req.body.password
    })
    log.save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                newLogin: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})
//login all
router.get('/all', async (req, res) => {
    Login.find()
        .then(result => {
            res.status(200).json({
                loginData: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router