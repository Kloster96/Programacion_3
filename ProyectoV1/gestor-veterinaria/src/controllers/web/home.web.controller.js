class homeWebModel {
    async index(req, res) {
        try {
            res.render('index', { title: 'Gestor de Veterinaria' });
        } catch (error) {
            console.error('Error al cargar pagina de inicio:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}
module.exports = new homeWebModel();