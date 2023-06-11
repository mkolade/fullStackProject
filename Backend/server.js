//npm init -y to create package.json file
//npm i express to install express app
/* 
    To make it so one can use 'npm run dev' to start nodemon, (which inturn acts like a live-server for nodejs to the best of my understanding) go to the package.json file and add it as a SCRIPT 
*/
/* 
    Remember to add .env file to gitignore when pushing to github so as to protect sensitive data 
*/

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./api/routes/workoutRoutes');
const userRoutes = require('./api/routes/userRoutes')

const cors = require('cors')

//create express app
const app = express();


app.get('/', (req, res) => {
    res.send('Server is up and running');
  });
  


//middlewares
app.use(express.json())


app.use(cors());
app.use((req,res,next)=>{
    console.log(req.method,req.path)
    next()
})


//react to request i.e route handlers
app.use('/api/workouts',workoutRoutes)
app.use('/api/user',userRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        //listen for request
        app.listen(process.env.PORT,()=>{
            console.log('Listening on port',process.env.PORT)
        })
    })
    .catch((err) =>{
        console.log(err)
    })




