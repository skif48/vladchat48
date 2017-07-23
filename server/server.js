// Get dependencies
const express = require('express');
const path = require('path');

const fs = require('fs');
const bodyParser = require('body-parser');
const logger = require('morgan');


// Get our API routes
const api = require('./routes/api');

const app = express();
const http = require('http');
const server = http.Server(app);

const io = require('socket.io')(server);

app.use(logger('common', {
  stream: fs.createWriteStream('./access.log', {flags: 'a'})
}));
app.use(logger('dev'));

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, '../dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
console.log(port);
app.set('port', port);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

let apiNamespace = io.of('/api');
apiNamespace.on('connection', (socket) => {
  console.log('user connected');

  socket.emit('hello', {data: 'hello'});

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('error', function(data){
    console.log('error');
    console.log(data);
  });

  socket.on('add-message', (message) => {
    console.log('add message');
    io.emit('message', {type:'new-message', text: message});
  });
});
