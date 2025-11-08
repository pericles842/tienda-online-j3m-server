'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'configuration',
      [
        {
          automatic_rate: true,
          type_rate: 'bcv',
          rate_manual: 250.9,
          email: 'j3m@gmail.com',
          phone: '0412345678',
          ig: '@j3m',
          fb: '@j3m'
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('configuration', null, {});
  }
};
