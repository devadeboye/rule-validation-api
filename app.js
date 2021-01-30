require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const routes = require('./src/routes/index');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(awsServerlessExpressMiddleware.eventContext());

app.use('/', routes);

module.exports = app;