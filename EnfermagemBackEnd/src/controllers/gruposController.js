import Grupo from "../models/Grupo";

const getAll = async (req, res) => {
  try {
    const response = await Grupo.findAll({
      order: [['id', 'ASC']]
    });
    return res.status(200).send({
      type: 'success', 
      message: 'Registros recuperados com sucesso', 
      data: response 
    });
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro!',
      data: error
    });
  }
}

const getById = async (req, res) => {
  try {
    let { id } = req.params;
    //garante que o id só vai ter NUMEROS;
    id = id.toString().replace(/\D/g, '');
    if (!id) {
      return res.status(400).send({
        message: 'Informe um código válido para realizar a consulta!'
      });
    }

    let grupo = await Grupo.findOne({
      where: {
        id
      }
    });

    if (!grupo) {
      return res.status(400).send({
        message: `Não foi possível encontrar um grupo com o código ${id}`
      });
    }

    return res.status(200).send({
      type: 'success', // success, error, warning, info
      message: 'Registros recuperados com sucesso', // mensagem para o front exibir
      data: grupo // json com informações de resposta
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message
    })
  }
}

const persist = async (req, res) => {
  try {
    let { id } = req.body;
    //caso nao tenha id, cria um novo registro
    if (!id) {
      return await create(req.body, res)
    }

    return await update(id, req.body, res)
  } catch (error) {
    return res.status(500).send({
      message: error.message
    })
  }
}

const create = async (dados, res) => {
  try {
    let { descricao } = dados;

    let grupoExiste = await Grupo.findOne({
      where: {
        descricao
      }
    });

    if (grupoExiste) {
      return res.status(200).send({
        type: 'error',
        message: 'Já existe um grupo cadastrado com esse nome!'
      });
    }

    let response = await Grupo.create({
      descricao
    });

    return res.status(200).send({
      type: 'success',
      message: 'Grupo cadastrado com sucesso!',
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
  let { descricao } = dados;
  let grupo = await Grupo.findOne({
    where: {
      id
    }
  });

  if (!grupo) {
    return res.status(400).send({ type: 'error', message: `Família com o código ${id} inexistente` })
  }

  //TODO: desenvolver um lógica pra validar todos os campos
  //que vieram para atualizar e entao atualizar
  Object.keys(dados).forEach(field => grupo[field] = dados[field]);

  await grupo.save();
  return res.status(200).send({
    message: `Grupo ${id} atualizado com sucesso`,
    data: grupo
  });
}

const destroy = async (req, res) => {
  try {
    let { id } = req.body;
    //garante que o id só vai ter NUMEROS;
    id = id ? id.toString().replace(/\D/g, '') : null;
    if (!id) {
      return res.status(400).send({
        message: 'Informe um grupo existente para ser deletado!'
      });
    }

    let grupo = await Grupo.findOne({
      where: {
        id,
      }
    });

    if (!grupo) {
      return res.status(400).send({ message: `Não foi encontrada nenhum grupo resgistrado com o código ${id}` })
    }

    await grupo.destroy();
    return res.status(200).send({
      message: `A grupo informado foi deletado com sucesso`
    })
  } catch (error) {
    return res.status(500).send({
      message: error.message
    })
  }
}

export default {
  getAll,
  getById,
  create,
  destroy,
  persist,
}