"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      ci: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      url_img: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      charge_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      public_group_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      state_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      country_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      parish_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.addConstraint("users", {
      fields: ["charge_id"],
      type: "foreign key",
      name: "fk_charges_users",
      references: {
        table: "charges",
        field: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("users", {
      fields: ["public_group_id"],
      type: "foreign key",
      name: "fk_public_groups_users",
      references: {
        table: "public_groups",
        field: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("users", {
      fields: ["state_id"],
      type: "foreign key",
      name: "fk_states_users",
      references: {
        table: "states",
        field: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("users", {
      fields: ["country_id"],
      type: "foreign key",
      name: "fk_countries_users",
      references: {
        table: "countries",
        field: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("users", {
      fields: ["parish_id"],
      type: "foreign key",
      name: "fk_parishes_users",
      references: {
        table: "parishes",
        field: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("users", null, {});
  },
};
