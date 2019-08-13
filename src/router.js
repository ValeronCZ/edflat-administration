import Vue from './init';
import Router from 'vue-router';
import store from "./store";
import Home from '@/views/Home';
import Account from '@/views/Account';
import Adverts from '@/views/ad/Adverts';
import Advert from '@/views/ad/Advert';
import Users from '@/views/admin/user/Users';
import User from '@/views/admin/user/User';
import Settings from '@/views/Settings';
import ParserSources from '@/views/admin/parser/ParserSources';
import ParserSource from '@/views/admin/parser/ParserSource';
import ServicePrices from '@/views/admin/service-price/ServicePrices';
import ServicePrice from '@/views/admin/service-price/ServicePrice';
import Error403 from "@/views/errors/Error403Page.vue";
import Error404 from "@/views/errors/Error404Page.vue";

Vue.use(Router);

const router = new Router({
    base: process.env.NODE_ENV === 'production' ? 'home' : '',
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/sources',
            name: 'sources',
            component: ParserSources,
            meta: {
                admin: true
            }
        },
        {
            path: '/sources/:id',
            name: 'source',
            component: ParserSource,
            meta: {
                admin: true
            }
        },
        {
            path: '/service-prices',
            name: 'service-prices',
            component: ServicePrices,
            meta: {
                admin: true
            }
        },
        {
            path: '/service-price/:id',
            name: 'service-price',
            component: ServicePrice,
            meta: {
                admin: true
            }
        },
        {
            path: '/account',
            name: 'account',
            component: Account,
            meta: {
                admin: false
            }
        },
        {
            path: '/adverts',
            name: 'adverts',
            component: Adverts,
            meta: {
                admin: false
            }
        },
        {
            path: '/adverts/:id',
            name: 'advert',
            component: Advert,
            meta: {
                admin: false
            }
        },
        {
            path: '/users',
            name: 'users',
            component: Users,
            meta: {
                admin: true
            }
        },
        {
            path: '/users/:id',
            name: 'user',
            component: User,
            meta: {
                admin: true
            }
        },
        {
            path: '/settings',
            name: 'settings',
            component: Settings
        },
        // Access denied
        {
            path: '/access_denied',
            name: 'error-403',
            component: Error403
        },
        // Page not found route
        {
            path: "*",
            name: "error-404",
            component: Error404
        }
    ]
});

function checkAccess(to, next) {
    const isUserAdmin = to.meta.admin;
    if (isUserAdmin !== undefined) {
        if (isUserAdmin != store.getters["isAdmin"]) {
            return next('/access_denied');
        }
    }
    next();
}

router.beforeEach((to, from, next) => {
    // Request for user information just once
    if (!store.getters["userInfoLoaded"]) {
        store.dispatch("fetchSetUser")
            .then(() => {
                store.commit("setUserInfoStatus", true);
                // Check admin restriction
                checkAccess(to, next);
            });
    } else {
        // Check admin restriction
        checkAccess(to, next);
    }
});

export default router;
