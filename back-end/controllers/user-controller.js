const User = require('../models/user');
const jwtUtil = require('../util/auth');

exports.postUser = async (req, res, next) => {
    const name = req.body.name;
    let password = req.body.password;
    const email = req.body.email;

    // if all data was not supplied then send back an error
    if (!name || !password || !email) {
        return res.status(400).json({
            message: 'Invalid request!',
            success: false,
        });
    }

    // if password is not string then convert to string
    if (typeof password !== 'string') {
        password = password.toString();
    }

    // if password is not string then convert to string
    if (typeof email !== 'string') {
        email = email.toString();
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
        // TODO throw an error
        console.log('postUser err => ', err);
    }
};

exports.getUser = async (req, res, next) => {
    const password = req.body.password;
    const email = req.body.email;

    // if all data was not supplied then send back an error
    if (!password || !email) {
        return res.status(400).json({
            message: 'Invalid request!',
            success: false,
        });
    }

    // if password is not string then convert to string
    if (typeof password !== 'string') {
        password = password.toString();
    }

    // if password is not string then convert to string
    if (typeof email !== 'string') {
        email = email.toString();
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
        // TODO throw an error
        console.log('getUser err => ', err);
    }
};

exports.postUserThirdParty = async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;

    const newUser = new User(name, null, email, []);

    try {
        const response = await newUser.createThirdParty();
        if (response.success) {
            const token = await jwtUtil.jwtSign(response.user._id);
            return res.status(200).cookie('jwt', token, { httpOnly: true }).cookie('auth', true).json(response);
        } else {
            throw new Error(response.message);
        }
    } catch (err) {
        // TODO throw an error
        console.log(err);
    }
};

// TODO: Review if this is necessary
exports.getUserThirdParty = async (req, res, next) => {
    const email = req.body.email;

    try {
        const response = await User.readThirdParty(email);
        return res.json(response);
    } catch (err) {
        console.log(err);
    }
};


// TODO auto login - review if needed 
exports.autoLogin = async (req, res, next) => {
    const _id = req.body._id;

    try {
        // get user details by id
        console.log(_id);
    } catch (err) {
        console.log(err);
    }
};
