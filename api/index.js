const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/User')
const bcrypt = require('bcryptjs')
const app = express()

const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

// for bcrypt
const salt = bcrypt.genSaltSync(15)

// for jwt
const secret_key = 'Th1s 1s a secret key!!!'

app.use(cors({credentials: true, origin:'http://localhost:5173'}))
app.use(express.json())
app.use(cookieParser())

// connect to mongoose
mongoose.connect('mongodb+srv://blog:aNC7tOyyR7gb4Oyz@cluster0.7egz8nm.mongodb.net/?retryWrites=true&w=majority')

app.post('/register', async (req, res) => {
    const {username, password} = req.body.formData
    try {
        const userDoc = await User.create({
            username, 
            password: bcrypt.hashSync(password, salt)
        })
        res.json(userDoc)
    } catch(e) {
        res.status(400).json(e)
    }
})

app.post('/login', async (req, res) => {
    const {username, password} = req.body.formData
    const userDoc = await User.findOne({username})
    const passwordMatch = bcrypt.compareSync(password, userDoc.password)
    if (passwordMatch) {
        // logged in
        jwt.sign({username, id:userDoc._id}, secret_key, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json('ok')
        })
    } else {
       res.status(400).json('Incorrect Password.') 
    }
})

app.get('/profile', (req, res) => {
    const {token} = req.cookies
    jwt.verify(token, secret_key, {}, (err, info) => {
        if (err) throw err;
        res.json(info)
    })
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok')
})

app.listen(5000)

// mongo user: blog
// mongo pass: aNC7tOyyR7gb4Oyz
// connection: mongodb+srv://blog:aNC7tOyyR7gb4Oyz@cluster0.7egz8nm.mongodb.net/?retryWrites=true&w=majority