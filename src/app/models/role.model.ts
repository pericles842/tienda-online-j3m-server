import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  QueryTypes,
} from "sequelize";
import { sequelize } from "../config/db";
import { ChargesCreate, ChargesResponse } from "../interfaces/charges";

export class Role extends Model<
  InferAttributes<Role>,
  InferCreationAttributes<Role>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;
  declare created_at: CreationOptional<Date>;
  permissions?: any;
}

export class Module extends Model<
  InferAttributes<Module>,
  InferCreationAttributes<Module>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;
  declare created_at: CreationOptional<Date>;
}

export class ModulePermissions extends Model<
  InferAttributes<ModulePermissions>,
  InferCreationAttributes<ModulePermissions>
> {
  declare id: CreationOptional<number>;
  declare role_id: number;
  declare module_id: number;
  declare can_view: boolean | number;
  declare can_create: boolean | number;
  declare can_update: boolean | number;
  declare can_delete: boolean | number;
  declare created_at: CreationOptional<Date>;
}

/**
 * Clase para los permisos y roles
 *
 * @export
 * @class ChargesUsers
 */
export class UserPermissions {
  /**
   *Obtiene los permisos de un usuario
   *
   * @static
   * @param {number} id_user
   * @return {*}
   * @memberof UserPermissions
   */
  static async getUserPermission(id_user: number) {
    let permissions = await sequelize.query<ChargesResponse>(
      `select 
        users.id as id_user,
        module_permissions.role_id,
        roles.name as rol,
        module_permissions.module_id,
        modules.name as module,
        module_permissions.can_view,
        module_permissions.can_create,
        module_permissions.can_update,
        module_permissions.can_delete
        from users
        INNER JOIN module_permissions ON module_permissions.role_id = users.rol_id
        INNER JOIN roles on roles.id = module_permissions.role_id
        INNER JOIN modules on modules.id = module_permissions.module_id
        WHERE users.id  = :id_user`,
      {
        replacements: { id_user },
        type: QueryTypes.SELECT,
      }
    );

    return permissions.map((p) => {
      p.can_view = !!p.can_view;
      p.can_create = !!p.can_create;
      p.can_update = !!p.can_update;
      p.can_delete = !!p.can_delete;
      return p;
    });
  }

  /**
   * Lista los cargos y los permisos de los modulos
   *
   * @static
   * @return {*}
   * @memberof UserPermissions
   */
  static async getPermission() {
    let roles = await Role.findAll(); // o simplemente sin raw
    let permissions = await ModulePermissions.findAll();

    let result = roles.map((r) => {
      const role = r.get({ plain: true }); // convierte en objeto normal
      role.permissions = permissions.filter((p) => p.role_id === r.id);
      return role;
    });

    return result as ChargesCreate[];
  }
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "roles",
    timestamps: false,
  }
);

Module.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "modules",
    timestamps: false,
  }
);

ModulePermissions.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    module_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    can_view: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    can_create: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    can_update: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    can_delete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "module_permissions",
    timestamps: false,
  }
);
