import { Usuario } from "../models/user.model";

export interface userResponse extends Usuario {
  savings_box: null | string;
  state: string;
  municipality: string;
  parish: string;
  role: string;
  permissions: string;
}
