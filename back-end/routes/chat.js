const express = require('express');
const getDb = require('../database').getDb;

const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({ hello: 'hello' });
})

router.post('/', (req, res, next) => {
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

exports.routes = router;