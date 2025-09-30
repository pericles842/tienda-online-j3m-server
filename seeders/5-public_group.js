"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "public_groups",
      [
        {
          name: "Persona Jurídica",
          rif: "",
          email: "",
          url_img: "",
          created_at: new Date(),
        },
        {
          name: "CAMUBOL",
          description: "Alcaldía de Ccs",
          rif: "j-123456789",
          email: "correo@gmail",
          url_img: "",
          created_at: new Date(),
        },
        {
          name: "CAFUALCAML",
          rif: "j-123456789",
          description: "Alcaldía de Ccs",
          email: "correo@gmail",
          url_img: "",
          created_at: new Date(),
        },
        {
          name: "IPSTAPO",
          description: "Universidad de Oriente ",
          rif: "j-123456789",
          email: "mailto@gmail",
          url_img: "",
          created_at: new Date(),
        },
        {
          name: "Capupel",
          description: "Alcaldía de Ccs",
          rif: "j-123456789",
          email: "correo@gmail",
          url_img: "",
          created_at: new Date(),
        },
        {
          name: "Cado-minfra",
          description: "Alcaldía de Ccs",
          rif: "j-123456789",
          email: "correo@gmail",
          url_img: "",
          created_at: new Date(),
        },
        {
          name: "Cabisttip",
          description: "Alcaldía de Ccs",
          rif: "j-41228110-0",
          email: "correo@gmail",
          url_img: "",
          created_at: new Date(),
        },
        {
          name: "capseojpan",
          description: "Alcaldía de Ccs",
          rif: "j-123456789",
          email: "correo@gmail",
          url_img: "",
          created_at: new Date(),
        },
        {
          name: "CAIUPC",
          description: "Alcaldía de Ccs",
          rif: "j-123456789",
          email: "correo@gmail",
          url_img: "",
          created_at: new Date(),
        },
        {
          name: "Otros",
          description: null,
          rif: "",
          email: "",
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
