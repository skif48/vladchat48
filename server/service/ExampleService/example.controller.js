'use strict';
const ExampleServiceClass = require('./example.service');
const ExampleService = new ExampleServiceClass('something');

function getSomething(req, res) {
  Promise.resolve()
    .then(ExampleService.getSomething())
    .then((something) => {
      res.send({something});
    });
}

module.exports = {
  getSomething
};
