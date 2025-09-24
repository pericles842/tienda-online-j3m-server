"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "charges",
      [
        {
          name: "Super Admin",
          key: "super_admin",
          view: true,
          create: true,
          update: true,
          delete: true,
          create_at: new Date(),
        },
        {
          name: "Administrador",
          key: "admin",
          view: true,
          create: true,
          update: true,
          delete: true,
          create_at: new Date(),
        },
        {
          name: "Empelado",
          key: "job",
          view: true,
          create: false,
          update: false,
          delete: false,
          create_at: new Date(),
        },
        {
          name: "Empelado II",
          key: "job2",
          view: true,
          create: false,
          update: true,
          delete: false,
          create_at: new Date(),
        },
        {
          name: "Cliente",
          key: "client",
          view: false,
          create: false,
          update: false,
          delete: false,
          create_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("charges", null, {});
  },
};
