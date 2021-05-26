import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { router } from '../routes/router';
import store from '../store/store';

// validation rules
import { extend } from 'vee-validate';
import { required, email, min } from 'vee-validate/dist/rules';

extend('required', {
    ...required,
    message: 'This field is required',
});

extend('email', {
    ...email,
    message: 'Please enter a valid email address',
});

extend('min', {
    ...min,
    message: `Must be {length} characters long`,
});

// Vue config
Vue.config.productionTip = false;

new Vue({
    vuetify,
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
