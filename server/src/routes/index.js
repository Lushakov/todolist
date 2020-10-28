const express = require('express');
const tasks = require('./tasks');

const app = express();
tasks(app);


module.exports = app;