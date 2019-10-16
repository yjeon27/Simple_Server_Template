//server.js
const express = require('express');
const bodyParser = require('body-parser');
const item = require('./routes/item.route'); // Imports routes for the items
const mongoose = require('mongoose');

const app = express();

let dev_db_url = 'mongodb://127.0.0.1:27017/library';
let mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.once('open', _ =>{
    console.log('Database connected: ',dev_db_url);
});
db.on('error', err => {
    console.error.bind(console, 'MongoDB connection error:');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/items', item);

let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});