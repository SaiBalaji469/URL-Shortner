const jwt = require("jsonwebtoken");
const secret = "Balaji@469"

function setUser(user){
    return jwt.sign(
        {
        _id: user._id,
        email: user.emial, 
        },
        secret
    );
}

function getUser(token){
    if(!token) return null;
    return jwt.verify(token, secret);
}

module.exports = {
    setUser,
    getUser,
}


