/**
 * Interfaz para los permisos de los usuarios
 *
 * @export
 * @interface ChargesResponse
 */
export interface ChargesResponse {
  id_user: number;
  role_id: number;
  rol: string;
  module_id: number;
  module: string;
  can_view: number | boolean;
  can_create: number | boolean;
  can_update: number | boolean;
  can_delete: number | boolean;
}
