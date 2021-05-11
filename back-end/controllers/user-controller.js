const User = require('../models/user');
const jwtUtil = require('../util/auth');

exports.postUser = async (req, res, next) => {
    const name = req.body.name;
    let password = req.body.password;
    const email = req.body.email;

    // if password is not string then convert to string
    if (typeof password !== 'string') {
        password = password.toString();
    }

    // if all data was not supplied then send back an error
    if (!name || !password || !email) {
        return res.status(400).json({
            message: 'Invalid request!',
            success: false,
        });
    }

    const newUser = new User(name, password, email, []);

    try {
        const response = await newUser.create();
        if (response.success) {
            const token = await jwtUtil.jwtSign(response.user._id);
            return res.status(200).cookie('jwt', token, { httpOnly: true }).cookie('auth', true).json(response);
        } else {
            throw new Error(response.message);
        }
    } catch (err) {
        console.log('postUser err => ', err);
    }
};

exports.getUser = async (req, res, next) => {
    const password = req.body.password;
    const email = req.body.email;

    // if password is not string then convert to string
    if (typeof password !== 'string') {
        password = password.toString();
    }

    // if all data was not supplied then send back an error
    if (!password || !email) {
        return res.status(400).json({
            message: 'Invalid request!',
            success: false,
        });
    }

    try {
        const response = await User.read(email, password);
        if (response.success) {
            const token = await jwtUtil.jwtSign(response.user._id);
            return res.status(200).cookie('jwt', token, { httpOnly: true }).cookie('auth', true).json(response);
        } else {
            throw new Error(response.message);
        }
    } catch (err) {
        console.log('getUser err => ', err);
    }
};

exports.postUserThirdParty = async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;

    const newUser = new User(name, null, email, []);

    try {
        const response = await newUser.createThirdParty();
        return res.json(response);
    } catch (err) {
        console.log(err);
    }
};

exports.getUserThirdParty = async (req, res, next) => {
    const email = req.body.email;

    try {
        const response = await User.readThirdParty(email);
        return res.json(response);
    } catch (err) {
        console.log(err);
    }
};
