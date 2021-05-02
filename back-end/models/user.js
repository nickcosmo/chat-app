const getDb = require('../util/database').getDb;
// const mongodb = require('mongodb');

class User {
    constructor(name, password, id) {
        this.name = name;
        this.password = password;
        this._id = id;
    }

    // CRUD...
}

module.exports = User;