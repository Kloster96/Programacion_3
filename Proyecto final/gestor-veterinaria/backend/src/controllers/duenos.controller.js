
const duenoModel = require('../models/dueno.model');

class DuenoController {
    async index(req,res) {
        try{
            const duenos = await duenoModel.list();
            return res.json(duenos);
        } catch (error) {
            console.error('Error al obtener lista de dueños: ',error);
            return res.status(500).json({messagge:'Error al obtener lista de dueños',error:error.message});
        }
    }

    async create(req, res) {
        const { nombre, apellido, telefono, email, direccion } = req.body;
        if (!nombre || !apellido || !telefono || !email || !direccion) {
            return res.status(400).json({
                message:'Todos los campos son obligatorios'
            });
        }
        try {
            const nuevoDueno = { nombre, apellido, telefono, email, direccion };
            const creado = await duenoModel.create(nuevoDueno);
            return res.status(201).json({message:'Dueño creado exitosamente', dueno:creado});
        } catch (error) {
            console.error('Error al crear dueño:', error);
            return res.status(500).json({ message: 'Error interno del servidor al crear dueño.', error: error.message });
        }
    }

    async showById(req, res) {
        try {
            const  id  = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(400).json({message: 'El id debe ser un número'});
            }
            const dueno = await duenoModel.findById(id);
            if (!dueno) {
                return res.status(404).json({ message: `Dueño con ID ${id} no encontrado` });
            }
            return res.json(dueno);
        } catch (error) {
            console.error('Error al obtener dueño por ID: ',error);
            return res.status(500).json({message:'Error interno del servidor.', error: error.message});
        }
    }
    async update(req, res) {
        try{
            const  id  = parseInt(req.params.id, 10);
            const { nombre, apellido, telefono, email, direccion } = req.body;
            if (isNaN(id)) {
                return res.status(400).json({ message: 'ID de dueño inválido' });
            }
            const dueno = await duenoModel.findById(id);
            if(!dueno){
                res.status(404).json({message:'Dueño no encontrado'});
            }
            const duenoActualizado = {nombre, apellido, telefono, email, direccion };
            const actualizado = await duenoModel.update(id,duenoActualizado);
            if (!actualizado) {
                return res.status(404).json({ message: `Dueño con ID ${id} no encontrado` });
            }
            return res.json({message:'Dueño actualizado exitosamente', dueno: dueno});
        } catch (error) {
            console.error(`Error al editar dueño con ID ${id}:`, error.message);
        }
    }
    async delete(req, res) {
        let id;
        try {
            console.log('DEBUG (DuenoController - DELETE): req.params.id recibido:', req.params.id);
            id = parseInt(req.params.id);
            console.log('DEBUG (DuenoController - DELETE): ID parseado (parseInt):', id);

            if (isNaN(id)) {
                console.log('DEBUG (DuenoController - DELETE): ID es NaN, enviando 400.');
                return res.status(400).json({ message: 'ID de dueño inválido' });
            }
            const eliminado = await duenoModel.delete(id);
            if(eliminado){
                return res.status(200).json(`Dueño con ID:${id} eliminado exitosamente.`);
            } else {
                return res.status(500).json('Error al eliminar dueño con ID: ',id);
            }
        } catch (error) {
            console.error(`Error al eliminar dueño (ID: ${id || 'no disponible'}):`, error);
            if(error.message.includes('No se puede eliminar dueño con ID') && error.message.includes('mascotas asociadas.')){
                return res.status(400).json({message: error.message});
            }
            return res.status(500).json({message: 'Error interno del servidor al eliminar dueño.', error: error.message });
        }
    }
}
module.exports = new DuenoController();