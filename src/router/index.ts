import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Admin from "../views/Admin.vue";
import AddEditEvent from "../views/AddEditEvent.vue";
import Events from "../views/Events.vue";
import EventDetails from "../views/EventDetails.vue";
import Reports from "../views/Reports.vue";

Vue.use(VueRouter);

export const navigateName = (route: string) => {
  if (route !== router.currentRoute.name) {
    router.push({ name: route }).catch((err) => console.error(err));
  }
};

export const navigatePath = (path: any) => {
  if (path !== router.currentRoute.path) {
    router.push(path).catch((err) => console.error(err));
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/events",
    name: "events",
    component: Events
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin
  },
  {
    path: "/addeditevent/:id?",
    name: "addEditEvent",
    component: AddEditEvent
  },
  {
    path: "/eventdetails/:id",
    name: "eventDetails",
    component: EventDetails
  },
  {
    path: "/reports/:year",
    name: "reports",
    component: Reports
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
