import { DataTypes } from "sequelize";
import { sequelize } from "../config";
import Grupo from "./Grupo";
import Usuario from "./Usuario";

const Aluno = sequelize.define(
  'aluno',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    matricula: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    curso: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    semestre: {
      type: DataTypes.STRING(30),
      allowNull: false,
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

Aluno.belongsTo(Grupo, { 
    as: 'grupo', 
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
      name: 'idGrupo',
      field: 'id_grupo',
      allowNull: false
    }
  });

  Aluno.belongsTo(Usuario, { 
    as: 'usuario', 
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
      name: 'idUsuario',
      field: 'id_usuario',
      allowNull: false
    }
  });





export default Aluno;