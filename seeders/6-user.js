"use strict";

const { name } = require("ejs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
         {
            name: "Louis",
            email: "admin@gmail.com",
            password: "admin",
            last_name: "Sarmiento",
            phone: "04248473847",
            ci: "30329927",
            rol_id: 1,
            state_id: 24,
            city_id: 462,
            parish_id: 1126,
            created_at: new Date(),
         },
         {
            name: "Louis",
            email: "slouis482@gmail.com",
            password: "admin",
            last_name: "Sarmiento",
            phone: "04648473847",
            ci: "30329967",
            public_group_id: 1,
            rol_id: 6,
            state_id: 24,
            city_id: 462,
            parish_id: 1126,
            created_at: new Date(),
         }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
