const User = require('../models/user');
const Channel = require('../models/channel');
const jwtUtil = require('../util/auth');
const { validationResult } = require('express-validator');

exports.postUser = async (req, res, next) => {
    try {
        const check = validationResult(req);
        if (!check.isEmpty()) {
            const err = new Error(check.errors[0].msg);
            err.statusCode = 422;
            throw err;
        }

        const name = req.body.name;
        const method = 'standard';
        let password = req.body.password;
        let email = req.body.email;

        const newUser = new User(name, password, email, [], method);

        const response = await newUser.create();
        if (response.success) {
            const token = await jwtUtil.jwtSign(response.user._id);
            return res.status(200).cookie('jwt', token, { httpOnly: true }).cookie('auth', true).json(response);
        } else {
            const err = new Error(response.message);
            err.statusCode = response.statusCode;
            throw err;
        }
    } catch (err) {
        console.log('postUser err => ', err);
        next(err);
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const check = validationResult(req);
        if (!check.isEmpty()) {
            const err = new Error(check.errors[0].msg);
            err.statusCode = 422;
            throw err;
        }

        let password = req.body.password;
        let email = req.body.email;
        const method = 'standard';

        const response = await User.read(email, password, method);
        if (response.success) {
            const token = await jwtUtil.jwtSign(response.user._id);
            return res.status(200).cookie('jwt', token, { httpOnly: true }).cookie('auth', true).json(response);
        } else {
            const err = new Error(response.message);
            err.statusCode = response.statusCode;
            throw err;
        }
    } catch (err) {
        console.log('getUser err => ', err);
        next(err);
    }
};

exports.userAuthThirdParty = async (req, res, next) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const method = req.body.method;

        const newUser = new User(name, null, email, [], method);

        const response = await newUser.authThirdParty();
        if (response.success) {
            const token = await jwtUtil.jwtSign(response.user._id);
            return res.status(200).cookie('jwt', token, { httpOnly: true }).cookie('auth', true).json(response);
        } else {
            const err = new Error(response.message);
            err.statusCode = response.statusCode;
            throw err;
        }
    } catch (err) {
        console.log('userAuthThirdParty err -> ', err);
        next(err);
    }
};

exports.postAddChannelToUser = async (req, res, next) => {
    try {
        const check = validationResult(req);
        if (!check.isEmpty()) {
            const err = new Error(check.errors[0].msg);
            err.statusCode = 422;
            throw err;
        }

        const channelId = req.body.channelId;
        const channelName = req.body.channelName;
        const userId = req.body.userId;
        const userName = req.body.userName;

        const userChannels = await User.addChannel(userId, channelId, channelName);
        if (!userChannels.success) {
            const err = new Error(userChannels.message);
            err.statusCode = userChannels.statusCode ? userChannels.statusCode : 500;
            throw err;
        }
        const updatedChannel = await Channel.addMember(channelId, userId, userName);
        if (!updatedChannel.success) {
            const err = new Error(updatedChannel.message);
            err.statusCode = updatedChannel.statusCode ? updatedChannel.statusCode : 500;
            throw err;
        }
        const response = { ...userChannels, ...updatedChannel };
        return res.status(200).json(response);
    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.logOut = async (req, res, next) => {
    return res.status(200).clearCookie('jwt').clearCookie('auth').json({
        success: true,
    });
};

// TODO auto login controller
exports.autoLogin = async (req, res, next) => {
    const _id = req.body._id;

    try {
        // get user details by id
        console.log(_id);
    } catch (err) {
        console.log(err);
    }
};
