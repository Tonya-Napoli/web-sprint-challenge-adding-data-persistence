// build your server here and require it from index.js
const express = require('express');

const projectRouter = require('./project/router');
const resourceRouter = require('./resource/router');
const taskRouter = require('./task/router');

const server = express();

server.use(express.json());

//catch all
server.use('*', (req, res) => {

    res.json({ api: 'api up' });
  })

server.use('/api/project' , projectRouter )  
server.use('/api/resource', resourceRouter) //15:59
server.use('/api/task', taskRouter) //16:00

module.exports = server;