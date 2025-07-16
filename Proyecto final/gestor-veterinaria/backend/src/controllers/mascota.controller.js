const duenoModel = require("../models/dueno.model");
const mascotaModel = require("../models/mascota.model");

class MascotaController {
    async index(req, res) {
        try {
            const mascotas = await mascotaModel.list();
            return res.json(mascotas);
        } catch (error) {
            console.error('Error al listar mascotas:', error);
            res.status(500).json({ message: 'Error al listar mascotas' });
        }
    }

    async create(req, res) {
        const { nombre, especie, raza, fechaNacimiento, duenoId, observaciones } = req.body;
        const duenoIdnum = parseInt(duenoId, 10);
        if (!nombre || !especie || !raza || !fechaNacimiento || isNaN(duenoIdnum) || !observaciones) {
            return res.status(400).json({
                message: 'Todos los campos (nombre, especie, raza, fecha de nacimiento, ID de dueño, observaciones) son obligatorios y el ID de dueño debe ser un número.'
            });
        }
        try {
            const nuevaMascota = { nombre, especie, raza, fechaNacimiento, duenoId:duenoIdnum, observaciones };
            const creado = await mascotaModel.create(nuevaMascota);
            res.status(201).json({ message: 'Mascota creada exitosamente', mascota: creado });
        } catch (error) {
            console.error('Error al crear mascota:', error);
            res.status(500).json({ message: 'Error interno del servidor al crear mascota.', error: error.message });
        }
    }
    async showById(req, res) {
        const idMascota = parseInt(req.params.id,10);
        if (isNaN(idMascota)) {
            return res.status(400).json({ message: 'ID de mascota inválido' });
        }
        try {
            const mascota = await mascotaModel.findById(idMascota);
            if (!mascota) {
                return res.status(404).json({ message: 'Mascota no encontrada' });
            }
            return res.json(mascota);
        } catch (error) {
            console.error('Error al cargar formulario de edición de mascota:', error);
            return res.status(500).json({ message: 'Error al cargar formulario de edición de mascota' });
        }
    }
    async update(req, res) {
        const idMascota = parseInt(req.params.id, 10);
        if (isNaN(idMascota)) {
            return res.status(400).json({ message: 'ID de mascota inválido' });
        }
        const { nombre, especie, raza, fechaNacimiento, duenoId, observaciones } = req.body;
        const duenoIdnum = parseInt(duenoId, 10);

        console.log('DEBUG (Controller Update): ID de mascota a actualizar:', idMascota);
        console.log('DEBUG (Controller Update): duenoId recibido del body:', duenoId);
        console.log('DEBUG (Controller Update): duenoIdnum parseado:', duenoIdnum);
        console.log('DEBUG (Controller Update): Body completo:', req.body);
        if (!nombre || !especie || !raza || !fechaNacimiento || isNaN(duenoIdnum) || !observaciones) {
            return res.status(400).json({
                message: 'Todos los campos son obligatorios.'
            });
        }
        try {
            const mascotaExistente = await mascotaModel.findById(idMascota);
            if (!mascotaExistente) {
                return res.status(404).json({ message: `Mascota con ID ${idMascota} no encontrada para actualizar.` });
            }
            const mascotaActualizada = {nombre, especie, raza, fechaNacimiento, duenoId, observaciones };
            const actualizado = await mascotaModel.update(idMascota, mascotaActualizada);
            if (!actualizado) {
                return res.status(404).json({ message: 'Mascota no encontrada' });
            }
            const mascotaActual = await mascotaModel.findById(idMascota);
            return res.status(201).json({message: 'Mascota actualizada exitosamente.', mascota: mascotaActual});
        } catch (error) {
            console.error('Error al editar mascota:', error);
            return res.status(500).json({ message: 'Error interno del servidor al actualizar mascota.', error: error.message });
        }
    }

    async delete(req, res) {
        const idMascota = parseInt(req.params.id, 10);
        if (isNaN(idMascota)) {
            return res.status(400).json({ message: 'ID de mascota inválido' });
        }
        try {
            const eliminado = await mascotaModel.delete(idMascota);
            if (!eliminado) {
                return res.status(404).json({ message: 'Mascota no encontrada' });
            }
            return res.status(200).json({message:'Mascota eliminada exitosamente.'});
        } catch (error) {
            console.error('Error al eliminar mascota:', error);
            return res.status(500).json({ message: 'Error al eliminar mascota' });
        }
    }
}
module.exports = new MascotaController();