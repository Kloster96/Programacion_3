const duenoModel = require('../../models/dueno.model');
class DuenoWebController {
    async list(req,res) {
        try {
            const duenos = await duenoModel.list();
            res.render('duenos/list', { title: 'Lista de Dueños', duenos: duenos });
        } catch (error) {
            console.error('Error al listar dueños:', error);
            res.status(500).render('error', { message: 'Error al listar dueños' });
        }
    }
    async createForm(req, res) {
        try{
            res.render('duenos/new', { 
                title: 'Registrar nuevo dueño',
                error: null,
                dueno: {} 
            });
        } catch (error) {
            console.error('Error al mostrar formulario de creación de dueño:', error);
            res.status(500).render('error', { message: 'Error al mostrar formulario de creación de dueño' });
        }
    }
    async create(req, res) {
        const { nombre, apellido, telefono, email, direccion } = req.body;
        if (!nombre || !apellido || !telefono || !email || !direccion) {
            return res.status(400).render('duenos/new',{
                title: 'Registrar nuevo dueño',
                error: 'Todos los campos son obligatorios',
                dueno: req.body
            });
        }
        try {
            const nuevoDueno = { nombre, apellido, telefono, email, direccion };
            await duenoModel.create(nuevoDueno);
            res.redirect('/duenos');
        } catch (error) {
            console.error('Error al crear dueño:', error);
            res.status(500).render('duenos/new', {
                title: 'Regitrar Nuevo Dueño', 
                error: 'Error al crear dueño'+error.message, 
                dueno:req.body });
        }
    }
    async editForm(req, res) {
        const idDueno = parseInt(req.params.id,10);
        if (isNaN(idDueno)) {
            return res.status(400).render('error', { message: 'ID de dueño inválido' });
        }
        try {
            const dueno = await duenoModel.findById(idDueno);
            if (!dueno) {
                return res.status(404).render('error', { message: `Dueño con ID ${idDueno} no encontrado` });
            }
            res.render('duenos/edit', {
                title: `Editar Dueño ${dueno.id} - ${dueno.nombre} ${dueno.apellido}`,
                dueno: dueno,
                error: null 
            });
        } catch (error) {
            console.error('Error al cargar formulario de edición de dueño:', error);
            let codigoError = 500;
            if (error.message.includes('Dueño no encontrado')) {
                codigoError = 404;
            }
            return res.status(codigoError).render('error', { message: error.message });
        }
    }
    async update(req, res) {
        const idDueno = parseInt(req.params.id);
        if (isNaN(idDueno)) {
            return res.status(400).render('error', { message: 'ID de dueño inválido' });
        }
        const { nombre, apellido, telefono, email, direccion } = req.body;
        if (!nombre || !apellido || !telefono || !email || !direccion) {
            try{
                const dueno = await duenoModel.findById(idDueno);
                return res.status(400).render('duenos/edit', {
                    title: `Editar Dueño ${dueno.id} - ${dueno.nombre} ${dueno.apellido}`,
                    dueno: dueno,
                    error: 'Todos los campos son obligatorios'
                });
            } catch (findError) {
                return res.status(404).render('error', { message: `Dueño con ID ${duenoId} no encontrado para actualizar.` });
            }
        }
        try {
            const duenoActualizado = {nombre, apellido, telefono, email, direccion };
            const actualizado = await duenoModel.update(idDueno,duenoActualizado);
            if (!actualizado) {
                return res.status(404).render('error', { message: `Dueño con ID ${idDueno} no encontrado` });
            }
            res.redirect('/duenos');
        } catch (error) {
            console.error(`Error al editar dueño con ID ${idDueno}:`, error.message);
            res.status(500).render('error', { message: 'Error al editar dueño' });
        }
    }
    async delete(req, res) {
        const idDueno = parseInt(req.params.id);
        if (isNaN(idDueno)) {
            return res.status(400).render('error', { message: 'ID de dueño inválido' });
        }
        try {
            const eliminado = await duenoModel.delete(idDueno);
            if (eliminado) {
                res.redirect('/duenos?mensaje=Dueño%20eliminado%20correctamente');
            } else {
                return res.status(404).render('error', { message: `Dueño ${numericoIdDueno} no encontrado` });
            }
        } catch (error) {
            console.error(`Error al eliminar dueño con ID ${idDueno} :`, error.message);
            let codigoError = 500;
            if (error.message.includes('Dueño no encontrado')) {
                codigoError = 404;
            }
            return res.status(codigoError).render('error', { message: error.message });
        }
    }
}
module.exports = new DuenoWebController();