import axios from 'axios';
import socket from '@/socket';
import { EventBus } from '@/event-bus';

export default {
    namespaced: true,
    state: {
        currentChannel: null,
        messages: [],
        searchChannels: [],
        page: 1,
    },
    getters: {
        getChannelMessages: (state) => state.messages,
        getCurrentChannel: (state) => state.currentChannel,
        getSearchChannels: (state) => state.searchChannels,
        getPage: (state) => state.page,
    },
    mutations: {
        UPDATE_SEARCH_CHANNELS: (state, channels) => (state.searchChannels = channels),
        UPDATE_MESSAGES: (state, messages) => (state.messages = messages),
        UPDATE_CURRENT_CHANNEL: (state, channel) => (state.currentChannel = channel),
        ADD_MESSAGE: (state, message) => state.messages.push(message),
        CLEAR_SEARCH_CHANNELS: (state) => (state.searchChannels = []),
        ADD_PAGE: (state) => state.page++,
        RESET_PAGE: (state) => (state.page = 1),
        CONCAT_MESSAGES: (state, messages) => (state.messages = messages.concat(state.messages)),
    },
    actions: {
        async create({ commit }, channelData) {
            try {
                const newChannel = await axios.post(process.env.VUE_APP_API + '/channel', channelData, {
                    withCredentials: true,
                    credentials: true,
                });
                if (newChannel.status === 200 && newChannel.data.success) {
                    console.log('newChannel -> ', newChannel);
                    commit('user/PUSH_USER_CHANNEL', newChannel.data.channel, { root: true });
                    return {
                        success: true,
                        message: `The channel, ${newChannel.data.channel.name} was created!`,
                    };
                } else {
                    return {
                        success: false,
                        message: 'Error creating channel!',
                    };
                }
            } catch (err) {
                console.log(err);
                return {
                    success: false,
                    message: `Error creating channel. ${err.message}`,
                };
            }
        },
        // eslint-disable-next-line no-unused-vars
        async postMessage({ commit }, messageData) {
            try {
                // eslint-disable-next-line no-unused-vars
                const newMessage = await axios.post(process.env.VUE_APP_API + '/message', messageData, {
                    withCredentials: true,
                    credentials: true,
                });
            } catch (err) {
                console.log(err);
                EventBus.$emit('showSnackbar', {
                    success: false,
                    message: `Error posting message. ${err.message}`,
                });
            }
        },
        // eslint-disable-next-line no-unused-vars
        async getMessages({ getters, commit }, channelId) {
            commit('RESET_PAGE');
            try {
                if (getters.getCurrentChannel) {
                    socket.emit('channel-leave', {
                        channelId: getters.getCurrentChannel._id,
                    });
                }

                let page = getters.getPage;
                page = page.toString();

                const response = await axios.get(process.env.VUE_APP_API + '/message/' + channelId + '/?page=' + page, {
                    withCredentials: true,
                    credentials: true,
                });
                if (response.status === 200 && response.data.success) {
                    response.data.messages.forEach((message) => {
                        message.date = new Date(message.date);
                    });

                    commit('UPDATE_MESSAGES', response.data.messages);
                    commit('UPDATE_CURRENT_CHANNEL', response.data.channel);
                    socket.emit('channel-connect', {
                        channelId: getters.getCurrentChannel._id,
                    });
                }
            } catch (err) {
                console.log(err);
                EventBus.$emit('showSnackbar', {
                    success: false,
                    message: `Error fetching messages. ${err.message}`,
                });
            }
        },
        // eslint-disable-next-line no-unused-vars
        async getPaginatedMessages({ getters, commit }, channelId) {
            commit('ADD_PAGE');
            try {
                let page = getters.getPage;
                page = page.toString();

                const response = await axios.get(process.env.VUE_APP_API + '/message/' + channelId + '/?page=' + page, {
                    withCredentials: true,
                    credentials: true,
                });

                if (response.status === 200 && response.data.success) {
                    response.data.messages.forEach((message) => {
                        message.date = new Date(message.date);
                    });
                    commit('CONCAT_MESSAGES', response.data.messages);
                }
            } catch (err) {
                console.log(err);
                EventBus.$emit('showSnackbar', {
                    success: false,
                    message: `Error fetching messages. ${err.message}`,
                });
            }
        },
        // eslint-disable-next-line no-unused-vars
        async searchChannels({ commit }, string) {
            try {
                const response = await axios.post(process.env.VUE_APP_API + '/channel/search', string, {
                    withCredentials: true,
                    credentials: true,
                });
                if (response.status == 200 && response.data.success) {
                    return commit('UPDATE_SEARCH_CHANNELS', response.data.channels);
                } else {
                    throw new Error(response.data.message);
                }
            } catch (err) {
                console.log('search channels err => ', err);
                EventBus.$emit('showSnackbar', {
                    success: false,
                    message: err.message,
                });
            }
        },
    },
};
