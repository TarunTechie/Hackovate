const mongo = require('mongoose')

const userSchema = new mongo.Schema({
    name: String,
    phone: String,
    email: String,
    password:String,
    address: {
        city: String,
        state: String,
        pincode: String,
        street:String
    },
    complains:Array
})

const officerSchema = new mongo.Schema({
    name: String,
    phone: String,
    email: String,
    office: String,
    password:String,
    address: {
        city: String,
        state: String,
        pincode: String,
        street:String
    },
    complains:Array
})

const complainsSchema = new mongo.Schema({
    letter: {
        subject:String,
        body:String
    },
    date: Date,
    officerId: String,
    userId: String,
    status:{type:String,default:"filed"}
})

const user = mongo.model('user', userSchema)
const officer = mongo.model('officers', officerSchema)
const complain = mongo.model('complain', complainsSchema)

module.exports={user,officer,complain}