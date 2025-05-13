import { createRouter, createWebHistory } from "vue-router";
import BandForm from "../components/BandForm.vue";
import ResultDisplay from "../components/ResultDisplay.vue";

const routes = [
  {
    path: "/",
    name: "BandForm",
    component: BandForm,
  },
  {
    path: "/results",
    name: "ResultDisplay",
    component: ResultDisplay,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
