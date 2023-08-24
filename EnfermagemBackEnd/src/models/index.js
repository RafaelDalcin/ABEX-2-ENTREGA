import Aluno from "./Aluno";
import Grupo from "./Grupo";
import Familia from "./Familia";
import Prontuario from "./Prontuario";
import Usuario from "./Usuario";
import Endereco from "./Endereco";
import Paciente from "./Paciente";


const createTables = (async () => {

  await Grupo.sync({ force: true });
  await Familia.sync({ force: true });
  await Usuario.sync({ force: true });
  await Aluno.sync({ force: true });
  await Paciente.sync({ force: true });
  await Endereco.sync({ force: true });
  await Prontuario.sync({ force: true });


});
createTables();

// const dropTables = (async () => {

//   await Aluno.drop({ force: true })
//   await MembroFamilia.drop({ force: true })
//   await Grupo.drop({ force: true })
//   await Familia.drop({ force: true })

// });

// dropTables();