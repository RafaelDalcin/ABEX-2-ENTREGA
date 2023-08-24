import { DataTypes } from "sequelize";
import { sequelize } from "../config";
import Paciente from "./Paciente";

const Prontuario = sequelize.define(
  'prontuario',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    CPF: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    cidadeEstado: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'cidade_estado'
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    },
    pressaoArterial: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        field: 'pressao_arterial'
    },
    HTG: {
      type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    IMC: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    pesoCorporal: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        field: 'peso_corporal'
    },
    temperatura: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    pulso: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

Prontuario.belongsTo(Paciente, { 
    as: 'prontuario', 
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
      name: 'idPaciente',
      field: 'id_paciente',
      allowNull: false
    }
  });


export default Prontuario;