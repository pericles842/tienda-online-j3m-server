"use strict";

//!MUNICIPIOS
const parishes = require("../data/parishes.json");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = parishes.map((p) => ({
      id: p.id,
      city_id: p.city_id,
      name: p.name,
    }));

    //?la data oficial esta en gitub, los id no son incrementales por que tiene su propio esquema
    //? ve al json agrega los estados y ciudades dependiendo del id que esta en la data de github

    await queryInterface.bulkInsert("parishes", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("parishes", null, {});
  },
};
