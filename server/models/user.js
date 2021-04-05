// Setup necessary variables and requirements
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

// Create a schema for users
const userSchema = mongoose.Schema({
    name: {
        type: String, 
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true,
        unique: 1,
    },
    password: {
        type: String, 
        minlength: 5,
    },
    lastname: {
        type: String, 
        maxlength: 50,
    },
    role: {
        type: Number,
        default: 0,
    },
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    },
    image: String,
})

// Encrypt password before saving in MongoDB
userSchema.pre('save', function(next){
    var user = this;
    if (user.isModified('password')) {
        // Use bcrypt
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    return next(err)
                }
                user.password = hash
                next()
            });
        });
    } else {
        next()
    }
})

// Method to compare passwords
userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}

// Method to generate token
userSchema.methods.generateToken = function(cb) { 
    var user = this;

    // Generate token using jsonwebtoken
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token
    user.save(function(err, user) {
        if(err) {
            return cb(err)
        }
        cb(null, user)  
    })
}

// Method to find user by token
userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    // Decode the attained token
    jwt.verify(token, 'secretToken', function(err, decoded) {

        // - find user by using user._id
        // - then check whether client-token and db-token match
        user.findOne({"_id": decoded, "token": token}, function(err, user) {
            if (err) {
                return cb(err)
            }
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }
