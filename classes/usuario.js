class Usuario{

    constructor(){
        this.personas = []
    }

    agregarPersona(id, user){
        let persona = {
            id,
            user
        }

        this.personas.push(persona)

        return this.personas
    }

    //Obtener usuario único por client.id
    getPersona(id){
        let persona = this.personas.filter(pers => {
            return pers.id === id
        })[0] //-> para obtener el primero solamente

        return persona
    }

    //Obtener listado completo de personas
    getPersonas(){
        console.log('THIS.PERSONAS: ', this.personas)
        return this.personas
    }


    getPersonaPorSala(sala){
        return
    }

    //Borrar persona por client.id
    borrarPersona(id){
        console.log(id)
        //Obtenemos la persona por cilient.id y luego filtramos para eliminarla
        let personaBorrada = this.getPersona(id)
        console.log("PersonaBorrada: ", personaBorrada)
        this.personas = this.personas.filter(pers =>{
            return pers.id !== id
        })

        console.log("THIS.PERS: ", this.personas)

        return personaBorrada
    }

}

module.exports = {
    Usuario
}