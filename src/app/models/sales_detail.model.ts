import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../config/db';

export class SalesDetailModel extends Model<InferAttributes<SalesDetailModel>, InferCreationAttributes<SalesDetailModel>> {
  declare id: CreationOptional<number>;
  declare id_sale: number;
  declare id_product: number;
  declare count: number;
  declare subtotal_bs: number;
  declare subtotal_usd: number;
  declare created_at: CreationOptional<Date>;
}

SalesDetailModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    id_sale: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subtotal_bs: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subtotal_usd: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    tableName: 'sale_detail',
    timestamps: false
  }
);
