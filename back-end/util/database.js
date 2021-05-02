const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let db;

const mongoConnect = (cb) => {
    MongoClient.connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
    })
        .then((client) => {
            db = client.db();
            cb();
        })
        .catch((err) => {
            console.log(err);
            // throw err;
        });
};

const getDb = () => {
    if (db) {
        return db;
    }
    console.log('no db found!');
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
