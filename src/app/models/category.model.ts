import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import { PrimeNgNode } from '../interfaces/category';
import moment from 'moment';

export class CategoryModel extends Model<InferAttributes<CategoryModel>, InferCreationAttributes<CategoryModel>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare parent_id: number;
  declare created_at: CreationOptional<Date | string>;

  /**
   * retorna una arbol de categorias
   *
   * @static
   * @return {*}
   * @memberof CategoryModel
   */
  static async getCategoriesTree() {
    let categories = await CategoryModel.findAll({ raw: true });

    let categoryNodes = await CategoryModel.buildPrimeNgTree(categories);

    return categoryNodes;
  }

  /**
   *transforma un modelo de categorias en un arbol
   *
   * @static
   * @param {CategoryModel[]} categories
   * @return {*}  {Promise<PrimeNgNode[]>}
   * @memberof CategoryModel
   */
  static async buildPrimeNgTree(categories: CategoryModel[]): Promise<PrimeNgNode[]> {
    const map = new Map<number, any>();

    for (let cat of categories) {
      cat.created_at = moment(cat.created_at).format('DD-MM-YYYY');
      map.set(cat.id, {
        id: cat.id,
        key: String(cat.id),
        label: cat.name,
        data: { ...cat },
        children: [] // sin parent
      });
    }

    const roots: any[] = [];

    for (const cat of categories) {
      const node = map.get(cat.id);
      if (cat.parent_id === null) {
        roots.push(node);
      } else {
        const parentNode = map.get(cat.parent_id);
        if (parentNode) {
          parentNode.children.push(node);
        } else {
          roots.push(node);
        }
      }
    }

    // opcional: marcar hojas
    const markLeaf = (n: any) => {
      if (!n.children || n.children.length === 0) {
        n.children = [];
        n.leaf = true;
      } else {
        n.leaf = false;
        n.children.forEach(markLeaf);
      }
    };
    roots.forEach(markLeaf);

    return roots;
  }
}

CategoryModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El nombre de la categoría es requerido' }
      }
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    tableName: 'categories',
    timestamps: false
  }
);
