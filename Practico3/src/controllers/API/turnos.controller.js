const TurnosModel = require('./../../models/mock/turnos.models.js');
const Turno = require('./../../models/mock/entities/turnos.entity.js');

class TurnosController {
    async list(req, res) {
        res.status(200).json(await TurnosModel.list());
    }
    async create(req, res) {
        const { fecha,pacienteId,motivo,estado} = req.body;
        const nuevoTurno = new Turno(fecha,pacienteId,motivo,estado);
        const info = await TurnosModel.create(nuevoTurno);
        res.status(200).json(info);
    }
    delete (req,res) {
        const id = req.params.id;
        TurnosModel.delete(id);
        res.status(200).json({message :"Elemento eliminado"});
    }
    update (req,res) {
        const id = req.params.id;
        const { fecha,pacienteId,motivo,estado} = req.body;
        const nuevoTurno = new Turno(fecha,pacienteId,motivo,estado);
        TurnosModel.update(id,nuevoTurno);
        res.status(200).json({message:"Actualizado"});
    }
    async findByPacienteId(req, res) {
        const pacienteId = parseInt(req.params.pacienteId);
        try{
            const turnos = await TurnosModel.findByPacienteId(pacienteId);
            if(turnos.length === 0) {
                return res.status(404).json({message: "No se encontraron turnos para el paciente con ID:" + pacienteId});
            }
            res.status(200).json(turnos);
            
        }catch (error) {
            console.log("Error en turnos.controller.js: " + error.message);
            res.status(500).json({message: "Error al buscar turnos por paciente ID: ",
            error:error.message});
        }
    }

} 
module.exports = new TurnosController();