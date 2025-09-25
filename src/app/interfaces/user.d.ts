import { Usuario } from "../models/user.model";
import { ChargesResponse } from "./charges";

export interface userResponse extends Usuario {
  savings_box: null | string;
  state: string;
  municipality: string;
  parish: string;
  role: string;
  permissions?: ChargesResponse[];
}
