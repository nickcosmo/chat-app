const getDb = require('../util/database').getDb;
// const mongodb = require('mongodb');

class Message {
    constructor(userId, userName, channelId, body, date, id) {
        this.userId = userId;
        this.userName = userName;
        this.channelId = channelId;
        this.body = body;
        this.date = date;
        this._id = id;
    }

    // CRUD...
    async create() {
        try {
            const db = getDb();
            const message = await db.collection('messages').insertOne(this);
            if (message) {
                return {
                    message: message.ops,
                    success: true,
                };
            }
        } catch (err) {
            return {
                success: false,
            };
        }
    }

    static async fetchByChannel(id, page) {
        const db = getDb();
        try {
            const messages = await db
                .collection('messages')
                .find({ channelId: id })
                .sort({ date: 1 })
                .skip((page - 1) * 20)
                .limit(20)
                .toArray();
            if (messages) {
                return {
                    messages: messages,
                    success: true,
                };
            }
        } catch (err) {
            return {
                success: false,
            };
        }
    }
}

module.exports = Message;
