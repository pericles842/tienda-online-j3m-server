"use strict";

//!MUNICIPIOS
const cities = require("../data/cities.json");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = cities.map((s) => ({
      id: s.id,
      state_id: s.state_id,
      name: s.name,
    }));

    //?la data oficial esta en gitub, los id no son incrementales por que tiene su propio esquema
    //? ve al json agrega los estados y ciudades dependiendo del id que esta en la data de github

    await queryInterface.bulkInsert("cities", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("cities", null, {});
  },
};
