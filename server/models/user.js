'use strict';
const {
  Model
} = require('sequelize');
const passwordGenerator = require('../middleware/autopassword')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'Username input is null'
          },
          notEmpty: {
            args: true,
            msg: 'Username cannot be empty'
          }
        }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'Role input is null'
          },
          notEmpty: {
            args: true,
            msg: 'Role cannot be empty'
          },
          isIn: {
            args: [['Admin', 'User']],
            msg: 'Role must be Admin or User'
          },
        }
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((instance, options) => {
    instance.password = passwordGenerator()
  })

  return User;
};