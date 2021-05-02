const express = require('express');
const bodyParser = require('body-parser');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');
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

// TODO: Remove after User model is active
app.use((req, res, next) => {
    req.user = new User('Nick', 'test');
    req.user.id = 12345;
    next();
});

// import router
const channelRoutes = require('./routes/channel-router');
const messageRoutes = require('./routes/message-router');

// init middleware and routing
app.use(bodyParser.json());
app.use(channelRoutes.routes);
app.use(messageRoutes.routes);

// establish connection
let io, server;
mongoConnect(async () => {
    server = await app.listen(3000, () => {
        console.log('connected!');
    });
    io = require('socket.io')(server, {
        cors: {
            origin: 'http://localhost:8080',
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });
    io.on('connection', () => {
        console.log('a client has connected!');
    });
});
