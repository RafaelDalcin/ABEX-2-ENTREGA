import controller from '../controllers/familiasController'

export default (app) => {
	app.get('/familias', controller.getAll)
	app.post('/familias/persist', controller.persist)
	app.post('/familias/destroy', controller.destroy)
	app.get('/familias/:id', controller.getById)
}