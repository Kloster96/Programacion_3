const identificador = require("./identificador.entity");

class Dueno extends identificador {
    constructor(id = 0, nombre,apellido, telefono, email,direccion){
        super(id);
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.email = email;
        this.direccion = direccion;
    }
}

module.exports = Dueno;