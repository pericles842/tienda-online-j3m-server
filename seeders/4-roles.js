"use strict";

const roles = require("../data/roles.json");
const modules = require("../data/modules.json");
const module_permissions = require("../data/module_permissions.json");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = roles.map((r) => ({
      name: r.name,
      description: r.description,
      created_at: new Date(),
    }));

    const modulesData = modules.map((m) => ({
      name: m.name,
      description: m.description,
      created_at: new Date(),
    }));

    const module_permissionsData = module_permissions.map((m) => ({
      module_id: m.module_id,
      role_id: m.role_id,
      created_at: new Date(),
    }));

    await queryInterface.bulkInsert("roles", data, {});
    await queryInterface.bulkInsert("modules", modulesData, {});
    await queryInterface.bulkInsert(
      "module_permissions",
      module_permissionsData,
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("roles", null, {});
    await queryInterface.bulkDelete("modules", null, {});
    await queryInterface.bulkDelete("module_permissions", null, {});
  },
};
