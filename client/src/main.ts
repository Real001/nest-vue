import Vue from 'vue';
import VueApollo from 'vue-apollo';
// @ts-ignore
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import App from './App.vue';
import router from './router/index';
import store from './store';
import apolloClient from './ApolloClient';

Vue.config.productionTip = false;

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

const opts = {
  theme: {
    dark: true,
  },
  icons: {
    iconfont: 'md',
  },
};
Vue.use(Vuetify);

new Vue({
  el: '#app',
  apolloProvider,
  router,
  store,
  // @ts-ignore
  vuetify: new Vuetify(opts),
  render: h => h(App),
}).$mount('#app');
