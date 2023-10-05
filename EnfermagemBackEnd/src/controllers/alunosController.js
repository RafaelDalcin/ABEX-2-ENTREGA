import Aluno from "../models/Aluno";

const getAll = async (req, res) => {
    try {
        let response = await Aluno.findAll({
        order: [
            ['nome', 'ASC']
        ],
        include: ['usuario', 'grupo']
        });
    
        return res.status(200).send({
        type: 'success',
        message: 'Alunos retornados com sucesso!',
        data: response
        });
    } catch (error) {
        return res.status(200).send({
        type: 'error',
        message: 'Ops! Ocorreu um erro!',
        data: error.message
        });
    }

    
}

const getById = async (req, res) => {
    try {
        let {id} = req.params;

        id = id.toString().replace(/\D/g, '');
    
        if (!id) {
        return res.status(200).send({
            type: 'error',
            message: 'Informe um ID válido para consulta!'
        });
        }

        let aluno = await Aluno.findOne({
            where: {
                id
            },
        })

        if(!aluno){
            return res.status(200).send({
                type: 'error',
                message: 'Aluno não encontrado!'
            });
        }

        return res.status(200).send({
        type: 'success',
        message: 'Aluno retornado com sucesso!',
        data: aluno
        });
    } catch (error) {
        return res.status(200).send({
        type: 'error',
        message: 'Ops! Ocorreu um erro!',
        data: error.message
        });
    }
}

const persist = async (req, res) => {
    try {
        let { id } = req.body;

        if(!id) {
            return await create(req.body, res);
        }
        return await update(id, req.body, res);

    } catch (error) {
        return res.status(200).send({
        type: 'error',
        message: 'Ops! Ocorreu um erro!',
        data: error.message
        });
        
    }
}

const create = async (dados, res) => {
    try {
        let {nome, matricula, curso, semestre, idUsuario, idGrupo} = dados;
        
        let response = await Aluno.create({
            nome,
            matricula,
            curso,
            semestre,
            idUsuario,
            idGrupo,
        });

        return res.status(200).send({
            type: 'success',
            message: 'Aluno cadastrado com sucesso!',
            data: response
        });
    } catch (error) {
        return res.status(200).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro!',
            data: error.message
        });
    }
}

const update = async (id, dados, res) => {
    try {
        let {nome, matricula, curso, semestre, idUsuario} = dados;

        let aluno = await Aluno.findOne({
            where: {
                id
            }
        })

        if(!aluno){
            return res.status(200).send({
                type: 'error',
                message: 'Aluno não encontrado!'
            });
        }

        Object.keys(dados).forEach(field => item[field] = dados[field]);

        await aluno.save();
        return res.status(200).send({
            type: 'success',
            message: 'Aluno atualizado com sucesso!',
            data: aluno
        });
        
    } catch (error) {
        return res.status(200).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro!',
            data: error.message
        });
    }
}

const destroy = async (req, res) => {
    try {
        let { id } = req.body;
        id = id ? id.toString().replace(/\D/g, '') : null;

        if (!id) {
            return res.status(400).send({
              message: 'Informe um método de pagamento existente para ser deletado!!'
            });
          }

        let aluno = await Aluno.findOne({
            where: {
                id
            }
        })

        if(!aluno){
            return res.status(200).send({
                type: 'error',
                message: 'Aluno não encontrado!'
            });
        }

        await aluno.destroy();
        return res.status(200).send({
            type: 'success',
            message: 'Aluno excluído com sucesso!',
            data: aluno
        });
        
    } catch (error) {
        return res.status(200).send({
            type: 'error',
            message: 'Ops! Ocorreu um erro!',
            data: error.message
        });
    }
}


export default {
    getAll,
    getById,
    persist,
    create,
    destroy
}