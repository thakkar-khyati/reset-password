const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/reset-password")

module.exports = mongoose