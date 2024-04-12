// start your server here
require('dotenv').config();

const server = require('./api/server');

const port = process.env.PORT;

server.listen(port, () => console.log(`\nAPI server now running on port ${port}\n`));
