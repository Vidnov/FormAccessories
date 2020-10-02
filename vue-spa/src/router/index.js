import Vue from "vue";
import VueRouter from "vue-router";
import Form_Phone from "../views/Form_Phone.vue";
import Request_form from "../views/Request_form.vue";
import Login from "../views/Login.vue";
import AdminPage from "../views/Admin_Page.vue";
import RequestPage from "../views/Request_Page.vue";
import indexPage from "../views/Index_Page.vue";
import Comment_Applicant from "../views/Comment_Applicant.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    
    name: "Request form",
    component: Request_form
  },
  {
    path: "/main",
    name: "Index",
    component: indexPage
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/admin",
    name: "AdminPage",
    component: AdminPage
  },
  {
    path: "/request/:id",
    name: "requestPage",
    component: RequestPage
  },
  {
    path: "/comment_retail/:id",
    name: "Comment_Applicant",
    component: Comment_Applicant
  },
  {
    path: "/test",
    name: "Form_Phone",
    component: Form_Phone
  }
];

const router = new VueRouter({
  routes
});

export default router;
