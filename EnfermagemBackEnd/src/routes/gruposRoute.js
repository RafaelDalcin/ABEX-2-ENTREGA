import controller from '../controllers/gruposController'

export default (app) => {
	app.get('/grupos', controller.getAll)
	app.post('/grupos/persist', controller.persist)
	app.post('/grupos/destroy', controller.destroy)
	app.get('/grupos/:id', controller.getById)
}