require('./config/config')


const express = require('express')
const path = require('path')
const socketIO = require('socket.io')
const mongoose   = require('mongoose')
const passport = require('passport');
const session = require("express-session")
const http = require('http')

const sessionMiddleware = require('./middlewares/sessionMiddleware')

let app = express()
let server = http.createServer(app)

//Llamo el express static antes de passport session !!importante
const publicPath = path.resolve(__dirname, './public');
const port = process.env.PORT || 3000
app.use(express.static(publicPath));

app.use(sessionMiddleware)

//Llamo passport session luego del static para que no sea instanciado muchas veces
//esto evita que deserializeUser sea llamado múltiples veces sin necesidad
app.use(session({secret: 'cats'}));
app.use(passport.initialize());
app.use(passport.session());


//io = comunicación directa y constante del backend
module.exports.io = socketIO(server).use((socket, next)=>{
    sessionMiddleware(socket.request, {}, next)
})

require('./sockets/socket')

app.use(require('./routes/index'))


mongoose.connect(process.env.URLDB, (err, res) =>{
    if(err) throw err;
    console.log('ROCANROLDB')
});

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});