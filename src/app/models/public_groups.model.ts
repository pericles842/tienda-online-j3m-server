import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from '../config/db';
export class PublicGroupsModel extends Model<InferAttributes<PublicGroupsModel>, InferCreationAttributes<PublicGroupsModel>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;
  declare rif: string;
  declare email: string;
  declare url_img: string;
  declare created_at: CreationOptional<Date>;
}

PublicGroupsModel.init(
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
        notEmpty: { msg: 'El nombre del grupo es requerido' }
      }
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null
    },
    rif: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El correo es requerido' }
      }
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
    tableName: 'public_groups',
    timestamps: false
  }
);
