import Vue from 'vue';
import Router from 'vue-router';
import cookie from 'js-cookie';
import store from '../store';
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
      redirect: { name: 'ide' },
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
    if (cookie.get('code_student_token') == null) {
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
