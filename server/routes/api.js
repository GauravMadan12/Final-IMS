const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Regis = require('../models/register')
const Contact = require('../models/contact')
const bcrypt =require('bcrypt')
const config = require('../config/database')
const passport = require('passport')
const jwt = require('jsonwebtoken')
var http = require('http')
const nodemailer = require('nodemailer');

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
            // window.alert("User Registered")
        }
    })
})

// Authenticate
router.post('/authenticate',(req,res,next) =>{
    const email = req.body.email;
    const password =req.body.password;

    Regis.getUserByUsername(email,(err,user)=>{
        if(err) throw err;
        if(!user){
            return res.json({success:false,msg:"User not found"})
        }
     
    Regis.comparePassword(password,user.password,(err,isMatch)=>{
        if(err) throw err;
        if(isMatch){
            const token = jwt.sign({data:user},config.secret,{
                expiresIn:604800
            })
            res.json({
                success:true,
                token:"JWT "+token,
                user:{
                    id:user._id,
                    name:user.fname,
                    email:user.email
                }
            })
        }else{
            return res.json({success:false,msg:"Wrong Password"})
        }
    })    
    })
})
      
// Profile
router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    res.json({user:req.user})
}) 

// Save contact
router.post('/data',function(req,res){
    console.log("Add contacts to DB")
    var newContact = new Contact()
    newContact.createdby = req.body.createdby;
    newContact.name = req.body.name;
    newContact.email = req.body.email;
    newContact.phone = req.body.phone;
    newContact.save(function(err,insertedData){
        if(err){
            console.log("Error saving data")
        }
        else{
            res.json(insertedData)
        }
    })
})

// Sending Mails
router.post('/mails',(req,res)=>{
    const output = `<h3>Messgae:</h3>
        <p>${req.body.message}</p>
    `
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: 'gmadan046@gmail.com', // generated ethereal user
            pass: '#######' // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"GM Productions" <gmadan046@gmail.com>', // sender address
        to: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line
        text: 'Hello world?', // plain text body
        html:  output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('mail',{msg:'Email has been sent'})
    });
});

// const data = localStorage.getItem('name')
// Get all contacts
router.post('/usercontact',function(req,res){
    console.log("Get req for all contacts")
    
    Contact.find({createdby:req.body.user})
    .exec(function(err,videos){
        if(err){
        console.log("Error retrieving data")
    }
    else{
        res.json(videos)
    }
    })
})


 // Sending Group Emails
 router.post('/gpmails',(req,res)=>{
    var data =  req.body.value;

    data.forEach(element => {
        
    
  const output = `<h3>Message:</h3>
      <p>${req.body.data}</p>
  `
  let transporter = nodemailer.createTransport({
      service:'gmail',
      auth: {
          user: 'gmadan046@gmail.com', // generated ethereal user
          pass: '######' // generated ethereal password
      },
      tls:{
          rejectUnauthorized:false
      }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"GM Productions" <gmadan046@gmail.com>', // sender address
      to: element, // list of receivers
      subject: req.body.sub, // Subject line
      text: 'Hello world?', // plain text body
      html:  output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      // res.render('mail',{msg:'Email has been sent'})
  });
  });
});

module.exports = router;