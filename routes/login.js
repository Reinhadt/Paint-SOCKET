require('../config/config')

const express = require('express')
const passport = require('passport');
const path = require('path')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const Usuario = require('../models/usuario')

let app = express()


passport.use(new GoogleStrategy({
    clientID: '257544919474-7ufm6605pj6p1op02dft535lk9jshcbf.apps.googleusercontent.com',
    clientSecret: '2p8GXZWnxI5Z6RHlscMe2P56',
    callbackURL: process.env.CALLBACK
  },
  function(accessToken, refreshToken, profile, done) {
       Usuario.findOne({email: profile.emails[0].value}, function(err, user){
           if(err){
               return done(err)
           }
           if(!user){
               console.log("Perfil: ", profile)
               user = new Usuario({
                   nombre: profile.displayName,
                    email:  profile.emails[0].value,
                    img: profile.photos[0].value
               })

               user.save(function(err){
                   if(err) console.log(err)
                   return done(err, user)
               })

           }
           else{
               return done(err, user)
           }
       })
  }
));

app.get('/login', (req,res)=>{
    res.sendFile(path.join(__dirname, '../public', 'login.html'));
})

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'] }));


app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/me');
  });

passport.serializeUser(function(user, done) {
    done(null, user);
});



module.exports = app