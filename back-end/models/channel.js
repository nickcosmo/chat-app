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
                    channel: channel.ops,
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

    static async fetchById(id) {
        try {
            const db = getDb();
            const channel = await db.collection('channels').findOne(id);
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
            }
        } catch (err) {
            console.log(err);
            return {
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
            const channel = await db.collection('channels').findOneAndUpdate({ _id: id }, { $addToSet: { members: addUser } }, { returnOriginal: false });
            return {
                channel: channel.value,
            };
        } catch (err) {
            console.log(err);
            return {
                message: err.message,
                success: false,
            };
        }
    }
}

module.exports = Channel;
