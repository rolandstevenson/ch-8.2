// 'use strict';

const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { Role } = require('../../app/models');

const names = [
  'Johnny',
  'Fikri',
  'Brian',
  'Ranggawarsita',
  'Jayabaya',
];

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = '123456';
    const encryptedPassword = bcrypt.hashSync(password, 10);
    const timestamp = new Date();

    /*
    const role = await Role.findOne({
      where: {
        name: 'CUSTOMER',
      },
    });
    */

    /*
    const users = names.map((name) => ({
      name,
      email: `${name.toLowerCase()}@binar.co.id`,
      encryptedPassword,
      roleId: role.id,
      createdAt: timestamp,
      updatedAt: timestamp,
    }));

    await queryInterface.bulkInsert('Users', users, {});
  },
  */

    await queryInterface.bulkInsert('Users', [{
      name: 'Customer',
      email: 'customer@binar.co.id',
      encryptedPassword,
      roleId: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
    {
      name: 'Admin',
      email: 'admin@binar.co.id',
      encryptedPassword,
      roleId: 2,
      createdAt: timestamp,
      updatedAt: timestamp,
    }], {});
  },
  /*
 async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', { name: { [Op.in]: names } }, {});
  },
  */

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
