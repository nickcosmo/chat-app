const getDb = require('../util/database').getDb;
// const mongodb = require('mongodb');

class User {
    constructor(username, name, password, id) {
        this.username = username;
        this.name = name;
        this.password = password;
        this._id = id;
    }

    // CRUD...
    async create() {
        try {
            const db = getDb();
            const user = await db.collection('users').insertOne(this);
            if (user) {
                return {
                    user: user.ops,
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
}

module.exports = User;
