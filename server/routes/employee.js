const express = require('express')
const router = express.Router()
const employee = require('../models/employee')
const task = require('../models/tasks')
router.use(express.json())
const Employee = require('../db/firebaseUtil')

router.get('/', async (req, res)=> {
    const employeeId = req.body.id;
    
})
 router.post('/createTask', async(req, res) => {
    
 })