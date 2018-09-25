const express = require('express')
const path    = require('path')
let app = express()


app.get('/me', (req,res)=>{
    if(req.isAuthenticated()){
        res.sendFile(path.join(__dirname, '../public', 'canvas.html'));
    }else{
        res.redirect('/')
    }

})

module.exports = app