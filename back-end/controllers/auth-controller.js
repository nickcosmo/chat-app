const fetch = require('node-fetch');
const { OAuth2Client } = require('google-auth-library');

exports.gitHubSignin = async (req, res, next) => {
    const response = await fetch(process.env.GITHUB_ACCESS_URI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_SECRET,
            code: req.body.code,
            redirect_uri: process.env.GITHUB_REDIRECT_URI,
        }),
    });
    const responseString = await response.text();
    const params = new URLSearchParams(responseString);
    const access_token = params.get('access_token');
    const userData = await fetch(process.env.GITHUB_USER_URI, {
        method: 'GET',
        headers: {
            Authorization: 'token ' + access_token,
        },
    });
    if (userData.status === 200) {
        const user = await userData.json();
        req.body.name = user.name;
        req.body.email = user.login;
        next();
    } else {
        // TODO return some error
    }
};

exports.googleSignin = async (req, res, next) => {
    const token = req.body.token;
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        req.body.name = payload.name;
        req.body.email = payload.email;
        next();
    } catch (err) {
        console.log(err);
        // TODO return some error
    }
};
