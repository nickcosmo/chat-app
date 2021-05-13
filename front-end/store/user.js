import axios from 'axios';
import { router } from '../routes/router';

export default {
    namespaced: true,
    state: {
        user: null,
    },
    getters: {
        getUserId: (state) => state.user._id,
        getUser: (state) => state.user,
    },
    mutations: {
        UPDATE_USER: (state, user) => state.user = { ...user },
    },
    actions: {
        // eslint-disable-next-line no-unused-vars
        async googleSignin({ commit }, elementRef) {
            const gapi = window.gapi;
            await gapi.load('auth2', () => {
                const auth2 = gapi.auth2.init({
                    client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
                    cookiepolicy: 'single_host_origin',
                });
                auth2.attachClickHandler(
                    elementRef,
                    {},
                    // success case
                    async function(googleUser) {
                        const response = await axios.post(
                            process.env.VUE_APP_API + '/google-auth',
                            {
                                token: googleUser.getAuthResponse().id_token,
                                method: 'google',
                            },
                            { withCredentials: true, credentials: true }
                        );
                        const user = response.data.user;
                        const returnUser = {
                            name: user.name,
                            _id: user._id,
                            channels: user.channels,
                        };
                        commit('UPDATE_USER', returnUser);
                        router.push({ name: 'chat' });
                    },
                    // failure case
                    function(error) {
                        console.log(error);
                    }
                );
            });
        },
        // eslint-disable-next-line no-unused-vars
        async gitHubSigninSuccess({ commit }, code) {
            try {
                const response = await axios.post(
                    process.env.VUE_APP_API + '/github-auth',
                    {
                        code: code,
                        method: 'github',
                    },
                    {
                        withCredentials: true,
                        credentials: true,
                    }
                );
                const user = response.data.user;
                const returnUser = {
                    name: user.name,
                    _id: user._id,
                    channels: user.channels,
                };
                commit('UPDATE_USER', returnUser);
            } catch (err) {
                console.log(err);
            }
        },
        // eslint-disable-next-line no-unused-vars
        async signup({ commit }, userData) {
            try {
                const response = await axios.post(process.env.VUE_APP_API + '/auth/signup', userData, {
                    withCredentials: true,
                    credentials: true,
                });
                if (response.status === 200 && response.success) {
                    const user = response.data.user;
                    const returnUser = {
                        name: user.name,
                        _id: user._id,
                        channels: user.channels,
                    };
                    commit('UPDATE_USER', returnUser);
                }
            } catch (err) {
                console.log(err);
            }
        },
        // eslint-disable-next-line no-unused-vars
        async login({ commit }, userData) {
            try {
                const response = await axios.post(process.env.VUE_APP_API + '/auth/login', userData, { withCredentials: true, credentials: true });
                if (response.status === 200) {
                    const user = response.data.user;
                    const returnUser = {
                        name: user.name,
                        _id: user._id,
                        channels: user.channels,
                    };
                    commit('UPDATE_USER', returnUser);
                    router.push({ name: 'chat' });
                }
            } catch (err) {
                console.log(err.message);
            }
        },
        // TODO auto login
        // eslint-disable-next-line no-unused-vars
        async tryLogin({ commit }) {
            try {
                const response = await axios.post(process.env.VUE_APP_API + '/auth/auto-login', null, { withCredentials: true, credentials: true });
                console.log(response);
            } catch (err) {
                console.log(err);
            }
        },
    },
};
