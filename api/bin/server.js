// import '../config';
// import app from '../app';

require = require('esm')(module /*, options*/);
// require('dotenv').config();

require('../config');
const app = require('../app');

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
app.timeout = 60 * 10 * 1000; // 10 minutes = seconds * minutes * milliseconds
