import { Optional } from "sequelize";


interface UsuarioAttributes {
    id: number;
    nombre: string;
    correo: string;
    telefono: string;
    password: string | null;
    creado_en: Date;
}

