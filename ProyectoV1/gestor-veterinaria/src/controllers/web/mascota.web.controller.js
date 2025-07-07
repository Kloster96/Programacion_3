const MascotaModel = require("../../models/mascota.model");
const DuenoModel = require("../../models/dueno.model");
const duenoModel = require("../../models/dueno.model");
const mascotaModel = require("../../models/mascota.model");

class MascotaWebController {
    async list(req, res) {
        try {
            const mascotas = await MascotaModel.list();
            res.render('mascotas/list', { title: 'Lista de Mascotas', mascotas: mascotas });
        } catch (error) {
            console.error('Error al listar mascotas:', error);
            res.status(500).render('error', { message: 'Error al listar mascotas' });
        }
    }

    async createForm(req, res) {
        try {
            const duenos = await duenoModel.list();
            res.render('mascotas/new', { title: 'Registrar nueva mascota', error: null, duenos: duenos, mascota: {} });
        } catch (error) {
            console.error('Error al mostrar formulario de creación de mascota:', error);
            res.status(500).render('error', { message: 'Error al mostrar formulario de creación de mascota' });
        }
    }

    async create(req, res) {
        const { nombre, especie, raza, fechaNacimiento, duenoId, observaciones } = req.body;
        const duenoIdnum = parseInt(duenoId, 10);
        if (!nombre || !especie || !raza || !fechaNacimiento || isNaN(duenoIdnum) || !observaciones) {
            const duenos = await duenoModel.list();
            return res.status(400).render('mascotas/new', {
                title: 'Registrar nueva mascota',
                error: 'Todos los campos son obligatorios',
                duenos:duenos,
                mascota: req.body
            });
        }
        try {
            const nuevaMascota = { nombre, especie, raza, fechaNacimiento, duenoId:duenoIdnum, observaciones };
            await MascotaModel.create(nuevaMascota);
            res.redirect('/mascotas');
        } catch (error) {
            console.error('Error al crear mascota:', error);
            res.status(500).render('mascotas/create', {
                title: 'Registrar Nueva Mascota',
                error: 'Error al crear mascota' + error.message,
                mascota: req.body
            });
        }
    }
    async editForm(req, res) {
        const idMascota = parseInt(req.params.id,10);
        if (isNaN(idMascota)) {
            return res.status(400).render('error', { message: 'ID de mascota inválido' });
        }
        try {
            const mascota = await MascotaModel.findById(idMascota);
            if (!mascota) {
                return res.status(404).render('error', { message: 'Mascota no encontrada' });
            }
            const duenos = await duenoModel.list();
            res.render('mascotas/edit', { title: 'Editar Mascota: ' + mascota.nombre, mascota: mascota, duenos:duenos, error: null });
        } catch (error) {
            console.error('Error al cargar formulario de edición de mascota:', error);
            res.status(500).render('error', { message: 'Error al cargar formulario de edición de mascota' });
        }
    }
    async update(req, res) {
        const idMascota = parseInt(req.params.id, 10);
        if (isNaN(idMascota)) {
            return res.status(400).render('error', { message: 'ID de mascota inválido' });
        }
        const { nombre, especie, raza, fechaNacimiento, duenoId, observaciones } = req.body;
        const duenoIdnum = parseInt(duenoId, 10);
        if (!nombre || !especie || !raza || !fechaNacimiento || isNaN(duenoIdnum) || !observaciones) {
            const duenos = await DuenoModel.list();
            const mascota = await MascotaModel.findById(idMascota);

            const mascotaParaForm = {
                ...mascota,
                ...req.body,
                id:idMascota,
                fechaNacimiento: fechaNacimiento ? new Date(fechaNacimiento) : null 
            }

            return res.status(400).render('mascotas/edit', {
                title: `Editar Mascota: ${mascotaExistente ? mascotaExistente.nombre : ''}`,
                mascota: mascotaParaForm,
                duenos: duenos,
                error: 'Todos los campos son obligatorios',
            });
        }
        try {
            const mascotaActualizada = {nombre, especie, raza, fechaNacimiento, duenoIdnum, observaciones };
            const actualizado = await MascotaModel.update(idMascota, mascotaActualizada);
            if (!actualizado) {
                return res.status(404).render('error', { message: 'Mascota no encontrada' });
            }
            res.redirect('/mascotas');
        } catch (error) {
            console.error('Error al editar mascota:', error);
            try{
                const duenos = await DuenoModel.list();
                const mascotaExistente = await mascotaModel.findById(idMascota);
                const mascotaParaForm = {
                    ...mascotaExistente,
                    ...req.body,
                    id: parseInt(req.params.idMascota, 10),
                    fechaNacimiento: req.body.fechaNacimiento ? new Date(req.body.fechaeNacimiento) : null
                };

                res.status(500).render('mascotas/edit', {
                    title: 'Editar Mascota',
                    mascota: mascotaParaForm,
                    duenos: duenos,
                    error: 'Error al editar mascota: ' + error.message
                });
            } catch (error) {
                console.error('Error al obtener mascota original:', error);
            }
        }
    }
    async delete(req, res) {
        const idMascota = parseInt(req.params.id, 10);
        if (isNaN(idMascota)) {
            return res.status(400).render('error', { message: 'ID de mascota inválido' });
        }
        try {
            const eliminado = await MascotaModel.delete(idMascota);
            if (!eliminado) {
                return res.status(404).render('error', { message: 'Mascota no encontrada' });
            }
            res.redirect('/mascotas?mensaje=Mascota eliminada correctamente');
        } catch (error) {
            console.error('Error al eliminar mascota:', error);
            res.status(500).render('error', { message: 'Error al eliminar mascota' });
        }
    }
}
module.exports = new MascotaWebController();