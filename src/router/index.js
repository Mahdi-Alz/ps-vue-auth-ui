import { createRouter, createWebHistory } from "vue-router";
import SignInView from "@/views/SignInView.vue";
import { useAuthStore } from "@/stores/authStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: () => import("@/views/DashboardView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/signin",
      name: "sign-in",
      component: SignInView,
    },
    {
      path: "/signup",
      name: "sign-up",
      component: () => import("@/views/SignUpView.vue"),
    },
  ],
});

router.beforeEach((to) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return { name: "sign-in" };
  }
  if (
    (to.name === "sign-in" || to.name === "sign-up") &&
    authStore.isLoggedIn
  ) {
    return { name: "dashboard" };
  }
});

export default router;
