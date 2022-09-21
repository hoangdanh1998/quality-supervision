import express  from 'express';
import configuration from './configuration.js';
import mongoose from './connector/mongoose.js';
import test from './module/core/index.js';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

test();

const config = configuration();
// mongoose(config.mongodb);

const PORT = config.port;
const HOST = config.host;

const server = app.listen(PORT);
server.on("listening", () => {
  console.log(`Server is running on port ${HOST}:${PORT}`);
});
