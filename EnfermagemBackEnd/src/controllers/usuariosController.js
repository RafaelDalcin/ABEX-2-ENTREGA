import Usuario from "../models/Usuario";
import bcrypt from 'bcrypt';

const getAll = async (req, res) => {
  try {
    const response = await Usuario.findAll({
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

    let usuario = await Usuario.findOne({
      where: {
        id
      },
    });
    
    if (!usuario) {
      return res.status(400).send({
        message: `Não foi possível encontrar um usuário com o código ${id}`
      });
    }

    return res.status(200).send({
      type: 'success', // success, error, warning, info
      message: 'Registros recuperados com sucesso', // mensagem para o front exibir
      data: usuario // json com informações de resposta
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message
    })
  }
}

const create = async (dados, res) => {
  try {
    let { username, email, senha, tipo  } = dados;

    let usuarioExiste = await Usuario.findOne({
      where: {
        username
      }
    });

    if (usuarioExiste) {
      return res.status(200).send({
        type: 'error',
        message: 'Já existe um usuário cadastrado com esse username!'
      });
    }

    let passwordHash = await bcrypt.hash(senha, 10);

    let response = await Usuario.create({
      username,
      email,
      passwordHash,
      ativo: true,
      tipo,
    });

    return res.status(200).send({
      type: 'success',
      message: 'Usuário cadastrado com sucesso!',
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
    let { username, email } = dados;

    let usuario = await Usuario.findOne({
      where: {
        id
      }
    });

    if (!usuario) {
      return res.status(200).send({
        type: 'error',
        message: 'Usuário não encontrado!'
      });
    }
    
    Object.keys(dados).forEach(field => category[field] = dados[field]);

    await usuario.save()
    return res.status(200).send({
      type: 'success',
      message: 'Usuário atualizado com sucesso!',
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

const persist = async (req, res) => {
  try {
    let { id } = req.body;

    if (!id) {
      return await create(req.body, res);
    } else {
      return await update(id, req.body, res);
    }
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

    if(!id) {
      return res.status(200).send({
        type: 'error',
        message: 'Informe um usuário existente para ser deletado!'
      });
    }

    let usuario = await Usuario.findOne({
      where: {
        id
      }
    });

    if (!usuario) {
      return res.status(200).send({
        type: 'error',
        message: 'Usuário não encontrado!'
      });
    }

    await usuario.destroy();
    return res.status(200).send({
      type: 'success',
      message: 'Usuário excluído com sucesso!',
      data: usuario
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
  create,
  getAll,
  persist,
  update,
  destroy,
  getById

}