import controller from '../controllers/usuariosController.js';

export default (app) => {
    app.post('/usuarios/persist', controller.persist);
    app.post('/usuarios/destroy', controller.destroy);
    app.get('/usuarios', controller.getAll);
    app.get('/usuarios/:id', controller.getById);
}

