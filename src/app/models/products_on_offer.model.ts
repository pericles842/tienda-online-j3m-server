import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from '../config/db';
import { PayMethodDigitalWallet, PayMethodMobilePay, PayMethodsTypes, PayMethodTransfer } from '../interfaces/pay_method';
export class ProductOnOffer extends Model<InferAttributes<ProductOnOffer>, InferCreationAttributes<ProductOnOffer>> {
  declare id: CreationOptional<number>;
  declare id_product: number;
  declare created_at: CreationOptional<Date>;
}

ProductOnOffer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    id_product: {
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
    tableName: 'payment_methods',
    timestamps: false
  }
);
