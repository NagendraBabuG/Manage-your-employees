const express = require("express")
const mongoose = require('mongoose')
const AdminRole = require("../models/admin")
const Employee = require("../models/employee")
const admin = require('../config/firebase-config')
const middleware = require('../middleware/index')


const router = express.Router()

router.use(middleware)

router.get('/', async (req, res)=> {
    res.status(200).json({status : "it's working!!!"})
})


router.post('/addEmployee', async (req, res) => {
    const adminEmail = req.body.adminEmail
    const username = req.body.name, password = req.body.password, contact = req.body.contact, doj = req.body.doj
    const role = req.body.role
    const Deparment = req.body.Department, email = req.body.email
    //const firebaseTransaction =  firebaseAdmin.database().ref().transaction();
    if(!adminEmail || !username || !role || !password || !contact || !doj || !Deparment || !email) return res.status(400).json({status: "missing details"})
    const session = await mongoose.startSession();
    session.startTransaction();
    let userAdded = undefined
    
    try{
        // make it like transaction
        // still u didn't add employee details for authentication
        userAdded = await admin.auth().createUser(
            {
                email: email,
                role: "employee",
                displayName: username,
                password: password}, {session})
        
    const findAdmin = await AdminRole.findOne({email : adminEmail});
    if(!findAdmin) return res.status(400).json({status : 'error cannot find admin'});
    console.log(findAdmin)
    console.log(findAdmin._id, 'admin id');
    const employeeAdded = await Employee.create({
        name : username, 
        email : email, 
        department : Deparment,
        role : role,
        contact: contact,
        dateOfJoin: doj,
        adminId : findAdmin._id
    })
    console.log('employe Added ', employeeAdded)
    const db = admin.firestore()
    const userRef = db.collection('employees').doc(userAdded.uid);

    // Create the user document with some initial data
    await userRef.set({
    
      email: email,
      displayName:username,
      role: 'employee',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      // Add any 
    })
    const UpdatedAdmin = await AdminRole.updateOne({email : adminEmail}, {$push : {employees : employeeAdded._id}});
    
    console.log(UpdatedAdmin)
    //const userAdded = await createUser(username, email, password)
    await session.commitTransaction();
    console.log('Transaction committed successfully.');
    res.status(200).json({status: "successfully Added Employee"})
    }
    catch(error)
    {
        console.log(error)
        if(error.code == 'auth/email-already-exists') return res.status(400).json({status : 'email already exits'})
          // If an error occurs during the transaction, delete the user in Firebase Authentication
        if(userAdded) await admin.auth().deleteUser(userAdded.uid);
        await session.abortTransaction();
        console.error('Transaction aborted:', error);
        
        res.status(400).json({status : "error in connected Database"})
    }

})

router.get('/myEmployees', async (req, res) => {
  //  console.log(req.body)
    const adminEmail = req.body.email
    try{
        const adminObject = await AdminRole.findOne({email : adminEmail})
        console.log(adminObject)
        if(!adminObject) return res.status(400).json({status : 'admin email is not present in database'}) 
        const adminId = adminObject._id
        const employees = await Employee.find({adminId : adminId})
        console.log(employees)
        res.status(200).json({status : "success", data: employees})

    }
    catch(error)
    {
        console.log(error)
        res.status(400).json({status : "error" , error : error})
    }
})
/*
on signup user should get replies popup and then should get redirected login page


*/

router.put('/editMyName', async (req, res) => {
    const email = req.body.email, username = req.body.name
    try{
        const UpdatedAdmin = await AdminRole.updateOne({email : email}, {name : username});
        if(!UpdatedAdmin) return res.status(400).json({status : 'failed', error : 'cannot perfom the operation'})
        res.status(200).json({status : 'success', data : UpdatedAdmin})
    }
    catch(error)
    {
        res.status(400).json({status : 'failed', error : error})
    }
})
router.put('/editMyContact', async(req, res) => {
    const contact = req.body.contact, useremail = req.body.email
    try{
        const UpdatedAdmin = await AdminRole.updateOne({email : useremail}, {conatct : contact})
        if(!UpdatedAdmin) return res.status(400).json({status : 'failed', error : 'cannot perfom the operation'})
        res.status(200).json({status : 'success', data : UpdatedAdmin})
    }
    catch(error)
    {
        res.status(400).json({status : 'failed', error : error})

    }
})

router.get('/getDetails', async(req, res) => {
    const employeeEmail = req.body.employeeEmail
    if(!employeeEmail) res.status(400).json({status : 'failed', data : "missing data"})
    try{
        const employee = await Employee.findOne({email : employeeEmail})
        if(!employee) res.status(400).json({status : 'failed', data : "user not found"})
        res.status(200).json({status : "success", data: employee})
    }
    catch(error)
    {
        console.log(error)
        res.status(400).json({status : "error" , error : error})
    }
})
router.get('/myDetails', async (req, res) => {
    const email = req.body.email
    if(!email) res.status(400).json({status : 'failed', data : "missing data"})
    try{
        const adminObject = await AdminRole.findOne({email : email})
        if(!adminObject) res.status(400).json({status : 'failed', data : "user not found"})
        res.status(200).json({status : "success", data: adminObject})
    }
    catch(error)
    {
        console.log(error)
        res.status(400).json({status : "error" , error : error})
    }
})
module.exports = router