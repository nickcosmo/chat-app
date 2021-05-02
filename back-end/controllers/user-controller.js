const User = require('../models/user');

exports.postUser = async (req, res, next) => {
    const username = req.body.username;
    const name = req.body.name;
    const password = req.body.password;

    const newUser = new User(username, name, password);

    try {
        const response = await newUser.create();
        return res.json(response);
    } catch (err) {
        console.log(err);
    }
};
