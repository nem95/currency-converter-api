
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').config();

const routes = require('./routes/index');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);

const port = process.env.PORT || 7777;

const server = app.listen(port, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
