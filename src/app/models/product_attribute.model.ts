import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import { ProductAttributes, ProductTemplateKeys } from '../interfaces/product_attibute';

export class ProductAttributeModel extends Model<
  InferAttributes<ProductAttributeModel>,
  InferCreationAttributes<ProductAttributeModel>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare key: ProductTemplateKeys;
  declare description: string;
  declare attributes: ProductAttributes<ProductTemplateKeys>[];
  declare created_at: CreationOptional<Date>;
}

ProductAttributeModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'otros'
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    attributes: {
      type: DataTypes.JSON,
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
    tableName: 'product_attributes',
    timestamps: false
  }
);
