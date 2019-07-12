import Vue from 'vue';
import Router from 'vue-router';
import cookie from 'js-cookie';
import store from '../store';
import Customers from '../modules/customers/index.vue';
import CustomerCreate from '../modules/customers/Create.vue';
import Editor from '../modules/editor/index.vue';
import Login from '../modules/login/index.vue';
const Register = () => import('../modules/register/index.vue');

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: { name: 'login' },
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/teacher',
      name: 'customers',
      component: Customers,
      meta: {
        isAuth: true,
        isAdmin: true,
      },
    },
    {
      path: '/student',
      name: 'student-dashboard',
      component: CustomerCreate,
      meta: {
        isAuth: true,
        isUser: true,
      },
    },
    {
      path: '/ide',
      name: 'ide',
      component: Editor,
      meta: {
        isAuth: true,
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.isAuth)) {
    if (cookie.get('access_token') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath },
      });
    } else {
      let user = store.state.auth.user;
      if (user) {
        if (to.matched.some(record => record.meta.isAdmin)) {
          if (user.role == 'admin') {
            next();
          } else {
            next({ name: 'student-dashboard' });
          }
        }
      } else {
        store.dispatch('auth/loadUser').then(() => {
          user = store.state.auth.user;
          if (user) {
            if (to.matched.some(record => record.meta.isAdmin)) {
              if (user.role == 'admin') {
                next();
              } else {
                next({ name: 'student-dashboard' });
              }
            }
          } else {
            next('/');
          }
        });
      }
      next();
    }
  } else {
    next();
  }
});

export default router;
