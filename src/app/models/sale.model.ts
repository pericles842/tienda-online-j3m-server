import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, QueryTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { Query } from 'mysql2/typings/mysql/lib/protocol/sequences/Query';

export class SalesModel extends Model<InferAttributes<SalesModel>, InferCreationAttributes<SalesModel>> {
  declare id: CreationOptional<number>;
  declare id_user: number;
  declare total_usd: number;
  declare total_bs: number;
  declare rate_day: number;
  declare reference: string;
  declare pay_method_id: number;
  declare url_img: string;
  declare status?: 'approved' | 'refused' | 'pending';
  declare approved_user_id: number | null;
  declare rejected_user_id: number | null;
  declare updated_at: CreationOptional<Date>;
  declare created_at: CreationOptional<Date>;


  static async getAllSales() {
    let query = ` SELECT 
      id, 
      id_user, 
      total_usd, 
      total_bs, 
      rate_day, 
      reference, 
      pay_method_id, 
      status, 
      approved_user_id, 
      rejected_user_id, 
      created_at, 
      updated_at, 
      'https://grupo-j3m.s3.us-east-2.amazonaws.com/public/pago-movil.webp' as url_img from sales `

    return sequelize.query<SalesModel>(query, { type: QueryTypes.SELECT, });
  }

}

SalesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_usd: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_bs: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rate_day: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pay_method_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url_img: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('approved', 'refused', 'pending'),
      allowNull: false,
      defaultValue: 'pending'
    },
    approved_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    },
    rejected_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    },
    updated_at: {
      type: DataTypes.DATE,
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
    tableName: 'sales',
    timestamps: false
  }
);
