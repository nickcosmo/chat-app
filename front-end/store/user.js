import axios from 'axios';

export default {
    namespaced: true,
    state: {
        name: null,
        id: null,
        image: null,
    },
    getters: {
        getUserId: (state) => state.id,
    },
    mutations: {},
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
                    async function(googleUser) {
                        await axios.post(process.env.VUE_APP_API + '/google-auth', {
                            token: googleUser.getAuthResponse().id_token,
                        });
                    },
                    async function(error) {
                        console.log(error);
                    }
                );
            });
        },
        // eslint-disable-next-line no-unused-vars
        async gitHubSigninSuccess({ commit }, code) {
            await axios.post(process.env.VUE_APP_API + '/github-auth', {
                code: code,
            });
        },
    },
};
