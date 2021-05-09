import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "login" */ '../src/components/Login.vue'),
        },
        {
            path: '/signup',
            name: 'signup',
            component: () => import(/* webpackChunkName: "signup" */ '../src/components/Signup.vue'),
        },
        {
            path: '/',
            name: 'chat',
            component: () => import(/* webpackChunkName: "main" */ '../src/components/Main.vue'),
        },
    ],
});

export { router };
