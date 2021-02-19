import Vue from "vue";
import VueRouter from "vue-router";
import Map from "../views/Map";
import Details from "../views/Details";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect() {
      return "/map";
    }
  },
  {
    path: "/map",
    name: "Map",
    component: Map
  },
  {
    path: "/geocache/:id",
    name: "GeocacheDetails",
    component: Details
  },
  {
    path: "/hide",
    name: "HideNew",
    component: () => import("../views/AddForm.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
