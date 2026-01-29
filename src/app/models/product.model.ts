import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, QueryTypes } from 'sequelize';
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
  declare category_name?: string;
  declare quantity?: number;

  declare status: StatusProduct;
  declare url_img?: string;

  declare type_product: ProductTemplateKeys;
  declare attributes: ProductAttributes<ProductTemplateKeys, productKeyGeneralAttributes>;

  declare user_create_id: number;
  declare user_update_id: number | null;

  declare updated_at: CreationOptional<number>;
  declare created_at: CreationOptional<Date>;

  private static baseQuery = `
    SELECT 
      0 as quantity,
      categories.name as category_name,
      users_create.email as email_user_create,
      users_update.email as email_user_update,
      products.* 
    FROM products
    INNER JOIN categories on products.category_id = categories.id
    INNER JOIN users as users_create on products.user_create_id = users_create.id
    LEFT JOIN users as users_update on products.user_update_id = users_update.id
  `;

  static async getAllProducts(productId: number | null = null): Promise<ProductModel[]> {
    let query = ProductModel.baseQuery;
    let replacements: any = [];

    if (productId) {
      query += ` WHERE products.id = ?`;
      replacements = [productId];
    }

    const rows = await sequelize.query(query, {
      replacements,
      type: QueryTypes.SELECT
    });

    return rows as ProductModel[];
  }

  static async getProductsFilter(searchTerm: string | null = null, page: number, limit: number): Promise<{ data: ProductModel[], total: number, totalPages: number }> {


    let query = ProductModel.baseQuery;

    const params: any = { limit, offset: (page - 1) * limit };

    let whereQuery = '';

    if (searchTerm && searchTerm.trim() !== '') {

      const cleanTerm = searchTerm.endsWith('/') ? searchTerm.slice(0, -1) : searchTerm;

      query += ` WHERE (
      products.name LIKE :term OR 
      categories.name LIKE :term OR 
      products.brand LIKE :term OR 
      products.reference LIKE :term
    )`;

      params.term = `%${cleanTerm}%`;
    }

    const countQuery = `SELECT COUNT(*) as total FROM (${query} ${whereQuery}) as results`;

    const countRows: any = await sequelize.query(countQuery, {
      replacements: params,
      type: QueryTypes.SELECT
    });

    const totalRows = parseInt(countRows[0].total);
    const totalPages = Math.ceil(totalRows / limit);

    const dataQuery = `${query} ${whereQuery} LIMIT :limit OFFSET :offset`;
    const rows = await sequelize.query(dataQuery, {
      replacements: params,
      type: QueryTypes.SELECT
    });

    return { data: rows as ProductModel[], total: totalRows, totalPages };
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
