const mongose = require('mongoose')

const User = mongose.model("User",{
    name:String,
    email:String,
    password:String
})



module.exports = User