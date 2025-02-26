const express = require("express")
const cors = require("cors")
const mongo = require('mongoose')
const action=require('./mongodb')
mongo.connect("mongodb://localhost:27017/government")
const app = express()
app.use(cors())
app.use(express.json())

app.post('/register', async(req, res) => {
    const results = await action.register(req.body,req.query.type)
    res.send(results)
})

app.get('/login', async(req, res) => {
    const results = await action.login(req.query.fields)
    console.log(req.query)
    res.send(results)
})

app.post('/file', async (req, res) => {
    const results = await action.fileComplain(req.body)
    res.send(results)
})

app.listen(4000,()=>{console.log("Running on port:4000")})