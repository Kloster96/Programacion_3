const Mascota = require('./postgreSQL/mascota.js');
const Dueno = require('./postgreSQL/dueno.js');

class MascotaModel {
    async list() {
            try {
                const mascotas = await Mascota.findAll({
                    include:[{model: Dueno, as: 'Dueno'}]
                });
                return mascotas;
            } catch (error) {
                console.error('Error en MascotaModel.list: ',error);
                throw new Error(`Error al listar mascotas: ${error.message}`);
            }
    }

    async create(mascota) {
            try {
                const nuevaMascota = await Mascota.create(mascota);
                return nuevaMascota;
            } catch (error) {
                console.error('Error en MascotaModel.create: ', error);
                throw new Error(`Error al crear mascota: ${error.message}`);
            }
    }

    async update(id, mascota) {
            try {
                const mascotaEncontrada = await Mascota.findByPk(id);
                if(!mascotaEncontrada){
                    throw new Error(`Mascota con ID ${id} no encontrada.`);
                }
                console.log('DEBUG (Model Update): Mascota encontrada (antes de actualizar):', mascotaEncontrada.toJSON());
                console.log('DEBUG (Model Update): Datos recibidos para actualizar (mascotaData):', mascota);
           
                const mascotaActualizada = await mascotaEncontrada.update(mascota)

                console.log('DEBUG (Model Update): Mascota actualizada (después de Sequelize.update):', mascotaActualizada.toJSON());
            
                return mascotaActualizada;
            } catch (error) {
                console.error('Error en MascotaModel.update: ',error);
                throw new Error(`Error al actualizar mascota: ${error.message}`);
            }
    }

    async delete(id) {
            try{
                const filasEliminadas = await Mascota.destroy({
                    where:{id:id}
                });
                if(filasEliminadas === 0){
                    throw new Error(`Mascota con ID ${id} no encontrada.`);
                }
                return true;
            } catch (error) {
                console.error('Error en MascotaModel.delete: ', error);
                throw new Error(`Error al eliminar mascota: ${error.message}`);
            }
    }
    
    async findById(id) {
            try{
                const idNum = parseInt(id,10);
                if (isNaN(idNum)) {
                    throw new Error(`ID debe ser un número.`);
                }
                const mascota = await Mascota.findByPk(idNum,{
                    include: [{ model: Dueno, as: 'Dueno'}]
                });
                if(!mascota){
                    throw new Error(`Mascota con ID ${id} no encontrada.`);
                }
                return mascota;
            }catch (error) {
                console.error('Error en MascotaModel.findById: ',error);
                throw new Error(`Error al buscar mascota: ${error.message}`);
            }
    }
}
module.exports = new MascotaModel();