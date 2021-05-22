const getDb = require('../util/database').getDb;
const bcrypt = require('bcrypt');
const mongodb = require('mongodb');

class User {
    constructor(name, password, email, channels, id) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.channels = channels;
        this._id = id;
    }

    // CRUD...
    async create() {
        try {
            const db = getDb();
            const checkUser = await db.collection('users').findOne({ email: this.email });
            if (!checkUser) {
                let hashedPassword = await bcrypt.hash(this.password, 12);
                this.password = hashedPassword;
                const user = await db.collection('users').insertOne(this);
                if (user) {
                    const { _id, name, channels } = user.ops[0];
                    return {
                        user: {
                            _id: _id,
                            name: name,
                            channels: channels,
                        },
                        success: true,
                    };
                }
            } else {
                const err = new Error('User already exists!');
                err.statusCode = 401;
                throw err;
            }
        } catch (err) {
            return {
                statusCode: err.statusCode,
                success: false,
                message: err.message,
            };
        }
    }

    static async read(email, password) {
        try {
            const db = getDb();
            const user = await db.collection('users').findOne({ email: email });
            if (user) {
                const match = await bcrypt.compare(password, user.password);
                const { _id, name, channels } = user;
                if (match) {
                    return {
                        user: {
                            _id: _id,
                            name: name,
                            channels: channels,
                        },
                        success: true,
                    };
                } else {
                    const err = new Error('Invalid Cridentials!');
                    err.statusCode = 401;
                    throw err;
                }
            } else {
                const err = new Error('Invalid Cridentials!');
                err.statusCode = 401;
                throw err;
            }
        } catch (err) {
            // TODO remove for prod
            console.log('read err -> ', err);
            return {
                statusCode: err.statusCode,
                message: err.message,
                success: false,
            };
        }
    }

    async createThirdParty() {
        try {
            const db = getDb();

            // check if user exists
            const checkUser = await db.collection('users').findOne({ email: this.email });
            if (!checkUser) {
                // if no user found then create new user
                const user = await db.collection('users').insertOne(this);
                const { _id, name, channels } = user.ops[0];
                if (user) {
                    return {
                        user: {
                            _id: _id,
                            name: name,
                            channels: channels,
                        },
                        success: true,
                    };
                }
            } else {
                // if user found then sign the user in
                const { _id, name, channels } = checkUser.user;
                return {
                    user: {
                        _id: _id,
                        name: name,
                        channels: channels,
                    },
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

    static async addChannel(userId, channelId, channelName) {
        const db = getDb();
        try {
            const id = new mongodb.ObjectID(userId);
            const addChannel = {
                _id: channelId,
                name: channelName,
            };
            const user = await db
                .collection('users')
                .findOneAndUpdate({ _id: id }, { $addToSet: { channels: addChannel } }, { returnOriginal: false });
            return {
                channels: user.value.channels,
                success: true,
            };
        } catch (err) {
            console.log(err);
            return {
                message: err.message,
                success: false,
            };
        }
    }

    // TODO review if this is necessary!
    static async readThirdParty(email) {
        try {
            const db = getDb();
            const user = await db.collection('users').findOne({ email: email });
            if (user) {
                return {
                    user: user,
                    success: true,
                };
            }
            return null;
        } catch (err) {
            console.log(err);
            return {
                message: err.message,
                success: false,
            };
        }
    }
}

module.exports = User;
