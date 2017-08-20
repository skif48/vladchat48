"use strict";

const Sequelize = require('sequelize');
const config = require('./dbconfig');
const fs = require('fs');

const sequelize = new Sequelize(`postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.dbName}`, {
  logging : dbLogger
});

function establishDBConnection() {
  return sequelize.authenticate()
    .then(() => {
      console.log('DB CONNECTION SUCCESSFULLY ESTABLISHED');
      return sequelize.sync({force : true})
    })
    .catch(err => {
      console.log('DB CONNECTION FAILURE:', err);
    });
}

function dbLogger(data) {
  console.log(data);
  fs.appendFile('./dblogs.log', data, err => {
    if(err) {
      console.log('DB LOGGING ERROR:', err);
    }
  });
}

module.exports = {establishDBConnection, sequelize};
