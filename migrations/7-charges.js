'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("charges", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name:{
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      view:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      create:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      update:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      delete:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      create_at:{
        type: Sequelize.DATE,
        allowNull: false,

      }
    })
    await queryInterface.addConstraint("charges", {
      fields: ["user_create_id"],
      type: "foreign key",
      name: "fk_users_charges_create",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    })

    await queryInterface.addConstraint("charges", {
      fields: ["user_update_id"],
      type: "foreign key",
      name: "fk_users_charges_update",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    })

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("charges", null, {});
  }
};
