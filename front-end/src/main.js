import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { router } from '../routes/router';
import store from '../store/store';
// import VueSocketIO from 'vue-socket.io';

Vue.config.productionTip = false;

// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: 'http://localhost:3000',
//   // options: {path: ""}
// }))

new Vue({
    vuetify,
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
