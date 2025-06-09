const Identificador = require("./identificador.entity");

class Turno extends Identificador{
    
    constructor(fecha,pacienteId,motivo,estado,id=0){
       super(id);
       this.fecha = fecha;
       this.pacienteId = pacienteId;
       this.motivo= motivo;
       this.estado = estado;
    }
}
module.exports = Turno;