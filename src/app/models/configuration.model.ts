import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from '../config/db';
export class ConfigurationModel extends Model<InferAttributes<ConfigurationModel>, InferCreationAttributes<ConfigurationModel>> {
  declare id: CreationOptional<number>;
  declare automatic_rate: boolean;
  declare type_rate: 'bcv' | 'binance';
  declare rate_manual: number;
  declare email: string;
  declare phone: string;
  declare ig: string;
  declare fb: string;
}

ConfigurationModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    automatic_rate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    type_rate: {
      type: DataTypes.ENUM('bcv', 'binance'),
      allowNull: false,
      defaultValue: 'bcv'
    },
    rate_manual: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'correo@gmail.com'
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '0424748578'
    },
    ig: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fb: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'configuration',
    timestamps: false
  }
);
