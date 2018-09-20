const {io} = require('../index')

io.on('connect', (client)=>{
    console.log('conectado')

    //Escuchar evento que viene del front
    client.on('dibujar', (data, callback) =>{
        //console.log(data)

        //Emitir a todos los usuarios
        client.broadcast.emit('dibujar', data)
        //callback(data)

    })

    client.on('borrar', (data, callback)=>{
        //Emitir a todos los usuarios
        io.sockets.emit('borrar')
    })
})