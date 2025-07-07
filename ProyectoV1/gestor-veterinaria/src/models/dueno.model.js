const Dueno = require('./mock/entities/dueno.entity.js');
const mockData = require('../data/mockData.js');

class DuenoModel {
    async list(){
            try{
                return mockData.duenos;
            }catch(error){
                throw new Error(`Error al listar dueños: ${error.message}`);
            }
    }
    async create(dueno) {
            try {
                const nuevoId = mockData.nextDuenoId++;
                const nuevoDueno = new Dueno(
                    nuevoId,
                    dueno.nombre,
                    dueno.apellido,
                    dueno.telefono,
                    dueno.email,
                    dueno.direccion
                );
                mockData.duenos.push(nuevoDueno);
                return nuevoDueno;
            } catch (error) {
                throw new Error(`Error al crear dueño: ${error.message}`);
            }
    }
    async update(id, dueno) {
            try {
                const duenoIndex = mockData.duenos.findIndex(d => d.id === parseInt(id,10));
                if (duenoIndex === -1) {
                    throw new Error(`Dueño con ID ${id} no encontrado.`);
                }
                const duenoEncontrado = mockData.duenos[duenoIndex];
                const nuevoDueno = new Dueno(
                    parseInt(id),
                    dueno.nombre || duenoEncontrado.nombre,
                    dueno.apellido || duenoEncontrado.apellido,
                    dueno.telefono || duenoEncontrado.telefono,
                    dueno.email || duenoEncontrado.email,
                    dueno.direccion || duenoEncontrado.direccion
                );
                mockData.duenos[duenoIndex] = nuevoDueno;
                return nuevoDueno;
            } catch (error) {
                throw new Error(`Error al actualizar dueño: ${error.message}`);
            }
    }
    async delete(id) {
        
            try{
                
                const idNum = parseInt(id);
                if(isNaN(idNum)){
                    throw new Error("El ID debe ser un número");
                }
                
                const mascotasAsociadas = mockData.mascotas.filter(mascota => mascota.duenoId === idNum);

                if (mascotasAsociadas && mascotasAsociadas.length > 0) {
                    throw new Error(`No se puede eliminar el dueño con ID ${id} porque tiene mascotas asociadas.`);
                }
                const largoInicial = mockData.duenos.length;
                const nuevoDuenos = mockData.duenos.filter(d => d.id !== idNum);
                if (nuevoDuenos.length < largoInicial) {
                    mockData.duenos.splice(0, mockData.duenos.length, ...nuevoDuenos);
                    return true;
                } else {
                    throw new Error(`Dueño con ID ${id} no encontrado.`);
                }
            } catch (error) {
                throw new Error(`Error al eliminar dueño: ${error.message}`);
            }
    }
    async findById(id) {
        try{
            const idNum = parseInt(id);
            if (isNaN(id)){
                throw new Error(`ID debe ser un número.`);
            }
            const dueno = mockData.duenos.find(d => d.id === idNum);
            if (dueno) {
                return dueno;
            } else {
                throw new Error(`Dueño con ID ${id} no encontrado.`);
            }
        } catch (error) {
            throw new Error(`Error al buscar dueño por ID: ${error.message}`);
        }
    }
}
module.exports = new DuenoModel();