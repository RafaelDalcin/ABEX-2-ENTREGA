import Paciente from "../models/Paciente";
import Usuario from "../models/Usuario"

const getAll = async (req, res) => {
  try {
    const response = await Paciente.findAll({
      order: [['id', 'ASC']]
    });
    return res.status(200).send({
      type: 'success', // success, error, warning, info
      message: 'Registros recuperados com sucesso', // mensagem para o front exibir
      data: response // json com informações de resposta
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

    let familia = await Familia.findOne({
      where: {
        id
      }
    });

    if (!familia) {
      return res.status(400).send({
        message: `Não foi possível encontrar uma família com o código ${id}`
      });
    }

    return res.status(200).send({
      type: 'success', // success, error, warning, info
      message: 'Registros recuperados com sucesso', // mensagem para o front exibir
      data: familia // json com informações de resposta
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
    let { nome, username, tipo, passwordHash  } = dados;

    let pacienteExite = await Paciente.findOne({
      where: {
        nome
      }
    });

    if (pacienteExite) {
      return res.status(200).send({
        type: 'error',
        message: 'Já existe uma família cadastrada com esse nome!'
      });
    }

    let response = await Familia.create({
      nome
    });

    let usuario = await Usuario.create({
        username, passwordHash, tipo, email 
    })

    return res.status(200).send({
      type: 'success',
      message: 'Família cadastrada com sucesso!',
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
  let { nome } = dados;
  let familia = await Familia.findOne({
    where: {
      id
    }
  });

  if (!familia) {
    return res.status(400).send({ type: 'error', message: `Família com o código ${id} inexistente` })
  }

  //TODO: desenvolver uma lógica pra validar todos os campos
  //que vieram para atualizar e entao atualizar
  Object.keys(dados).forEach(field => familia[field] = dados[field]);

  await familia.save();
  return res.status(200).send({
    message: `Categoria ${id} atualizada com sucesso`,
    data: familia
  });
}

const destroy = async (req, res) => {
  try {
    let { id } = req.body;
    //garante que o id só vai ter NUMEROS;
    id = id ? id.toString().replace(/\D/g, '') : null;
    if (!id) {
      return res.status(400).send({
        message: 'Informe uma família existente para ser deletada!'
      });
    }

    let familia = await Familia.findOne({
      where: {
        id,
      }
    });

    if (!familia) {
      return res.status(400).send({ message: `Não foi encontrada nenhuma família resgistrada com o código ${id}` })
    }

    await familia.destroy();
    return res.status(200).send({
      message: `A família informada foi deletada com sucesso`
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