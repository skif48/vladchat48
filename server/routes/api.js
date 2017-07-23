const express = require('express');
const router = express.Router();
const sys = require('sys');
const exec = require('child_process').exec;
function puts(error, stdout, stderr) { return stdout }


/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/:command', (req, res) => {
  exec(req.params.command, (error, stdout, stderr) => {
    res.send(stdout);
  });
});

module.exports = router;
