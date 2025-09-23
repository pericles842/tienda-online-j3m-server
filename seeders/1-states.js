"use strict";
const states = require("../data/states.json");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = states.map((s) => ({
      id: s.id,
      name: s.name,
    }));

    //?la data oficial esta en gitub, los id no son incrementales por que tiene su propio esquema
    //? ve al json agrega los estados y ciudades dependiendo del id que esta en la data de github

    await queryInterface.bulkInsert("states", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("states", null, {});
  },
};

