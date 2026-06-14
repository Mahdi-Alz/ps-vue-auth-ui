import { createRouter, createWebHistory } from "vue-router";
import SignInView from "@/views/SignInView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/signin",
      name: "sign-in",
      component: SignInView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/views/DashboardView.vue"),
    },
    {
      path: "/signup",
      name: "sign-up",
      component: () => import("@/views/SignUpView.vue"),
    },
  ],
});

export default router;
