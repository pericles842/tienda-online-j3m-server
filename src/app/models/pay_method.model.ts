import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from '../config/db';
import { PayMethodDigitalWallet, PayMethodMobilePay, PayMethodsTypes, PayMethodTransfer } from '../interfaces/pay_method';
export class PayMethodsModel extends Model<InferAttributes<PayMethodsModel>, InferCreationAttributes<PayMethodsModel>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare type: PayMethodsTypes;
  declare datos: PayMethodMobilePay | PayMethodDigitalWallet | PayMethodTransfer;
  declare holder: string;
  declare url_img: string;
  declare created_at: CreationOptional<Date>;
}

PayMethodsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('pagomovil', 'tranferencia', 'billetera_digital', 'divisa'),
      allowNull: false,
      defaultValue: 'pagomovil'
    },
    datos: {
      type: DataTypes.JSON,
      allowNull: true
    },
    holder: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    url_img: {
      type: DataTypes.STRING(255),
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
