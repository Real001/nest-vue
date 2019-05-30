import Vue from "vue";
import VueApollo from "vue-apollo";
import AceEditor from "vue-editor-ace";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import apolloClient from "./ApolloClient";
Vue.config.productionTip = false;
Vue.use(VueApollo);
Vue.use(AceEditor);
Vue.use(Vuetify, {
    iconfont: 'md'
});
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
//# sourceMappingURL=main.js.map