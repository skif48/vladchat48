const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const logger = require('morgan');
const http = require('http');
const io = require('socket.io');
const api = require('./routes/api');
const establishDBConnection = require('./db').establishDBConnection;
const User = require('./db/models/User.model').User;

const app = express();
const server = http.Server(app);
const ioClient = io(server);

const API_ROUTE = '/api';
const PORT = process.env.PORT || '3000';

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

establishDBConnection()
  .then(() => {
    User.create({email: 'vu4848@gmail.com', nickname: 'skif48', password: 'password', role: 'admin'})
      .then(() => console.log('User successfully created'))
      .catch((err) => console.log('Error during user creation: ', err));
  });

app.use(API_ROUTE, logger('common', {
  stream: fs.createWriteStream('./access.log', {flags: 'a'})
}));
app.use(API_ROUTE, logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../dist')));

let apiNamespace = ioClient.of(API_ROUTE);
apiNamespace.on('connection', (socket) => {
  console.log('user connected');

  socket.emit('hello', {data: 'hello'});

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('error', function(data){
    console.log('error');
    console.log(data);
  });

  socket.on('add-message', (message) => {
    console.log('add message');
    ioClient.emit('message', {type:'new-message', text: message});
  });
});

app.use(API_ROUTE, api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.set('port', PORT);

server.listen(PORT, () => console.log(`Server successfully started on ${PORT}`));
