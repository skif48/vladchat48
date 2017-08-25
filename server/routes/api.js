const express = require('express');
const router = express.Router();
const exampleApi = require('../service/ExampleService/index');
const userApi = require('../service/UserService/index');

router.use('/example', exampleApi.router);
router.use('/user', userApi.router);

module.exports = router;
