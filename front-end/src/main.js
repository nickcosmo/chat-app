import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
// import VueSocketIO from 'vue-socket.io';

Vue.config.productionTip = false;

// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: 'http://localhost:3000',
//   // options: {path: ""}
// }))

new Vue({
    vuetify,
    render: (h) => h(App),
}).$mount('#app');
