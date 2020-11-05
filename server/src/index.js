require('dotenv').config({path: '../.env'});
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes')

console.log(process.env.MLAB_ADDR );

const app = express();
 
app.use(bodyParser());
app.use('/api', routes);

app.listen(8085, async () => {
  console.log('Server ready!')
  const mongoConnection = await mongoose.connect(process.env.MLAB_ADDR);
  console.log('Database ready!')
  console.log('Listening on port 8085')
});
