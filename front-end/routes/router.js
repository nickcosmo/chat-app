import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "login" */ '../src/components/Login.vue'),
        },
        {
            path: '/',
            name: 'chat',
            component: () => import(/* webpackChunkName: "main" */ '../src/components/Main.vue'),
        },
    ],
});

export { router };
