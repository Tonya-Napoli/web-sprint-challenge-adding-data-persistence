// build your server here and require it from index.js
const express = require('express');

const projectRouter = require('./project/router');
const resourceRouter = require('./resource/router');
const taskRouter = require('./task/router');

const server = express();

server.use(express.json());

// Correctly place route-specific middleware before the catch-all
server.use('/api/projects', projectRouter); 
server.use('/api/resources', resourceRouter);
server.use('/api/tasks', taskRouter);

// Catch-all route for unhandled requests, now placed last
server.use('*', (req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });  // Sending a 404 status for unhandled endpoints
});

module.exports = server;
