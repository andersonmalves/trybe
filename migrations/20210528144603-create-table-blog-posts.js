'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BlogPosts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      published: {
        type: Sequelize.DATE,
        default: new Date(),
        allowNull: false
      },
      updated: {
        type: Sequelize.DATE,
        default: new Date(),
        allowNull: false
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('BlogPosts');
  }
};
