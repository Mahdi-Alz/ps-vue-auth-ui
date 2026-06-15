<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/AuthStore";
import Button from "@/components/Button.vue";

const router = useRouter();
const authStore = useAuthStore();

const handleSignout = () => {
  authStore.signout();
  router.push("/signin");
};
</script>

<template>
  <div
    class="w-full p-4 pt-6 rounded-2xl max-w-[456px] min-w-[256px] min-h-screen mx-auto flex flex-col gap-6 md:w-1/2 lg:w-1/3 md:p-12 items-center"
  >
    <span
      class="text-[#1A1A1A] font-poppins font-semibold text-[20px] leading-[28px]"
      >Welcome to dashboard</span
    >
    <div class="card bg-gray-200 text-[#1A1A1A] w-full font-normal font-roboto">
      <div class="card-body">
        <h2 class="card-title">Name: {{ authStore.currentUser?.name }}</h2>
        <p>Email: {{ authStore.currentUser?.email }}</p>
        <p>Phone No.: {{ authStore.currentUser?.phone }}</p>
      </div>
    </div>
    <Button variant="signout" class="w-full" @click="handleSignout"
      >Sign out</Button
    >
  </div>
</template>
