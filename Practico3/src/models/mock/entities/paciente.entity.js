const Identificador = require("./identificador.entity");

class Paciente extends Identificador {
  constructor(dni, nombre, apellido, email, id = 0, password = "") {
    super(id);
    this.dni = dni;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.password = password;
  }
}
module.exports = Paciente;