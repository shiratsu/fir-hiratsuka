const functions = require('firebase-functions');
const express = require('express');
const path = require('path');

const app = express();

const indexRouter = require('./routes/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'routes')));
app.use('/', indexRouter);

app.get('/api', (req, res) => {
    const date = new Date();
    const hours = (date.getHours() % 12) + 1; // London is UTC + 1hr;
    res.json({
        bongs: 'BONG '.repeat(hours)
    });
});

exports.app = functions.https.onRequest(app);