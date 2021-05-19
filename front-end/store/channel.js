import axios from 'axios';
import socket from '@/socket';

export default {
    namespaced: true,
    state: {
        currentChannel: null,
        channels: [],
        messages: [],
        searchChannels: [],
    },
    getters: {
        getChannels: (state) => state.channels,
        getChannelMessages: (state) => state.messages,
        getCurrentChannel: (state) => state.currentChannel,
        getSearchChannels: (state) => state.searchChannels,
    },
    mutations: {
        UPDATE_CHANNELS: (state, channels) => (state.channels = channels),
        UPDATE_SEARCH_CHANNELS: (state, channels) => (state.searchChannels = channels),
        ADD_CHANNEL: (state, channel) => state.channels.push(channel),
        UPDATE_MESSAGES: (state, messages) => (state.messages = messages),
        UPDATE_CURRENT_CHANNEL: (state, channel) => (state.currentChannel = channel),
        ADD_MESSAGE: (state, message) => state.messages.push(message),
        CLEAR_SEARCH_CHANNELS: (state) => (state.searchChannels = []),
    },
    actions: {
        //TODO remove this?
        // eslint-disable-next-line no-unused-vars
        async read({ commit }) {
            try {
                const channels = await axios.get(process.env.VUE_APP_API + '/channel');
                if (channels.data.success) {
                    commit('UPDATE_CHANNELS', channels.data.channels);
                }
            } catch (err) {
                console.log(err);
            }
        },
        // eslint-disable-next-line no-unused-vars
        async create({ commit }, channelData) {
            try {
                const newChannel = await axios.post(process.env.VUE_APP_API + '/channel', channelData);
                commit('ADD_CHANNEL', newChannel.data.channel[0]);
            } catch (err) {
                console.log(err);
            }
        },
        // eslint-disable-next-line no-unused-vars
        async postMessage({ commit }, messageData) {
            try {
                // eslint-disable-next-line no-unused-vars
                const newMessage = await axios.post(process.env.VUE_APP_API + '/message', messageData);
            } catch (err) {
                console.log(err);
            }
        },
        // eslint-disable-next-line no-unused-vars
        async getMessages({ getters, commit }, channelId) {
            try {
                if (getters.getCurrentChannel) {
                    socket.emit('channel-leave', {
                        channelId: getters.getCurrentChannel._id,
                    });
                }

                const response = await axios.get(process.env.VUE_APP_API + '/message/' + channelId);
                if (response.status === 200 && response.data.success) {
                    response.data.messages.forEach((message) => {
                        message.date = new Date(message.date);
                    });

                    commit('UPDATE_MESSAGES', response.data.messages);
                    commit('UPDATE_CURRENT_CHANNEL', response.data.channel);
                    socket.emit('channel-connect', {
                        channelId: getters.getCurrentChannel._id,
                    });
                } else {
                    // TODO throw err
                }
            } catch (err) {
                console.log(err);
            }
        },
        // eslint-disable-next-line no-unused-vars
        async searchChannels({ commit }, string) {
            try {
                const response = await axios.post(process.env.VUE_APP_API + '/channel/search', string);
                if (response.status == 200 && response.data.success) {
                    return commit('UPDATE_SEARCH_CHANNELS', response.data.channels);
                } else {
                    throw new Error(response.data.message);
                }
            } catch (err) {
                console.log('search channels err => ', err);
            }
        },
    },
};
