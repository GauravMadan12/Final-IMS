const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport')
const cors = require('cors')
const api = require('./server/routes/api');

const port = 3000;

const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname,'dist/ims')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Passport
app.use(passport.initialize())
app.use(passport.session())

require('./server/config/passport')(passport);
app.use('/api',api);

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/ims/index.html'))
});

app.listen(port,function(){
    console.log("Server running on localhost:" + port)
});

