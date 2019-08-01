import Vue from 'vue';
import VueApollo from 'vue-apollo';
import AceEditor from 'vue-editor-ace';
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import App from './App.vue';
import router from './router/index';
import store from './store';
import apolloClient from './ApolloClient';

Vue.config.productionTip = false;

Vue.use(VueApollo);
Vue.use(AceEditor);

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
  vuetify: new Vuetify(opts),
  render: h => h(App),
}).$mount('#app');
