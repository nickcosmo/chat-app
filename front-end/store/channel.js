import axios from 'axios';

export default {
    namespaced: true,
    state: {
        currentChannel: null,
        channels: [],
        messages: [],
    },
    getters: {
        getChannels: (state) => state.channels,
    },
    mutations: {
        UPDATE_CHANNELS: (state, channels) => (state.channels = channels),
        ADD_CHANNEL: (state, channel) => state.channels.push(channel),
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
                console.log(newChannel.data);
                commit('ADD_CHANNEL', newChannel.data.channel[0]);
            } catch (err) {
                console.log(err);
            }
        },
    },
};
