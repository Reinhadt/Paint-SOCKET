const mongoose = require('mongoose')
//para validar valores duplicados o no válidos y mandar errores amistosos
const uniqueValidator = require('mongoose-unique-validator')

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es obligatorio']
    },
    img: {
        type: String,
        required: false
    }
})

usuarioSchema.plugin(uniqueValidator, {message: '{PATH} debe de ser único'})

module. exports =  mongoose.model('Usuario', usuarioSchema)