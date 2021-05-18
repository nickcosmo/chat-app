let io;

module.exports = {
    init: (server) => {
        io = require('socket.io')(server, {
            cors: {
                origin: process.env.CLIENT_URL,
                methods: ['GET', 'POST'],
                credentials: true,
            },
        });
    },
    getIO: () => {
        if (io) {
            return io;
        }
        return new Error('No socket connection found');
    },
};
