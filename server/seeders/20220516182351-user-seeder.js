'use strict';

const fs = require('fs');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     let data = JSON.parse(fs.readFileSync('./seed-file/user.json', 'utf-8'))
     data.forEach(element => {
       element.createdAt = new Date()
       element.updatedAt = new Date()
     });

     await queryInterface.bulkInsert('Users', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {});
  }
};
