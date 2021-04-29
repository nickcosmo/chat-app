const express = require('express');
const bodyParser = require('body-parser');
const mongoConnect = require('./database').mongoConnect;
const getDb = require('./database').getDb;
require('dotenv').config()

const app = express();

app.use(bodyParser.json());

// test route!
app.get('/', (req, res, next) => {
    res.json({ hello: 'hello' });
});

// test route!
app.post('/', (req, res, next) => {
    const body = req.body;
    console.log(body);
    const db = getDb();
    return db
        .collection('products')
        .insertOne({body: "yodle"})
        .then((data) => {
            // return res.json(body);
        })
        .catch((err) => console.log(err));
});

mongoConnect(() => {
    app.listen(8080, () => {
        console.log('connected!');
    });
});
