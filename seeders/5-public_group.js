"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "public_groups",
      [
        {
          name: "Capupel",
          rif: "j-123456789",
          email: "correo@gmail",
          url_img: "",
          created_at: new Date(),
        },
        {
          name: "Cado-minfra",
          rif: "j-123456789",
          email: "correo@gmail",
          url_img: "",
          created_at: new Date(),
        },
        {
          name: "Cabisttip",
          rif: "j-41228110-0",
          email: "correo@gmail",
          url_img: "",
          created_at: new Date(),
        },
        {
          name: "capseojpan",
          rif: "j-123456789",
          email: "correo@gmail",
          url_img: "",
          created_at: new Date(),
        },
        {
          name: "CAIUPC",
          rif: "j-123456789",
          email: "correo@gmail",
          url_img: "",
          created_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("public_groups", null, {});
  },
};
