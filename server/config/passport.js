const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const Regis = require('../models/register')
const config = require('../config/database')

module.exports = function(passport){
    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
    opts.secretOrKey = config.secret
    passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
        console.log(jwt_payload);
        Regis.getUserById(jwt_payload.data._id, (err,regis)=>{
            if(err){
                return done(err,false)
            }
            if(regis){
                return done(null,regis)
            }else{
                return done(null,false)
            }
        })

        console.log(jwt_payload)
    }))
}