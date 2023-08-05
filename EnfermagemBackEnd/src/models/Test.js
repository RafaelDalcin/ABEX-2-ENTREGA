import { DataTypes } from "sequelize";
import { sequelize } from "../config";

const Test = sequelize.define(
  'teste',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
 
    }
});


export default Test;