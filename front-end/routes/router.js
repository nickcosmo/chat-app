import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/store';

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
            path: '/success',
            name: 'success',
            component: () => import(/* webpackChunkName: "success" */ '../src/components/GitHubSuccess.vue'),
            beforeEnter: (to, from, next) => {
                if (from.name) {
                    next({ name: 'login' });
                } else {
                    next();
                }
            },
        },
        {
            path: '/',
            name: 'chat',
            component: () => import(/* webpackChunkName: "main" */ '../src/components/Main.vue'),
            beforeEnter: (to, from, next) => {
                if (!store.getters['user/getUser']) {
                    next({ name: 'login' });
                } else {
                    next();
                }
            },
        },
        {
            path: '*',
            name: '404',
            component: () => import(/* webpackChunkName: "404" */ '../src/components/404.vue'),
        },
    ],
});

export { router };
