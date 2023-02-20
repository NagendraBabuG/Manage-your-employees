const express = require('express')
const router = express.Router()

router.use(express.json())
const Employee = require('../db/firebaseUtil')

router.get('/', async (req, res)=> {
    const employeeId = req.body.id;
    
})
