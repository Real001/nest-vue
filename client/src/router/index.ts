import Vue from "vue";
import Router from "vue-router";
import Customers from "../modules/customers/index.vue";
import CustomerCreate from "../modules/customers/Create.vue";
import Editor from '../modules/editor/index.vue';
import Login from '../modules/login/index.vue'

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: { name: "customers" }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
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
      path: "/ide",
      name: "IDE",
      component: Editor
    }
  ]
});
