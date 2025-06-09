const home = async (req, res) => {
    res.render('index', { 
        title: 'Mi aplicación Gestión de Turnos Médicos',
        message: '¡Bienvenido al sistema de turnos de la clínica!',
        showFeatures: true,
        features: [
            
        ],
        instructions: [
            'Registrate como usuario desde la sección de registro.',
            'El sistema mostrará un token en la terminal para autorizar el registro del nuevo usuario.',
            'Usá tus credenciales para iniciar sesión en el sistema.',
            'Luego de iniciar sesión, podrás ver la lista de pacientes y sus turnos asignados.',
            'En la sección de turnos, podés crear un nuevo turno y asignarlo al paciente correspondiente.'
        ],
        year: new Date().getFullYear()
    });
};

module.exports = { home };