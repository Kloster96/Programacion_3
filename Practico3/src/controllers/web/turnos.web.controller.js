const turnoModel = require('../../models/mock/turnos.models.js');
const pacienteModel = require('../../models/mock/pacientes.models.js');
const turno = require('../../models/mock/entities/turnos.entity.js');

class TurnosWebController {
    async listTurnos(req, res) {
        try {
            const turnos = await turnoModel.list();
            res.render('turnos/list', { turnos: turnos, title: 'Listado de turnos' });
        } catch (error) {
            console.error('Error al listar turnos:', error);
            res.status(500).render('error', { message: 'Error al listar turnos' });
        }
    }

    async showNuevoTurnoForm(req, res) {
        try {
            const pacientes = await pacienteModel.list();
            res.render('turnos/new', { title: 'Registrar nuevo turno', pacientes: pacientes });
        } catch (error) {
            console.error('Error al cargar formulario de nuevo turno:', error);
            res.status(500).render('error', { message: 'Error al cargar formulario de nuevo turno' });
        }
    }

    async crearTurno(req, res) {
        const { fecha, pacienteId, motivo, estado } = req.body;
        const numericoPacienteId = parseInt(pacienteId, 10);
        if (isNaN(numericoPacienteId) || !fecha || !motivo) {
            return res.status(400).render('error', { message: 'Datos insuficientes para crear turno' });
        }
        const nuevoTurno = new turno(fecha, numericoPacienteId, motivo, estado, null);
        try {
            await turnoModel.create(nuevoTurno);
            res.redirect('/turnos');
        } catch (error) {
            console.error('Error al crear turno:', error);
            res.status(500).render('error', { message: 'Error al crear turno' });
        }
    }

    async showEditarTurnoForm(req, res) {
        const idTurno = req.params.idTurno;
        const numericoIdTurno = parseInt(idTurno, 10);

        if (isNaN(numericoIdTurno)) {
            return res.status(400).render('error', { message: 'ID de turno inválido. No es un número' });
        }

        try {
            const turnoExistente = await turnoModel.findById(numericoIdTurno);
            if (!turnoExistente) {
                return res.status(404).render('error', { message: 'Turno no encontrado' });
            }

            const pacientes = await pacienteModel.list();
            res.render('turnos/edit', {
                turno: turnoExistente,
                pacientes: pacientes,
                title: 'Editar Turno'
            });
        } catch (error) {
            console.error('Error al cargar formulario de edición de turno:', error);
            let codigoError = 500;
            if (error.message.includes('Turno no encontrado')) {
                codigoError = 404;
            }
            return res.status(codigoError).render('error', { message: error.message });
        }
    }

    async editarTurno(req, res) {
        const idTurno = req.params.idTurno;
        const numericoIdTurno = parseInt(idTurno, 10);
        if (isNaN(numericoIdTurno)) {
            return res.status(400).render('error', { message: 'ID de turno inválido' });
        }

        const { fecha, pacienteId, motivo, estado } = req.body;
        const numericoPacienteId = parseInt(pacienteId, 10);
        if (isNaN(numericoPacienteId) || !fecha || !motivo) {
            return res.status(400).render('error', { message: 'Datos insuficientes para editar turno' });
        }

        try {
            const datosActualizados = {
                fecha: fecha,
                pacienteId: numericoPacienteId,
                motivo: motivo,
                estado: estado
            };

            const actualizado = await turnoModel.update(numericoIdTurno, datosActualizados);
            if (!actualizado) {
                return res.status(404).render('error', { message: 'Turno no encontrado' });
            }
            res.redirect('/turnos?mensaje=Turno editado exitosamente');
        } catch (error) {
            console.error('Error al editar turno:', error);
            let codigoError = 500;
            if (error.message.includes('Turno no encontrado')) {
                codigoError = 404;
            }
            return res.status(codigoError).render('error', { message: error.message });
        }
    }

    async cancelarTurno(req, res) {
        const idTurno = req.params.idTurno;
        const numericoIdTurno = parseInt(idTurno, 10);
        if (isNaN(numericoIdTurno)) {
            return res.status(400).render('error', { message: 'ID de turno inválido' });
        }
        try {
            await turnoModel.delete(numericoIdTurno);
            res.redirect('/turnos?mensaje=Turno cancelado exitosamente');
        } catch (error) {
            console.error('Error al cancelar turno:', error);
            let codigoError = 500;
            if (error.message.includes('Turno no encontrado')) {
                codigoError = 404;
            } else if (error.message.includes('Turno ya cancelado')) {
                codigoError = 400;
            }
            res.status(codigoError).render('error', { message: error.message });
        }
    }
}

module.exports = new TurnosWebController();
