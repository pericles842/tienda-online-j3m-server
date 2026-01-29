import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from '../config/db';
export class ProductOnOffer extends Model<InferAttributes<ProductOnOffer>, InferCreationAttributes<ProductOnOffer>> {
  declare id: CreationOptional<number>;
  declare product_id: number;
  declare created_at: CreationOptional<Date>;

  static async getProductsOnOffer(): Promise<ProductOnOffer[]> {

    let query = `
        SELECT 
            products_on_offer.id as offer_id,
            products_on_offer.created_at as offer_created_at,
            products.*,
            categories.name as category_name
        FROM products_on_offer
        INNER JOIN products ON products_on_offer.product_id = products.id
        INNER JOIN categories ON products.category_id = categories.id
        WHERE products.status = 'active'
        ORDER BY RAND()`;

    const [rows] = await sequelize.query(query);

    return rows as ProductOnOffer[];
  }


}




ProductOnOffer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    product_id: {
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
    tableName: 'products_on_offer',
    timestamps: false
  }
);
