const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const regSchema = new Schema({
    createdby:String,
    name:String,
    email:{
        type:String,
      
    },
    phone:Number
})

module.exports = mongoose.model('contact',regSchema,'addcontact');