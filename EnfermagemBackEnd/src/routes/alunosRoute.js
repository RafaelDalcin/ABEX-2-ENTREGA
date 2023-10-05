import controller from '../controllers/alunosController'

export default (app) => {
	app.get('/alunos', controller.getAll)
	app.post('/alunos/persist', controller.persist)
	app.post('/alunos/destroy', controller.destroy)
	app.get('/alunos/:id', controller.getById)
}