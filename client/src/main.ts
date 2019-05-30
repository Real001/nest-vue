import Vue from "vue";
import VueApollo from "vue-apollo";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";
import apolloClient from "./ApolloClient";

Vue.config.productionTip = false;

Vue.use(VueApollo);
const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

new Vue({
  el: "#app",
  apolloProvider,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
