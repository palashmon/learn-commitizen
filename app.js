// *** main dependencies *** //
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const mongoose = require('mongoose');

// *** routes *** //
const routes = require('./server/routes/index.js');

// *** express instance *** //
const app = express();

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// *** mongoose *** ///
mongoose.Promise = global.Promise;
mongoose
    .connect(process.env.DATABASE, { useMongoClient: true })
    .then(() => {
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
        console.log(`Connected to the database`);
    })
    .catch(err => console.log(`Error connecting to the database:: ${err.message}`));

// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/public')));

// *** main routes *** //
app.use('/', routes);

// *** server config *** //
const server = http.createServer(app);
server.listen(7788, () => {
    console.log(`Node server running on PORT ${server.address().port}`);
});

module.exports = app;
