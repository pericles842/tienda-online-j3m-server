'use strict';

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(12);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'dollar_rates',
      [
        {
          title: 'Dolar Bcv',
          key: 'bcv',
          last_update: new Date(),
          price_old: '105.34',
          price: 105.34,
          url_img: 'https://monitordolarvenezuela.com/img/logos/bcv.webp'
        },
        {
          title: 'Dolar Binance',
          key: 'binance',
          last_update: new Date(),
          price_old: '240.34',
          price: 300.34,
          url_img: 'https://monitordolarvenezuela.com/img/logos/binance-logo.svg'
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('dollar_rates', null, {});
  }
};
