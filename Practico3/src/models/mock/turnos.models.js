const Turno = require('./../mock/entities/turnos.entity.js');

class TurnosModel {
    constructor() {
        this.data = [];
        this.data.push(new Turno("2023-10-01T10:00:00Z", 1,"Consulta general", "activo", 1));
        this.id = 2;
    }

    create (turno) {
    return new Promise((resolve, reject) => {
        turno.id = this.id;
        this.id++;
        this.data.push(turno);
        resolve(turno);
    });
    }

    update(id, turno) {
        return new Promise((resolve, reject) => {
            try {
                const numeroId = parseInt(id, 10);
                if (isNaN(numeroId)) {
                    throw new Error("El id no es un numero");
                }

                const turnoEncontrado = this.data.find((t) => t.id === numeroId);
                if(turno === null) {
                    throw new Error ("No se encuentra el turno");
                }
                if(turno.fecha !== undefined) turnoEncontrado.fecha = turno.fecha;
                if(turno.pacienteId !== undefined) turnoEncontrado.pacienteId = turno.pacienteId;
                if(turno.motivo !== undefined) turnoEncontrado.motivo = turno.motivo;
                if(turno.estado !== undefined) turnoEncontrado.estado = turno.estado;
                resolve(turnoEncontrado);
            } catch (error) {
                console.log(error.message);
            }
        });
        
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            const numeroId = parseInt(id,10);
            if (isNaN(numeroId)){
                return reject(new Error("El id no es un numero"));
            }
            const turnoEncontrado = this.data.find((t) => t.id == numeroId);
            if(!turnoEncontrado) {
                return reject(new Error("El id ${numeroId} no fue encontrado"));
            }
            if(turnoEncontrado.estado === "cancelado") {
                return reject(new Error("El turno con id ${numeroId} ya fue cancelado"));
            }
            turnoEncontrado.estado = "cancelado";
            resolve({message: "Turno cancelado exitosamente"});
        });
    }

    list() {
        return new Promise((resolve, reject) => {
            resolve(this.data);
        });
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            const numeroId = parseInt(id, 10);
            if (isNaN(numeroId)) {
                return reject(new Error("El id no es un numero"));
            }
            const turnoEncontrado = this.data.find(t => t.id === numeroId);
            if (!turnoEncontrado) {
                return reject(new Error(`Turno con id ${numeroId} no encontrado`));
            }
            resolve(turnoEncontrado);
        });
    }

    findByPacienteId(pacienteId){
        return new Promise((resolve, reject) => {
            const turnosPaciente = this.data.filter(t => t.pacienteId === parseInt(pacienteId,10));
            if(turnosPaciente.length > 0) {
                resolve(turnosPaciente);
            }else{
                resolve([]);
            }
        })
    }
}

module.exports = new TurnosModel;