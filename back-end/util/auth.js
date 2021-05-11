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
        const verifiedPayload = jwt.verify(token, process.env.JWT_SECRET);
        req.body._id = verifiedPayload.data;
        next();
    }
};
