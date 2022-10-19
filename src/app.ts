import express  from 'express';
import configuration from './configuration.js';
import mongoose from './connector/mongoose.js';
import test from './module/jest/index.js';
import router from './module/index.js';
// import { router } from './module/projects/index.js';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json());

router(app)
// test();
const config = configuration();
mongoose(config.mongodb, app);

const PORT = config.port;
const HOST = config.host;

const server = app.listen(PORT);
server.on("listening", () => {
  console.log(`Server is running on port ${HOST}:${PORT}`);
});
