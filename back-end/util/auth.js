const jwt = require('jsonwebtoken');

exports.jwtSign = async (payload) => {
    try {
        const token = jwt.sign(
            {
                //expire in 7 hours
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 7,
                data: payload,
            },
            process.env.JWT_SECRET
        );
        return token;
    } catch (err) {
        return err;
    }
};

exports.jwtVerify = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        try {
            const verifiedPayload = jwt.verify(token, process.env.JWT_SECRET);
            req.body._id = verifiedPayload.data;
            next();
        } catch (err) {
            console.log('jwt err => ', err.message);
            next(err);
        }
    } else {
        const err = new Error('Could not authorize this request!');
        err.statusCode = 401;
        next(err);
    }
};
