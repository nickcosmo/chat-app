import axios from 'axios';
import { router } from '../routes/router';
import { EventBus } from '@/event-bus';

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
        UPDATE_USER: (state, user) => (state.user = { ...user }),
        UPDATE_USER_CHANNELS: (state, channels) => (state.user.channels = channels),
        PUSH_USER_CHANNEL: (state, channel) => state.user.channels.push(channel),
        CLEAR_USER: (state) => (state.user = null),
    },
    actions: {
        // eslint-disable-next-line no-unused-vars
        async googleSignin({ dispatch, commit }, elementRef) {
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
                                // method: 'google',
                            },
                            { withCredentials: true, credentials: true }
                        );
                        if (response.status === 200 && response.data.success) {
                            const user = response.data.user;
                            const returnUser = {
                                name: user.name,
                                _id: user._id,
                                channels: user.channels,
                            };
                            if (user.channels.length > 0) {
                                await dispatch('channel/getMessages', user.channels[0]._id, { root: true });
                            }
                            commit('UPDATE_USER', returnUser);
                            EventBus.$emit('showSnackbar', {
                                success: true,
                                message: `Welcome, ${response.data.user.name}!`,
                            });
                            router.push({ name: 'chat' });
                        } else {
                            EventBus.$emit('showSnackbar', {
                                success: false,
                                message: response.data.message,
                            });
                        }
                    },
                    // failure case
                    function(error) {
                        console.log(error);
                        EventBus.$emit('showSnackbar', {
                            success: false,
                            message: error.message,
                        });
                    }
                );
            });
        },
        // eslint-disable-next-line no-unused-vars
        async gitHubSigninSuccess({ dispatch, commit }, code) {
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
                if (user.channels.length > 0) {
                    await dispatch('channel/getMessages', user.channels[0]._id, { root: true });
                }
                commit('UPDATE_USER', returnUser);
                return {
                    success: true,
                    message: `Welcome, ${response.data.user.name}!`,
                };
            } catch (err) {
                console.log(err);
                return {
                    success: false,
                    message: err.response.data.message,
                };
            }
        },
        // eslint-disable-next-line no-unused-vars
        async signup({ commit }, userData) {
            try {
                const response = await axios.post(process.env.VUE_APP_API + '/auth/signup', userData, {
                    withCredentials: true,
                    credentials: true,
                });
                if (response.status === 200 && response.data.success) {
                    const user = response.data.user;
                    const returnUser = {
                        name: user.name,
                        _id: user._id,
                        channels: user.channels,
                    };
                    commit('UPDATE_USER', returnUser);
                    return {
                        success: true,
                        message: `Welcome to the chat app, ${response.data.user.name}!`,
                    };
                }
            } catch (err) {
                return {
                    success: false,
                    message: err.response.data.message,
                };
            }
        },
        // eslint-disable-next-line no-unused-vars
        async login({ commit, dispatch }, userData) {
            try {
                const response = await axios.post(process.env.VUE_APP_API + '/auth/login', userData, { withCredentials: true, credentials: true });
                if (response.status === 200 && response.data.success) {
                    const user = response.data.user;
                    const returnUser = {
                        name: user.name,
                        _id: user._id,
                        channels: user.channels,
                    };
                    commit('UPDATE_USER', returnUser);
                    if (returnUser.channels.length > 0) {
                        await dispatch('channel/getMessages', returnUser.channels[0]._id, { root: true });
                    }
                    return {
                        success: true,
                        message: `Welcome back, ${response.data.user.name}!`,
                    };
                }
            } catch (err) {
                return {
                    success: false,
                    message: err.response.data.message,
                };
            }
        },
        // eslint-disable-next-line no-unused-vars
        async logout({ commit }) {
            try {
                const response = await axios.get(process.env.VUE_APP_API + '/auth/logout', { withCredentials: true, credentials: true });
                if (response.status === 200 && response.data.success) {
                    commit('CLEAR_USER');
                    router.push({ name: 'login' });
                }
            } catch (err) {
                EventBus.$emit('showSnackbar', {
                    success: false,
                    message: err.message,
                });
            }
        },
        // eslint-disable-next-line no-unused-vars
        async addChannel({ commit, dispatch }, data) {
            try {
                const response = await axios.post(process.env.VUE_APP_API + '/user/channels', data, { withCredentials: true, credentials: true });
                if (response.status === 200 && response.data.success) {
                    // eslint-disable-next-line no-unused-vars
                    const { channel, channels } = response.data;
                    commit('UPDATE_USER_CHANNELS', channels);
                    await dispatch('channel/getMessages', channel._id, { root: true });
                    // commit('UPDATE_CURRENT_CHANNEL', channel);
                    return {
                        success: response.data.success,
                        message: 'Channel was added successfully!',
                    };
                }
            } catch (err) {
                return {
                    success: false,
                    message: err.response.data.message,
                };
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
