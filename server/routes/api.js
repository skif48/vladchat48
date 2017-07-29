const express = require('express');
const router = express.Router();
const exampleApi = require('../service/ExampleService/index');

router.use('/example', exampleApi.router);

module.exports = router;
