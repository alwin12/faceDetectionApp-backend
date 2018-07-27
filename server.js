// for database
// npm install knex   to connect database to server
// npm install pg


const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const knex = require('knex');  // an aql querry builder helps us to structure sql querries into functions
const bcrypt = require('bcrypt')
const app = express();




const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1', // local host
    user : 'newuser',
    password : '',
    database : 'smart-brain'
  }
});

const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');



app.use(bodyParser.json());

app.use(cors());






    app.get('/',(req,res)=> {

 	  res.send(database.users);
    })

    app.post('/signin',signin.handleSignin(db,bcrypt))

    app.post('/register', (req,res)=> {register.handleRegister(req,res,db,bcrypt)})

    app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req,res,db)})

    app.put('/image', (req,res) => {image.handleImage(req,res,db)});
    
    app.post('/imageUrl', (req,res)=> {image.handleApiCall(req,res)});



   // PORT=3000 node server.js 
   // type this up in the console to create and set the PORT Variable to what u want
const PORT = process.env.PORT
app.listen(PORT|| 3000,()=>{


	console.log(`App is running on port ${PORT}`);
})