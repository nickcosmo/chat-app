const express = require('express');
const bodyParser = require('body-parser');
const mongoConnect = require('./util/database').mongoConnect;
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, DELETE, PUT, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

// import router
const channelRoutes = require('./routes/channel-router');
const messageRoutes = require('./routes/message-router');
const userRoutes = require('./routes/user-router');
const authRoutes = require('./routes/auth-router');

// init middleware and routing
app.use(cookieParser());
app.use(bodyParser.json());
app.use(channelRoutes.routes);
app.use(messageRoutes.routes);
app.use(userRoutes.routes);
app.use(authRoutes.routes);

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
