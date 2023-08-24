import { DataTypes } from "sequelize";
import { sequelize } from "../config";
import Usuario from "./Usuario";

const Endereco = sequelize.define(
  'endereco',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    logradouro: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    UF: {
        type: DataTypes.CHAR(2),
        allowNull: false,
    },
    CEP: {
        type: DataTypes.STRING(9),
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

Endereco.belongsTo(Usuario, { 
    as: 'usuario', 
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
      name: 'idUsuario',
      field: 'id_usuario',
      allowNull: false
    }
  });


export default Endereco;