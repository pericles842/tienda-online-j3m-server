'use strict';

const { name } = require('ejs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'product_attributes',
      [
        {
          name: 'Tecnología',
          key: 'technology',
          description: 'Producto tecnológico',
          created_at: new Date(),
          attributes: [
            {
              key: 'color',
              description: 'Color del producto',
              data: null,
              value: null
            },
            {
              key: 'model',
              description: 'Modelo del producto',
              data: null,
              value: null
            },
            {
              key: 'storage',
              description: 'Almacenamiento del producto',
              data: null,
              value: null
            }
          ]
        },
        {
          name: 'Textil',
          key: 'textile',
          description: 'Producto textil',
          created_at: new Date(),
          attributes: [
            {
              key: 'color',
              description: 'Color del producto',
              data: null,
              value: null
            },
            {
              key: 'talla',
              description: 'Talla del producto',
              data: [
                { key: 's', value: 'S' },
                { key: 'm', value: 'M' },
                { key: 'l', value: 'L' },
                { key: 'xl', value: 'XL' }
              ],
              value: 's'
            },
            {
              key: 'gender',
              description: 'Para caballero o dama',
              data: [
                { key: 'male', value: 'Caballero' },
                { key: 'female', value: 'Dama' }
              ],
              value: 'male'
            },
            {
              key: 'style_clothes',
              description: 'Estilo de ropa',
              data: [
                { key: 'casual', value: 'Casual' },
                { key: 'formal', value: 'Formal' },
                { key: 'sport', value: 'Deportivo' }
              ],
              value: 'casual'
            }
          ]
        },
        {
          name: 'alimentos',
          key: 'food',
          description: 'Producto alimenticio',
          created_at: new Date(),
          attributes: [
            {
              key: 'marca',
              description: 'Marca del producto',
              data: null,
              value: null
            },
            {
              key: 'unit',
              description: 'Unidad del producto',
              data: [
                { key: 'un', value: 'Un' },
                { key: 'mg', value: 'Mg' },
                { key: 'oz', value: 'Oz' },
                { key: 'lb', value: 'Lb' },
                { key: 'kg', value: 'Kg' },
                { key: 'lt', value: 'Lt' },
                { key: 'ml', value: 'Ml' },
                { key: 'g', value: 'G' }
              ],
              value: 'kg'
            },
            {
              key: 'amount',
              description: 'Cantidad del producto según la unidad de medida',
              data: null,
              value: null
            },
            {
              key: 'expiration_date',
              description: 'fecha de vencimiento del producto',
              data: null,
              value: null
            }
          ]
        },
        {
          name: 'Farmacia',
          key: 'farmacia',
          description: 'Producto farmacéutico',
          created_at: new Date(),
          attributes: [
            {
              key: 'manufacturer',
              description: 'Fabricante del producto',
              data: null,
              value: null
            },
            {
              key: 'unit',
              description: 'Unidad del producto',
              data: [
                { key: 'un', value: 'Un' },
                { key: 'mg', value: 'Mg' },
                { key: 'oz', value: 'Oz' },
                { key: 'lb', value: 'Lb' },
                { key: 'kg', value: 'Kg' },
                { key: 'lt', value: 'Lt' },
                { key: 'ml', value: 'Ml' },
                { key: 'g', value: 'G' }
              ],
              value: 'kg'
            },
            {
              key: 'amount',
              description: 'Cantidad del producto según la unidad de medida',
              data: null,
              value: null
            },
            {
              key: 'pharmaceutical_presentation',
              description: 'Presentación del producto',
              data: [
                { key: 'tablets', value: 'Tabletas' },
                { key: 'capsules', value: 'Capsulas' },
                { key: 'syrup', value: 'Syrup' },
                { key: 'jarabe', value: 'Jarabe' },
                { key: 'crema', value: 'Crema' },
                { key: 'polvo', value: 'Polvo' },
                { key: 'gel', value: 'Gel' },
                { key: 'pomada', value: 'Pomada' },
                { key: 'pasta', value: 'Pasta' },
                { key: 'liquido', value: 'Liquido' },
                { key: 'injectable', value: 'injectable' }
              ],
              value: 'tablets'
            },
            {
              key: 'expiration_date',
              description: 'fecha de vencimiento del producto',
              data: null,
              value: null
            }
          ]
        },
        {
          name: 'otros',
          key: 'other',
          description: 'Otros productos',
          created_at: new Date(),
          attributes: []
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('product_attributes', null, {});
  }
};
