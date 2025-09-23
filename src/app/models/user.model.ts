import { DataTypes, Model, Optional } from 'sequelize';
import { UsuarioAttributes } from '../interfaces/user';
import { sequelize } from '../config/db';


export class Usuario extends Model
  <UsuarioAttributes, Optional<UsuarioAttributes, 'creado_en'>> implements UsuarioAttributes {

  public id: number = 0;
  public nombre!: string;
  public correo!: string;
  public telefono!: string;
  public password!: string | null;
  public creado_en: Date = new Date();

  
  static async listar() {
    try {
      const [users] = await sequelize.query('SELECT * FROM usuarios');
      return users;
    } catch (error) {
      console.error(error);
      throw new Error('Error al obtener los usuarios');
    }
  }
}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    creado_en: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'usuarios',
    timestamps: false,
  }
);

