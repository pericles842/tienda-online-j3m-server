import { QueryTypes } from "sequelize";
import { sequelize } from "../config/db";
import { Municipality, Parish, State } from "../interfaces/states";
export class States {
  /**
   * Obtiene los estados
   *
   * @static
   * @return {*}
   * @memberof States
   */
  static async getStates() {
    try {
      const states = await sequelize.query<State>(`select * from states`, {
        type: QueryTypes.SELECT,
      });
      return states;
    } catch (error) {
      throw error;
    }
  }
  static async getMunicipalities(state_id: number) {
    try {
      const state = await sequelize.query<Municipality>(
        `SELECT * from cities  WHERE cities.state_id = :state_id`,
        {
          replacements: { state_id },
          type: QueryTypes.SELECT,
        }
      );
      return state;
    } catch (error) {
      throw error;
    }
  }

  static async getParishes(city_id: number) {
    try {
      const state = await sequelize.query<Parish>(
        `SELECT * from parishes  WHERE parishes.city_id = :city_id`,
        {
          replacements: { city_id },
          type: QueryTypes.SELECT,
        }
      );
      return state;
    } catch (error) {
      throw error;
    }
  }
}
