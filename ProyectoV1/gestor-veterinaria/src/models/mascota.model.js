const Mascota = require('./mock/entities/mascota.entity.js');
const mockData = require('../data/mockData.js');


class MascotaModel {
    async list() {
            try {
                const duenoModel = require('./dueno.model.js');
                const mascotasConDuenos = await Promise.all(mockData.mascotas.map( async (mascota) => {
                    let dueno = null;
                    try{
                        dueno = await duenoModel.findById(mascota.duenoId);
                    } catch (error) {
                        console.log(`Dueño con ID ${mascota.duenoId} no encontrado para la mascota con ID: ${mascota.id}`);
                    }
                    const fechaNacimientoDate = mascota.fechaNacimiento ? new Date(mascota.fechaNacimiento) : null;
                    const mascotaConDueno = new Mascota(
                        mascota.id,
                        mascota.nombre,
                        mascota.especie,
                        mascota.raza,
                        fechaNacimientoDate,
                        mascota.duenoId,
                        mascota.observaciones
                    );
                    mascotaConDueno.dueno = dueno || { id: null, nombre: 'Desconocido', apellido: 'Desconocido' };
                    return mascotaConDueno;
                }));
                
                return mascotasConDuenos;
            } catch (error) {
                throw new Error(`Error al listar mascotas: ${error.message}`);
            }
    }

    async create(mascota) {
            try {
                const nuevoId = mockData.nextMascotaId++;
                const fechaNacimientoDate = mascota.fechaNacimiento ? new Date(mascota.fechaNacimiento) : null;
                const nuevaMascota = new Mascota(
                    nuevoId,
                    mascota.nombre,
                    mascota.especie,
                    mascota.raza,
                    fechaNacimientoDate,
                    mascota.duenoId,
                    mascota.observaciones
                );
                mockData.mascotas.push(nuevaMascota);
                return nuevaMascota;
            } catch (error) {
                throw new Error(`Error al crear mascota: ${error.message}`);
            }
    }

    async update(id, mascota) {
            try {
                const mascotaIndex = mockData.mascotas.findIndex(m => m.id === parseInt(id));
                if (mascotaIndex === -1) {
                    throw new Error(`Mascota con ID ${id} no encontrada.`);
                }
                const mascotaEncontrada = mockData.mascotas[mascotaIndex];
                const fechaNacimientoActualizada = mascota.fechaNacimiento 
                                                            ? new Date(mascota.fechaNacimiento) 
                                                            : (mascotaEncontrada.fechaNacimiento instanceof Date 
                                                                ? mascotaEncontrada.fechaNacimiento 
                                                                : new Date(mascotaEncontrada.fechaNacimiento));

                const mascotaActualizada = new Mascota(
                    parseInt(id),
                    mascota.nombre || mascotaEncontrada.nombre,
                    mascota.especie || mascotaEncontrada.especie,
                    mascota.raza || mascotaEncontrada.raza,
                    fechaNacimientoActualizada,
                    mascota.duenoId || mascotaEncontrada.duenoId,
                    mascota.observaciones || mascotaEncontrada.observaciones
                );
                mockData.mascotas[mascotaIndex] = mascotaActualizada;
                return mascotaActualizada;
            } catch (error) {
                throw new Error(`Error al actualizar mascota: ${error.message}`);
            }
    }

    async delete(id) {
            try{
                const largoInicial = mockData.mascotas.length;
                const nuevoMascotas = mockData.mascotas.filter(m => m.id !== parseInt(id));
                if (nuevoMascotas.length < largoInicial) {
                    mockData.mascotas.splice(0, mockData.mascotas.length, ...nuevoMascotas);
                    return true;
                } else {
                    throw new Error(`Mascota con ID ${id} no encontrada.`);
                }
            } catch (error) {
                throw new Error(`Error al eliminar mascota: ${error.message}`);
            }
    }
    
    async findById(id) {
        const duenoModel = require('./dueno.model.js');
            try{
                const idNum = parseInt(id,10);
                if (isNaN(idNum)) {
                    return reject(new Error(`ID debe ser un número.`));
                }
                const mascota = mockData.mascotas.find(m => m.id === idNum);
                if (mascota) {
                    let dueno = null;
                    try{
                        dueno = await duenoModel.findById(mascota.duenoId);
                    } catch  (error) {
                        console.warn(`[WARNING] Dueño con ID ${mascota.duenoId} no encontrado al buscar mascota con ID: ${mascota.id}. Error: ${error.message}`);
                    }
                    
                    const fechaNacimientoDate = mascota.fechaNacimiento ? new Date(mascota.fechaNacimiento) : null;

                    const mascotaEncontrada = new Mascota(
                        mascota.id,
                        mascota.nombre,
                        mascota.especie,
                        mascota.raza,
                        fechaNacimientoDate,
                        mascota.duenoId,
                        mascota.observaciones
                    );

                    mascotaEncontrada.dueno = dueno || { id: null, nombre: 'Desconocido', apellido: 'Desconocido' };

                    return mascotaEncontrada;
                } else {
                    throw new Error(`Mascota con ID ${id} no encontrada.`);
                }
            }catch (error) {
                throw new Error(`Error al buscar mascota: ${error.message}`);
            }
    }
}
module.exports = new MascotaModel();