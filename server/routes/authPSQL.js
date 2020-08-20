const express = require("express")
const passport = require('passport')
const router = express.Router()

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt")
const bcryptSalt = 10

// DB structure/model:
// id, username, email, password

// ALWAYS export it this way though:
// _id, username, email
// this is what the frontend is expecting

const { Client } = require('pg');
const configs = {
  connectionString: process.env.DATABASE_URL,
  ssl: false,
}

router.post('/signup', async (req,res,next)=>{
  try{
    const { username, password, email } = req.body
    if (!username || !password) {
      res.status(400).json({ message: "Indicate username and password" })
      return
    }

    const client = new Client(configs);
    client.connect();
  
    const userDuplicate = await client.query('SELECT id WHERE username=$1',[username])
    if (userDuplicate.rows&&userDuplicate.rows.length>0) {
      res.status(409).json({ message: "The username already exists" })
      client.end();
      return
    }
    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(password, salt)
    const newUser = await client.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username,email,hashPass])
    const findUsersByUsername = await client.query('SELECT id AS _id, username, password, email FROM users WHERE username=$1',[ username ])
    if(!findUsersByUsername || !findUsersByUsername.rows || !findUsersByUsername.rows.length===1) {
      client.end();
      next(new Error("Something went wrong"))
    }

    // LOG IN THIS USER
    // "req.logIn()" is a Passport method that calls "serializeUser()"
    // (that saves the USER ID in the session)
    req.logIn(findUsersByUsername.rows[0], () => {
      // hide "encryptedPassword" before sending the JSON (it's a security risk)
      findUsersByUsername.rows[0].password = undefined;
      client.end();
      res.json( findUsersByUsername.rows[0] );
    });
  } catch(err){
      client.end();
      next(err)
  }
})

router.post('/login', async (req,res,next)=>{
  try{
    const { username, password } = req.body
    const client = new Client(configs);
    client.connect();
  
    // first check to see if there's a document with that username
    const findUsersByUsername = await client.query('SELECT id AS _id, username, password, email FROM users WHERE username=$1',[ username ])
    // "findUsersByUsername" will be empty if the username is wrong (no document in database)
    if (!findUsersByUsername.rows || !findUsersByUsername.rows.length===1) {
      // create an error object to send to our error handler with "next()"
      next(new Error("Incorrect username "))
      client.end();
      return
    }
    const userDoc = findUsersByUsername.rows[0]

    // second check the password
    // "compareSync()" will return false if the "password" is wrong
    if (!bcrypt.compareSync(password, userDoc.password)) {
      // create an error object to send to our error handler with "next()"
      next(new Error("Password is wrong"))
      client.end();
      return
    }

    // LOG IN THIS USER
    // "req.logIn()" is a Passport method that calls "serializeUser()"
    // (that saves the USER ID in the session)
    req.logIn(userDoc, () => {
      // hide "encryptedPassword" before sending the JSON (it's a security risk)
      userDoc.password = undefined
      client.end();
      res.json(userDoc)
    })
  } catch(err){
      client.end();
      next(err)
  }
})

router.post('/login-with-passport-local-strategy', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong' })
      return
    }

    if (!theUser) {
      res.status(401).json(failureDetails)
      return
    }

    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong' })
        return
      }

      // We are now logged in (notice req.user)
      res.json(req.user)
    })
  })(req, res, next)
})

router.get("/logout", (req, res) => {
  req.logout()
  res.json({ message: 'You are out!' })
})

module.exports = router
