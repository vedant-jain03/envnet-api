const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name:{
        type: String,
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password :{
        required: true,
        type: String
    },
    cpassword :{
        required: true,
        type: String
    },
    Role: {
        required: true,
        type: String
    }
})

const UserModel = mongoose.model('ENV_USERS', User);
module.exports = UserModel;