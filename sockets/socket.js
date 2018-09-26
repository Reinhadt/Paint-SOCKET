const {io} = require('../index')
const passport = require('passport');
const {Usuario} =  require('../classes/usuario')

const usuario =  new Usuario()

passport.deserializeUser(function(user, done) {
    done(null, user);
});

io.on('connect', (client)=>{
    //console.log(user)
    console.log("Socket.request: ", client.request.session.passport.user)

    let usuarioDes = client.request.session.passport.user

    //Escuchar evento que viene del front
    client.on('dibujar', (data, callback) =>{
        //console.log(data)

        //Emitir a todos los usuarios
        client.broadcast.emit('dibujar', data)
        //callback(data)

    })


    client.on('conectado', (data, callback)=>{

        let p = usuario.agregarPersona(client.id, usuarioDes)
        client.broadcast.emit('listaPersonas', usuario.getPersonas())
        client.emit('listaPersonas', usuario.getPersonas())
        callback(usuario.getPersonas())
    })

    client.on('disconnect', ()=>{
        console.log("Desconectado")
        let personaBorrada = usuario.borrarPersona(client.id)

        client.broadcast.emit('crearMensaje', {usuario: 'Administrador', mensaje: `${personaBorrada.user.nombre} abandonó el chat`})
        client.broadcast.emit('listaPersonas', usuario.getPersonas())
        client.emit('listaPersonas', usuario.getPersonas())
    })

    client.on('borrar', (data, callback)=>{
        //Emitir a todos los usuarios
        client.broadcast.emit('borrar', data)
        //callback('borrado')
    })
})
