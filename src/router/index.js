import { createRouter, createWebHistory } from "vue-router";
import SignInView from "@/views/SignInView.vue";
import { useAuthStore } from "@/stores/AuthStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      //redirect user if they're already signed in
      redirect: () => {
        const authStore = useAuthStore();

        return authStore.isLoggedIn ? "/dashboard" : "/signin";
      },
    },
    {
      path: "/signin",
      name: "sign-in",
      component: SignInView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/views/DashboardView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/signup",
      name: "sign-up",
      component: () => import("@/views/SignUpView.vue"),
    },
  ],
});

// Ordered by Ali Rooholamini
// Route-Guarding
// TODO
// router.beforeEach((to) => {
//   const authStore = useAuthStore();

//   if (to.meta.requiresAuth && !authStore.isLoggedIn) {
//     return { name: "sign-in" };
//   }

//   if (
//     (to.name === "sign-in" || to.name === "sign-up") &&
//     authStore.isLoggedIn
//   ) {
//     return { name: "dashboard" };
//   }
// });

export default router;
