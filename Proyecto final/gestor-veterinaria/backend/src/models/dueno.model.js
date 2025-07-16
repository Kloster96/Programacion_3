const Dueno = require('./postgreSQL/dueno.js');
const Mascota = require('./postgreSQL/mascota.js');

class DuenoModel {
    async list(){
            try{
                const duenos = await Dueno.findAll({
                    include: [{model: Mascota, as: 'Mascota'}]
                });
                return duenos;
            }catch(error){
                console.error('Error en DuenoModel.list:', error);
                throw new Error(`Error al listar dueños: ${error.message}`);
            }
    }
    async create(dueno) {
            try {
                const nuevoDueno = await Dueno.create(dueno);
                return nuevoDueno;
            } catch (error) {
                throw new Error(`Error al crear dueño: ${error.message}`);
            }
    }
    async update(id, dueno) {
            try {
                const duenoEncontrado = await Dueno.findByPk(id);
                if(!duenoEncontrado){
                    throw new Error(`Dueño con ID ${id} no encontrado.`);
                }
                const duenoActualizado = await duenoEncontrado.update(dueno);
                return duenoActualizado;
            } catch (error) {
                throw new Error(`Error al actualizar dueño: ${error.message}`);
            }
    }
    async delete(id) {
         try{
            const idNum = parseInt(id,10);
            if(isNaN(idNum)){
                 throw new Error('El id proporcionado debe ser un número');
            }
            const mascotasAsociadas = await Mascota.count({where:{duenoId:idNum}});
            if(mascotasAsociadas > 0) {
                throw new Error(`No se puede eliminar el dueño con ID ${idNum} porque tiene ${mascotasAsociadas} mascotas asociadas.`)
            }
            const filasEliminadas = await Dueno.destroy({
                where: {id:idNum}
            })
            if(filasEliminadas === 0){
                throw new Error(`Dueño con ID ${idNum} no encontrado.`);
            }
            return true;
        } catch (error) {
            throw new Error(`Error al eliminar dueño: ${error.message}`);
        }
    }
    async findById(id) {
        try{
            const idNum = parseInt(id,10);
            if (isNaN(idNum)){
                throw new Error(`ID debe ser un número.`);
            }
            const dueno = await Dueno.findByPk(idNum,{
                include: [{ model: Mascota, as: 'Mascota'}]
            });
            if (!dueno) {
                throw new Error(`Dueño con ID ${id} no encontrado.`);
            }
            return dueno;
        } catch (error) {
            throw new Error(`Error al buscar dueño por ID: ${error.message}`);
        }
    }
}
module.exports = new DuenoModel();