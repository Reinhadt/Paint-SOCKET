const {io} = require('../index')
const passport = require('passport');
const {Usuario} =  require('../classes/usuario')

const usuario =  new Usuario()
let usuarioDes

passport.deserializeUser(function(user, done) {
    usuarioDes = user
    done(null, user);

});

io.on('connect', (client)=>{
    //console.log(user)

    //Escuchar evento que viene del front
    client.on('dibujar', (data, callback) =>{
        //console.log(data)

        //Emitir a todos los usuarios
        client.broadcast.emit('dibujar', data)
        //callback(data)

    })


    client.on('conectado', (data, callback)=>{

        let p = usuario.agregarPersona(client.id, usuarioDes)
        io.sockets.emit('listaPersonas', usuario.getPersonas())
        callback(usuario.getPersonas())
    })

    client.on('disconnect', ()=>{
        console.log("Desconectado")
        let personaBorrada = usuario.borrarPersona(client.id)

        io.sockets.emit('crearMensaje', {usuario: 'Administrador', mensaje: `${personaBorrada} abandonó el chat`})
        io.sockets.emit('listaPersonas', usuario.getPersonas())
    })

    client.on('borrar', (data, callback)=>{
        //Emitir a todos los usuarios
        io.sockets.emit('borrar', data)
        //callback('borrado')
    })
})
