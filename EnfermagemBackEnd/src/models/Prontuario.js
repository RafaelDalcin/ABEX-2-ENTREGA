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