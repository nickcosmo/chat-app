const getDb = require('../util/database').getDb;
const bcrypt = require('bcrypt');
// const mongodb = require('mongodb');

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
            const checkUser = await User.read(this.email, this.password);
            if (!checkUser) {
                let hashedPassword = await bcrypt.hash(this.password, 12);
                this.password = hashedPassword;
                const user = await db.collection('users').insertOne(this);
                if (user) {
                    return {
                        user: user.ops,
                        success: true,
                    };
                }
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
            };
        }
    }

    async createThirdParty() {
        try {
            const db = getDb();
            const checkUser = await User.readThirdParty(this.email);
            if (!checkUser) {
                const user = await db.collection('users').insertOne(this);
                if (user) {
                    return {
                        user: user.ops,
                        success: true,
                    };
                }
            } else {
                const { _id, name, channels } = checkUser.user;
                return {
                    user: {
                        name: name,
                        _id: _id,
                        channels: channels,
                    },
                    success: true,
                };
            }
        } catch (err) {
            console.log(err);
            return {
                success: false,
            };
        }
    }

    static async read(email, password) {
        try {
            const db = getDb();
            const user = await db.collection('users').findOne({ email: email });
            if (user) {
                const match = await bcrypt.compare(password, user.password);
                if (match) {
                    return {
                        user: user,
                        success: true,
                    };
                }
            }
            return null;
        } catch (err) {
            console.log(err);
            return {
                success: false,
            };
        }
    }

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
                success: false,
            };
        }
    }
}

module.exports = User;
