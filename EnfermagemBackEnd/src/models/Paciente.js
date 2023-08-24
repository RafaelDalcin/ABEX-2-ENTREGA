import { DataTypes } from "sequelize";
import { sequelize } from "../config";
import Familia from "./Familia";
import Usuario from "./Usuario";

const Paciente = sequelize.define(
  'paciente',
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
    sexo: {
      type: DataTypes.CHAR(1),
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING(12),
      allowNull: false,
      unique: true
    },
    dataNascimento: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'data_nasc'
    },
    relacaoFamiliar: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'relacao_familiar'
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

Paciente.belongsTo(Familia, { 
    as: 'familia', 
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
      name: 'idFamilia',
      field: 'id_familia',
      allowNull: false
    }
  });

  Paciente.belongsTo(Usuario, { 
    as: 'usuario', 
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
      name: 'idUsuario',
      field: 'id_usuario',
      allowNull: false
    }
  });


export default Paciente;