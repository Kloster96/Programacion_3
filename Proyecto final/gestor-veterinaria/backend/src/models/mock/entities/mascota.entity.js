const identificador = require('./identificador.entity');

class Mascota extends identificador{
    constructor(id=0, nombre, especie, raza, fechaNacimiento, duenoId, observaciones){
        super(id);
        this.nombre = nombre;
        this.especie = especie;
        this.raza = raza;
        this.fechaNacimiento = fechaNacimiento;
        this.duenoId = duenoId; // ID del dueño
        this.observaciones = observaciones; // Observaciones sobre la mascota
    }
}
module.exports = Mascota;