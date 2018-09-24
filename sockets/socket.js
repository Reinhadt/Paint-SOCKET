const {io} = require('../index')
const passport = require('passport');
let usuariosArr = []

passport.deserializeUser(function(user, done) {

    io.on('connect', (client, usuario)=>{
        console.log(user)

        //Escuchar evento que viene del front
        client.on('dibujar', (data, callback) =>{
            //console.log(data)

            //Emitir a todos los usuarios
            client.broadcast.emit('dibujar', data)
            //callback(data)

        })

        usuariosArr = []

        client.on('disconnect', ()=>{
            delete usuariosArr
        })

        client.on('conectado', (data, callback)=>{

            usuariosArr.push(user)

            io.sockets.emit('conectado', usuariosArr)
            //callback()
        })


        client.on('borrar', (data, callback)=>{
            //Emitir a todos los usuarios
            io.sockets.emit('borrar')
        })
    })
    done(null, user);
});
