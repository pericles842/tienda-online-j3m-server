import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import {
  ProductAttributes,
  productKeyGeneralAttributes,
  ProductTemplateKeys,
  StatusProduct
} from '../interfaces/product_attibute';

export class ProductModel extends Model<InferAttributes<ProductModel>, InferCreationAttributes<ProductModel>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare brand: string;
  declare description: string | null;
  declare discount: number | null;
  declare reference: string;

  declare cost: number;
  declare price: number;
  declare stock: number;

  declare min_stock: number | null;
  declare category_id: number;
  category_name?: string;

  declare status: StatusProduct;
  declare url_img?: string;

  declare type_product: ProductTemplateKeys;
  declare attributes: ProductAttributes<ProductTemplateKeys, productKeyGeneralAttributes>;

  declare user_create_id: number;
  declare user_update_id: number | null;

  declare updated_at: CreationOptional<number>;
  declare created_at: CreationOptional<Date>;

  static async getAllProducts() {
    let query = `SELECT 
categories.name as category_name,
users_create.email as email_user_create,
users_update.email as email_user_update,
products.* FROM products
    INNER JOIN categories on products.category_id = categories.id
    INNER JOIN users as users_create on products.user_create_id = users_create.id
    LEFT JOIN users as users_update on products.user_update_id = users_update.id`;

    const [products] = await sequelize.query(query);
    return products;
  }
}

ProductModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    brand: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    discount: {
      type: DataTypes.DOUBLE
    },
    reference: {
      type: DataTypes.STRING
    },
    cost: {
      type: DataTypes.DOUBLE
    },
    price: {
      type: DataTypes.DOUBLE
    },
    stock: {
      type: DataTypes.INTEGER
    },
    min_stock: {
      type: DataTypes.INTEGER
    },
    category_id: {
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'damaged')
    },
    url_img: {
      type: DataTypes.STRING
    },
    type_product: {
      type: DataTypes.STRING
    },
    attributes: {
      type: DataTypes.JSON
    },
    user_create_id: {
      type: DataTypes.INTEGER
    },
    user_update_id: {
      type: DataTypes.INTEGER
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: null
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    tableName: 'products',
    timestamps: false
  }
);
