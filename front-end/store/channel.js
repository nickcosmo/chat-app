import axios from 'axios';

export default {
    namespaced: true,
    state: {
        currentChannelId: null,
        channels: [],
        messages: [],
    },
    getters: {
        getChannels: (state) => state.channels,
        getChannelMessages: (state) => state.messages,
        getCurrentChannel: (state) => {
            const currChannel = state.channels.filter((channel) => channel._id === state.currentChannelId);
            return currChannel[0];
        },
    },
    mutations: {
        UPDATE_CHANNELS: (state, channels) => (state.channels = channels),
        ADD_CHANNEL: (state, channel) => state.channels.push(channel),
        UPDATE_MESSAGES: (state, arr) => {
            state.messages = arr[0];
            state.currentChannelId = arr[1];
        },
        ADD_MESSAGE: (state, message) => state.messages.push(message),
    },
    actions: {
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
                const newMessage = await axios.post(process.env.VUE_APP_API + '/message', messageData);
                commit('ADD_MESSAGE', newMessage.data.message[0]);
            } catch (err) {
                console.log(err);
            }
        },
        // eslint-disable-next-line no-unused-vars
        async getMessages({ commit }, channelId) {
            try {
                const messages = await axios.get(process.env.VUE_APP_API + '/message/' + channelId);
                commit('UPDATE_MESSAGES', [messages.data.messages, channelId]);
            } catch (err) {
                console.log(err);
            }
        },
    },
};
