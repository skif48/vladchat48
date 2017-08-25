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
      if(process.env.NODE_ENV === 'dev') {
        return new Promise((resolve, reject) => {
          fs.writeFile(`${__dirname}/logs/dblogs.log`, '', (err) => {
            if(err) {
              reject(err);
            }
            resolve();
          });
        });
      }
    })
    .then(() => {
      console.log('DB CONNECTION SUCCESSFULLY ESTABLISHED');
      return sequelize.sync({force : true})
    })
    .catch(err => {
      console.log('DB CONNECTION FAILURE:', err);
    });
}

function dbLogger(data) {
  fs.appendFile(`${__dirname}/logs/dblogs.log`, `[${new Date()}]: ${data}\n`, err => {
    if(err) {
      console.log('DB LOGGING ERROR:', err);
    }
  });
}

module.exports = {establishDBConnection, sequelize};
