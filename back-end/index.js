const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res, next) => {
    res.json({hello: "hello"});
})

app.listen(8080, () => {
    console.log("connected!");
});