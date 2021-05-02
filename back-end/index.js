const express = require('express');
const bodyParser = require('body-parser');
const mongoConnect = require('./database').mongoConnect;
require('dotenv').config();

const app = express();

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, DELETE, PUT, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

// import router
const chatRoutes = require('./routes/chat');

// init middleware and routing
app.use(bodyParser.json());
app.use(chatRoutes.routes);

let io, server;
// establish connection

mongoConnect(async () => {
    server = await app.listen(3000, () => {
        console.log('connected!');
    });
    io = require('socket.io')(server, {
        cors: {
            origin: 'http://localhost:8080',
            methods: ['GET', 'POST'],
            credentials: true
        },
    });
    io.on('connection', () => {
        console.log('a client has connected!');
    });
});
