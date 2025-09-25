import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { sequelize } from "../config/db";
import { userResponse } from "../interfaces/user";

export class Usuario extends Model<
  InferAttributes<Usuario>,
  InferCreationAttributes<Usuario>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare last_name: string;
  declare email: string;
  declare phone: string;
  declare password: string;
  declare ci: string;
  declare url_img: string | null;
  declare rol_id: number;
  declare public_group_id: number | null;
  declare state_id: number;
  declare city_id: number;
  declare parish_id: number;
  declare created_at: CreationOptional<Date>;

  static async getUsers(id: number | null = null) {
    try {
      let query = `SELECT 
      users.*,
      public_groups.name as savings_box ,
      states.name as state ,
      cities.name as municipality ,
      parishes.name as parish,
      roles.name as role
      FROM users 
      LEFT JOIN public_groups on public_groups.id = users.public_group_id
      INNER JOIN states ON states.id = users.state_id
      INNER JOIN cities ON cities.id = users.city_id
      INNER JOIN parishes ON parishes.id = users.parish_id
      INNER JOIN roles ON roles.id = users.rol_id `;
      if (id) {
        query += ` WHERE users.id = ${id};`;
      }

      const [users] = await sequelize.query(query);
      return users as userResponse[];
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener los usuarios");
    }
  }
}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: "El correo no puede estar vació" },
      },
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: "El teléfono no puede estar vacío" },
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: "La contraseña no puede estar vacía" },
      },
    },
    ci: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: "La cédula no puede estar vacía" },
      },
    },
    url_img: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    public_group_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    parish_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: false,
  }
);
