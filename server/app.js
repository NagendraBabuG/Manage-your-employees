const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
//const middleware = require('./middleware/index.js')
const admin = require('./config/firebase-config')
const AdminRole = require('./models/admin')
const app = express();
const PORT = process.env.port || 5000;
const CONNECTION_URL = 'mongodb+srv://nagendra:1234@cluster0.fucrlal.mongodb.net/?retryWrites=true&w=majority'
app.use(cors());
app.use(express.json())


app.use('/api/admin', require('./routes/admin'))
app.get('/',(req,res) => {
   // console.log(req);
    res.send('Hello World');
})
//signup
app.post('/createAdmin', async(req, res) => {
    console.log(req.body)
    const useremail = req.body.email, username = req.body.name, password = req.body.password
    
    const session = await mongoose.startSession();
    session.startTransaction();
    let userAdded = undefined
    
    try{
        // make it like transaction
        // still u didn't add employee details for authentication
        userAdded = await admin.auth().createUser(
            {
                email: useremail,
                displayName: username,
                password: password
            }, {session})
        
        const adminCreated = await AdminRole.create({
                name : username,
                email: useremail,
               // employees:[]
            })
        console.log(adminCreated)
        await session.commitTransaction();
        console.log(userAdded)
        res.status(200).json({status : 'success', data : userAdded})
        
    }
    catch(error)
    {
        if(error.code == 'auth/email-already-exists') return res.status(400).json({status : 'email already exits'})
        // If an error occurs during the transaction, delete the user in Firebase Authentication
        if(userAdded) await admin.auth().deleteUser(userAdded.uid);
        await session.abortTransaction();
        console.error('Transaction aborted:', error);
      
        res.status(400).json({status : "error in connected Database"})   
    }

})
mongoose.set('strictQuery', false)
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on Port : ${PORT}`)
    })
}).catch((error) => console.log(error.message))