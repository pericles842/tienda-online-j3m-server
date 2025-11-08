'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'categories',
      [
        {
          name: 'Electrónica',
          parent_id: null,
          created_at: new Date()
        },
        {
          name: 'Moda',
          parent_id: null,
          created_at: new Date()
        },
        {
          name: 'Teléfonos',
          parent_id: 1,
          created_at: new Date()
        },
        {
          name: 'Computadoras',
          parent_id: 1,
          created_at: new Date()
        },
        {
          name: 'Ropa de Hombre',
          parent_id: 2,
          created_at: new Date()
        },
        {
          name: 'Ropa de Mujer',
          parent_id: 2,
          created_at: new Date()
        },
        {
          name: 'Accesorios de Teléfono',
          parent_id: 3,
          created_at: new Date()
        },
        {
          name: 'Laptops',
          parent_id: 4,
          created_at: new Date()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
