const User = require("../models/user")
const { v4: uuidv4 } = require('uuid');

const { setUser} = require("../services/auth")

async function handleUserSignup(req, res){
    const {name, emial, password} = req.body;
    await User.create({
        name,
        emial,
        password,

    });
    return res.redirect("/"); 
}


async function handleUserLogin(req, res){
    const {email, password} = req.body; 

    const user = await User.findOne({email, password});
    if(!user) {
        return res.render("login", {
            error: "Inavid username or password"
        })
    }
  
    const token = setUser(user);
    // res.cookie('uid', token)

    return res.json({ token })
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}

