const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const regSchema = new Schema({
    fname:String,
    lname:String,
    email:String,
    password:String,
    phone:Number,
    saltSecret:String
})

const Regis = module.exports = mongoose.model('register',regSchema);


// GetUserById
module.exports.getUserById = function(id,callback){
    Regis.findById(id,callback);
}

module.exports.getUserByUsername = function(email,callback){
    const query = {email:email}
    Regis.findOne(query,callback)
}

// Events
regSchema.pre('save', function(next){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(this.password,salt,(err,hash)=>{
            this.password = hash;
            this.saltSecret = salt;
            next();
        })
    })
})

module.exports.comparePassword = function(candidatePassword,hash,callback){
    bcrypt.compare(candidatePassword,hash,(err,isMatch)=>{
        if(err) throw err;
        callback(null,isMatch)
    })
}

