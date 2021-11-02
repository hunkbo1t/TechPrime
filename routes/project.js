const express = require('express')
const router = express.Router()
const Project = require('../models/projectModel')
const mongoose = require('mongoose')
//get all
router.get('/', async (req, res) => {
    Project.find()
        .then(result => {
            res.status(200).json({
                projectData: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})
//add project
router.post('/add', async (req, res) => {
    const pro = new Project({
        _id: new mongoose.Types.ObjectId,
        projectName: req.body.projectName,
        reason: req.body.reason,
        type: req.body.type,
        division: req.body.division,
        category: req.body.category,
        priority: req.body.priority,
        department: req.body.department,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        location: req.body.location,
        status: req.body.status
    })
    pro.save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                status:"Object Created",
                message:"New Project Added",
                newProject: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message:"Error",
                error: err
            })
        })
})
//update status
router.put('/update/:id', (req, res) => {
    console.log(req.params.id)
    Project.findOneAndUpdate({ _id: req.params.id },
        { $set: { status: req.body.status } })
        .then(result => {
            res.status(200).json({ 
                status: "Success",
                message: "Updated Status", 
                newUpdate:result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message:"Error",
                error: err
            })
        })
})

//Status count
router.get('/count', (req, res) => {
    Project.aggregate([{
        $group:
        {
            _id:{status:"$status"},
            count:{$sum:1}
        }
    }
    ])
    .exec()    
    .then(result => {
            res.status(200).json({
                status: "Success",
                message: "Updated Status",
                count: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message:"Error, count fail",
                error: err
            })
        })
})

module.exports = router