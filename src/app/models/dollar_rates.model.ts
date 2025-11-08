import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from '../config/db';
export class DollarRatesModel extends Model<InferAttributes<DollarRatesModel>, InferCreationAttributes<DollarRatesModel>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare key: 'bcv' | 'binance';
  declare last_update: string;
  declare price_old: string;
  declare price: number;
  declare url_img: string;
}

DollarRatesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false
    },
    key: {
      type: DataTypes.ENUM('bcv', 'binance'),
      allowNull: false,
      defaultValue: 'bcv'
    },
    last_update: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price_old: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    url_img: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'dollar_rates',
    timestamps: false
  }
);
