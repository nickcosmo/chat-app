const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class Channel {
    constructor(name, description, userId, members, id) {
        this.name = name;
        this.description = description;
        this.userId = userId;
        this.members = members;
        this._id = id;
    }

    async create() {
        try {
            const db = getDb();
            const channel = await db.collection('channels').insertOne(this);
            if (channel) {
                return {
                    channel: channel.ops[0],
                    success: true,
                };
            } else {
                const err = new Error('Could not create channel!');
                throw err;
            }
        } catch (err) {
            console.log(err);
            return {
                statusCode: err.statusCode ? err.statusCode : 500,
                message: err.message,
                success: false,
            };
        }
    }

    // TODO review if needed
    static async fetchAll() {
        try {
            const db = getDb();
            const channels = await db.collection('channels').find().toArray();
            if (channels) {
                return {
                    channels: channels,
                    success: true,
                };
            }
        } catch (err) {
            console.log(err);
            return {
                message: err.message,
                success: false,
            };
        }
    }

    static async fetchById(channelId) {
        try {
            const db = getDb();
            const id = new mongodb.ObjectID(channelId);
            const channel = await db.collection('channels').findOne({ _id: id });
            if (channel) {
                return {
                    channel: channel,
                    success: true,
                };
            }
        } catch (err) {
            console.log(err);
            return {
                message: err.message,
                success: false,
            };
        }
    }

    static async searchByString(string) {
        try {
            const db = getDb();
            const channels = await db
                .collection('channels')
                .find({ name: { $regex: `.*${string}.*`, $options: 'i' } })
                .toArray();
            if (channels) {
                return {
                    channels: channels,
                    success: true,
                };
            } else {
                const err = new Error('Could not complete this request!');
                err.statusCode = 404;
                throw err;
            }
        } catch (err) {
            console.log(err);
            return {
                statusCode: err.statusCode ? err.statusCode : 500,
                message: err.message,
                success: false,
            };
        }
    }

    static async addMember(channelId, userId, userName) {
        try {
            const db = getDb();
            const id = new mongodb.ObjectID(channelId);
            const addUser = {
                _id: userId,
                name: userName,
            };
            const channel = await db
                .collection('channels')
                .findOneAndUpdate({ _id: id }, { $addToSet: { members: addUser } }, { returnOriginal: false });
            if (channel) {
                return {
                    channel: channel.value,
                    success: true,
                };
            } else {
                const err = new Error('Could not complete this request!');
                err.statusCode = 404;
                throw err;
            }
        } catch (err) {
            console.log(err);
            return {
                statusCode: err.statusCode,
                message: err.message,
                success: false,
            };
        }
    }
}

module.exports = Channel;
