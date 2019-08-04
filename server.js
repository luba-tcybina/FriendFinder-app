var express = require('express');
var apiRoutes = require('./app/routing/apiRoutes');
var htmlRoutes = require('./app/routing/htmlRoutes');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use('/api/', apiRoutes);
app.use('/', htmlRoutes);

app.listen(
  9000,
  '0.0.0.0',
  () => console.log(`Server Running`),
);
