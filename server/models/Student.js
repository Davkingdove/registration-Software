const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Student = sequelize.define('Student', {
  firstname: DataTypes.STRING,
  lastname: DataTypes.STRING,

  dateOfBirth: DataTypes.DATEONLY,
  beceGrade: DataTypes.INTEGER,
  previousSchool: DataTypes.STRING,
  motherName: DataTypes.STRING,
  motherContact: DataTypes.STRING,
  fatherName: DataTypes.STRING,
  fatherContact: DataTypes.STRING,
  program: DataTypes.STRING
});

module.exports = Student;
