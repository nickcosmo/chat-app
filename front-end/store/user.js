export default {
    namespaced: true,
    state: {
        name: null,
        id: null,
        image: null,
    },
    getters: {
        getUserId: state => state.id
    },
    mutations: {},
    actions: {},
};
