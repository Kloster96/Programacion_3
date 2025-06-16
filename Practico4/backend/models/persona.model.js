const personas = [
  {
    id: 1,
    nombre: "Juan",
    apellido: "Perez",
    edad: 30,
    email: "juan.perez@example.com"
  },
  {
    id: 2,
    nombre: "Maria",
    apellido: "Gomez",
    edad: 25,
    email: "maria.gomez@example.com"
  },
  {
    id: 3,
    nombre: "Carlos",
    apellido: "Lopez",
    edad: 40,
    email: "carlos.lopez@example.com"
  },
  {
    id: 4,
    nombre: "Ana",
    apellido: "Rodriguez",
    edad: 35,
    email: "ana.rodriguez@example.com"
  },
  {
    id: 5,
    nombre: "Pedro",
    apellido: "Martinez",
    edad: 28,
    email: "pedro.martinez@example.com"
  }
];

const getAllPersonas = () => {
    return personas;
}

module.exports = {
    getAllPersonas
}