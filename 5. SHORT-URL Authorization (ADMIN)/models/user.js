const mongoose = require("mongoose");

const userScema = mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    emial: {
        type: String,
        required : true,
        unique: true,
    },
    role: {
        type: String,
        required : true,
        default: "NORMAL",
    },
    password:{
        type: String,
        required: true,

    }
}, {timestamps: true})

const User = mongoose.model("users", userScema)

module.exports = User