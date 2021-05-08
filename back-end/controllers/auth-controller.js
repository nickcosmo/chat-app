const fetch = require('node-fetch');

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
    console.log(access_token);
    const userData = await fetch(process.env.GITHUB_USER_URI, {
        method: 'GET',
        headers: {
            Authorization: 'token ' + access_token,
        },
    });
    if (userData.status === 200) {
        console.log(await userData.json());
    }
};

exports.googleSignin = async (req, res, next) => {
    const token = req.body.token;
    const response = await fetch('https://oauth2.googleapis.com/tokeninfo?id_token=' + token, {
        method: 'POST',
    });
    if (response.status === 200) {
        console.log(await response.json());
    }
};
