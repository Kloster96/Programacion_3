const {Turnos} = require('../sqlite/entities/turno.entity.js');

const getTurnoModel =  ()=>{
    const users = Turnos.findAll();
    return users;
  }

module.exports ={
    getTurnoModel
}