const pacientes = require('../../models/mock/pacientes.models.js');
const Paciente = require('../../models/mock/entities/paciente.entity.js');

class PacientesWebController {
    async listPacientes(req, res) {
        try {
            const pacientesLista = await pacientes.list();
            res.render('pacientes/list', { pacientes: pacientesLista, title: 'Listado de Pacientes' }); // 👈 corregido
        } catch (error) {
            console.error('Error al listar pacientes:', error);
            res.status(500).render('error', { message: 'Error al listar pacientes' });
        }
    }

    async showNuevoPacienteForm(req, res) {
        res.render('pacientes/new', { title: 'Registrar nuevo paciente' }); // 👈 corregido
    }

    async crearPaciente(req, res) {
        const { dni, nombre, apellido, email } = req.body;
        if (!dni || !nombre || !apellido || !email) {
            return res.status(400).render('error', { message: 'Datos insuficientes para crear paciente' });
        }
        const nuevoPaciente = new Paciente(dni, nombre, apellido, email, null);


        try {
            await pacientes.create(nuevoPaciente);
            res.redirect('/pacientes');
        } catch (error) {
            res.status(500).render('error', { message: 'Error al crear paciente' });
            console.error('Error al crear paciente:', error);
        }
    }

    async showEditarPacienteForm(req, res) {
        const idPaciente = req.params.idPaciente;
        const numericoIdPaciente = parseInt(idPaciente, 10);
        if (isNaN(numericoIdPaciente)) {
            return res.status(400).render('error', { message: 'ID de paciente inválido' });
        }
        try {
            const paciente = await pacientes.findById(numericoIdPaciente);
            res.render('pacientes/edit', { paciente: paciente, title: 'Editar Paciente' }); // 👈 corregido
        } catch (error) {
            console.error('Error al cargar formulario de edición de paciente:', error);
            let codigoError = 500;
            if (error.message.includes('Paciente no encontrado')) {
                codigoError = 404;
            }
            return res.status(codigoError).render('error', { message: error.message });
        }
    }

    async darBajaPaciente(req, res) {
        const idPaciente = req.params.idPaciente;
        const numericoIdPaciente = parseInt(idPaciente, 10);
        if (isNaN(numericoIdPaciente)) {
            return res.status(400).render('error', { message: 'ID de paciente inválido' });
        }
        try {
            const eliminado = await pacientes.delete(numericoIdPaciente);
            if (eliminado) {
                res.redirect('/pacientes?mensaje=Paciente%20eliminado%20correctamente');
            } else {
                return res.status(404).render('error', { message: `Paciente ${numericoIdPaciente} no encontrado` }); // 👈 corregido template string
            }
        } catch (error) {
            console.error('Error al dar de baja paciente:', error);
            let codigoError = 500;
            if (error.message.includes('Paciente no encontrado')) {
                codigoError = 404;
            }
            return res.status(codigoError).render('error', { message: error.message });
        }
    }

    async editarPaciente(req, res) {
        const idPaciente = req.params.idPaciente;
        const numericoIdPaciente = parseInt(idPaciente, 10);
        if (isNaN(numericoIdPaciente)) {
            return res.status(400).render('error', { message: 'ID de paciente inválido' });
        }
        const { dni, nombre, apellido, email } = req.body;
        if (!dni || !nombre || !apellido || !email) {
            return res.status(400).render('error', { message: 'Datos insuficientes para editar paciente' });
        }
        try {
            await pacientes.update(numericoIdPaciente, { dni, nombre, apellido, email });
            res.redirect('/pacientes');
        } catch (error) {
            console.error('Error al editar paciente:', error);
            let codigoError = 500;
            if (error.message.includes('Paciente no encontrado')) {
                codigoError = 404;
            }
            return res.status(codigoError).render('error', { message: error.message });
        }
    }
}

module.exports = new PacientesWebController();
