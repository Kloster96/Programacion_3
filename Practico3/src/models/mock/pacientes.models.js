const Persona = require('./../mock/entities/paciente.entity.js');
const bcrypt = require('bcrypt');

class PacientesModel {
  constructor() {
    this.data = [];
    this.data.push(new Persona(
      "123456787", 
      "Sergio", 
      "Antozzi", 
      "email@gmail.com", 
      1, 
      bcrypt.hashSync("admin1234", 10) // ID antes, password después
    ));
    this.id = 2;
  }

  async create(paciente) {
    console.log("🧪 Contraseña recibida en el modelo:", paciente.password);
    return new Promise(async (resolve, reject) => {
      try {
        paciente.id = this.id;
        paciente.password = await bcrypt.hash(paciente.password, 10);
        this.id++;
        const nuevoPaciente = new Persona(
          paciente.dni,
          paciente.nombre,
          paciente.apellido,
          paciente.email,
          paciente.id,
          paciente.password
        );
        this.data.push(nuevoPaciente);
        resolve(nuevoPaciente);
      } catch (error) {
        reject(error);
      }
    });
  }

  async findByEmail(email) {
    return new Promise((resolve, reject) => {
      const pacienteEncontrado = this.data.find(p => p.email === email);
      if (pacienteEncontrado) {
        resolve(pacienteEncontrado);
      } else {
        reject(new Error(`Paciente con email ${email} no encontrado.`));
      }
    });
  }

  async update(id, paciente) {
    try {
      const pacienteEncontrado = this.data.find((p) => p.id == id);
      if (!pacienteEncontrado) throw new Error("No se encuentra el paciente");

      pacienteEncontrado.dni = paciente.dni;
      pacienteEncontrado.email = paciente.email;
      pacienteEncontrado.nombre = paciente.nombre;
      pacienteEncontrado.apellido = paciente.apellido;
    } catch (error) {
      console.log(error.message);
    }
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      const largoInicial = this.data.length;
      this.data = this.data.filter((p) => p.id !== id);
      if (this.data.length < largoInicial) {
        resolve(true);
      } else {
        reject(new Error(`Paciente con ID ${id} no encontrado.`));
      }
    });
  }

  async list() {
    return new Promise((resolve) => {
      resolve(this.data);
    });
  }

  async findById(id) {
    return new Promise((resolve, reject) => {
      const numericId = parseInt(id, 10);
      if (isNaN(numericId)) {
        return reject(new Error("El ID proporcionado no es un número válido."));
      }
      const pacienteEncontrado = this.data.find(p => p.id === numericId);
      if (pacienteEncontrado) {
        resolve(pacienteEncontrado);
      } else {
        reject(new Error(`Paciente con ID ${numericId} no encontrado.`));
      }
    });
  }
}

module.exports = new PacientesModel();
