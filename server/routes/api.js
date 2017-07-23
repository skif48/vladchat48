const express = require('express');
const router = express.Router();
const sys = require('sys');
const exec = require('child_process').exec;

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

module.exports = router;
