'use strict';

const DEFAULT_PORT = 4300;
const SERVER_PORT = process.env.PORT || DEFAULT_PORT;

const winston = require('winston');
const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const favicon = require('serve-favicon');

// Expose all static resources in /public
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Redirect to the main page
app.get('/', (request, response) => {
  response.sendFile('index.html', {root: path.join(__dirname, 'public')});
});

app.set('port', SERVER_PORT);

// Start Express server
server.listen(app.get('port'), () => {
  winston.info('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

app.close = () => {
  server.close();
};

module.exports = app;
