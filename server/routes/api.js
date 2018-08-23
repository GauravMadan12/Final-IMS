const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Regis = require('../models/register')
const bcrypt =require('bcrypt')
const config = require('../config/database')
const passport = require('passport')
const jwt = require('jsonwebtoken')
var http = require('http')

var urlencoded = bodyParser.urlencoded({extended:true})

mongoose.Promise = global.Promise

mongoose.connect(config.database,function(err){
    if(err){
        console.error("Error!"+err)
    }
})


// Save data
router.post('/alldata',function(req,res,next){
    console.log("Post a register data")
    var newRegis = new Regis()
    newRegis.fname = req.body.fname;
    newRegis.lname = req.body.lname;
    newRegis.email = req.body.email;
    newRegis.password  = req.body.password;
    newRegis.phone = req.body.phone;
    newRegis.save(function(err,insertedData){
        if(err){
            console.log("Error saving data")
        }
        else{
            res.json(insertedData)
            window.alert("User Registered")
        }
    })
})

// Authenticate 
    router.post('/authenticate',(req,res) =>{
        const email = req.body.email;
        const password = req.body.password;
        Regis.findOne({email:email},(err,user)=>{
            if(err) {console.log(err)}
            if(!user){
                return res.json({success:false, msg:"User not found"})
            }
            else
            {
             bcrypt.compare(password,user.password,(err,isMatch)=>{
                if(err) {console.log(err)}
                if(isMatch)
                {
                    const token = jwt.sign(user.toJSON(),config.secret,{
                        expiresIn:608400
                    })

                        res.json({
                        success:true,
                        token:'JWT'+token,
                        user:{
                            id:user._id,
                            name:user.fname,
                            email:user.email
                        }
                    })
                    }else
                    {
                      return res.json({success:false,msg:"Wrong Password"})
                     }
                })
           }
        })
    })
      
// Profile
router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    res.json({user:req.user})
}) 
module.exports = router;