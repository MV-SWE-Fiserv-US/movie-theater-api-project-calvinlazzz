const { Sequelize, DataTypes, Model } = require('sequelize')
const path = require('path')
const express = require('express');

const db = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: path.join(__dirname, 'db.sqlite'),
  logging: false
})
// test

module.exports = { db, DataTypes, Model }
