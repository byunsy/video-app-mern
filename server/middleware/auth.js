const { User } = require("../models/User");

let auth = (req, res, next) => { 

    // Attain token from client cookie
    let token = req.cookies.x_auth;

    // Decode token and find corresponding user
    User.findByToken(token, (err, user) => {
        if(err) {
            throw err;
        }
        if(!user) {
            return res.json({
                isAuth: false,
                error: true
            })
        }
        req.token = token; 
        req.user = user;
        next()
    })
}

module.exports = { auth }