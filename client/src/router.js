import Vue from "vue";
import Router from "vue-router";
import Customers from "./views/customers/index.vue";
import CustomerCreate from "./views/customers/Create.vue";
import Editor from "./views/editor/index.vue";
Vue.use(Router);
export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: { name: 'customers' },
        },
        {
            path: "/customers",
            name: "customers",
            component: Customers
        },
        {
            path: "/customers/create",
            name: "createCustomer",
            component: CustomerCreate
        },
        {
            path: "/editor",
            name: "editor",
            component: Editor
        }
    ]
});
//# sourceMappingURL=router.js.map