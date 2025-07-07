let duenos = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', telefono: '1123456789', email: 'juan.p@mail.com', direccion: 'Calle Falsa 123' },
    { id: 2, nombre: 'María', apellido: 'Gómez', telefono: '1198765432', email: 'maria.g@mail.com', direccion: 'Av. Siempre Viva 456' },
    { id: 3, nombre: 'Carlos', apellido: 'Rodríguez', telefono: '1155554444', email: 'carlos.r@mail.com', direccion: 'Ruta 3 Km 700' },
];
let nextDuenoId = duenos.length > 0 ? Math.max(...duenos.map(d => d.id)) + 1 : 1;
let mascotas = [
    { id: 101, nombre: 'Firulais', especie: 'Perro', raza: 'Labrador', fechaNacimiento: '2020-05-15', duenoId: 1, observaciones: 'Vacunas al día, muy juguetón.' },
    { id: 102, nombre: 'Michi', especie: 'Gato', raza: 'Siamés', fechaNacimiento: '2021-01-20', duenoId: 2, observaciones: 'Castrado, un poco gruñón.' },
    { id: 103, nombre: 'Pico', especie: 'Pájaro', raza: 'Canario', fechaNacimiento: '2022-03-01', duenoId: 1, observaciones: 'Le gusta cantar por las mañanas.' },
    { id: 104, nombre: 'Burbuja', especie: 'Pez', raza: 'Goldfish', fechaNacimiento: '2023-07-10', duenoId: 3, observaciones: 'Requiere agua a temperatura constante.' },
];
let nextMascotaId = mascotas.length > 0 ? Math.max(...mascotas.map(m => m.id)) + 1 : 1;

module.exports = {
    duenos,
    nextDuenoId,
    mascotas,
    nextMascotaId
};