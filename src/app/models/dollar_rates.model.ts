import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from '../config/db';
import axios from 'axios';
import moment from 'moment';
import { ApiRatesResponse } from '../interfaces/api_rates';
export class DollarRatesModel extends Model<InferAttributes<DollarRatesModel>, InferCreationAttributes<DollarRatesModel>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare key: 'bcv' | 'binance';
  declare last_update: string;
  declare price_old: string;
  declare price: number;
  declare url_img: string;

  static async updateDollarRatesJ3m() {
    /**
    * todo las tass se actualzad a asl 12am , 8 am , 1pm
    */
    try {
      let rates_current = await DollarRatesModel.findAll();

      // //*Si falla toma las tasas de la base de datos
      let rates_to_update: ApiRatesResponse | DollarRatesModel[] = await axios
        .get("https://api.dolarvzla.com/public/exchange-rate", {
          headers: {
            Accept: "application/json",
            "x-dolarvzla-key": process.env.API_KEY_DOLARVZLA,
          },
        })
        .then(res => res.data)
        .catch(error => {
          console.warn("Fallo la petición, usando tasa Manual:", error.message);
          return rates_current.map(rate => rate);
        });

      //* validamos la respuesta para ver si es un arreglo (fallo) o si es un objeto (api) 
      if (!Array.isArray(rates_to_update)) {
        rates_current.map(rate_current => {
          if (rate_current.key === "bcv") {
            rate_current.price = rates_to_update.current.usd;
            rate_current.price_old = rate_current.price_old;
            rate_current.last_update = rates_to_update.current.date;

          } else if (rate_current.key === "binance") {
            rate_current.price = rates_to_update.current.eur;
            rate_current.price_old = rate_current.price_old;
            rate_current.last_update = rates_to_update.current.date;
          }
        })
      }

      // //*Realizamos la actualización
      await DollarRatesModel.bulkCreate(rates_current.map(rate => rate.toJSON()), {
        updateOnDuplicate: ['price', 'price_old', 'last_update']
      });

      console.log(
        "Tasas actualizadas",
        moment().format("D [de] MMMM [de] YYYY"),
      );

    } catch (error) {
      console.error("Error en proceso de actualización", error);
      throw error;
    }
  }


}

DollarRatesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false
    },
    key: {
      type: DataTypes.ENUM('bcv', 'binance'),
      allowNull: false,
      defaultValue: 'bcv'
    },
    last_update: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price_old: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    url_img: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'dollar_rates',
    timestamps: false
  }
);
