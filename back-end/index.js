const express = require('express');
const bodyParser = require('body-parser');
const mongoConnect = require('./util/database').mongoConnect;
const cookieParser = require('cookie-parser');
const io = require('./socket');
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

// catch all error handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode ? err.statusCode : 500;
    console.log('err handler -> ', err.message, err.statusCode);
    res.status(err.statusCode).json({
        message: err.message,
        success: false,
    });
});

// establish connection
let server;
mongoConnect(async () => {
    server = await app.listen(3000, () => {
        console.log('connected!');
    });
    io.init(server);
    io.getIO().on('connection', (socket) => {

        socket.on('channel-connect', ({ channelId }) => {
            if (socket.rooms.has(channelId)) return;
            console.log(`Joining Channel: ${channelId}`);
            socket.join(channelId);
        });

        socket.on('channel-leave', ({ channelId }) => {
            console.log(`Leaving Channel: ${channelId}`);
            socket.leave(channelId);
        });

        socket.on('disconnect', (socket) => {
            console.log('disconnected');
        });
    });
});
