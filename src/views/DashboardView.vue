<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import Button from "@/components/Button.vue";

const router = useRouter();
const authStore = useAuthStore();

const handleSignout = () => {
  authStore.signout();
  router.push("/signin");
};
</script>

<template>
  <div class="container mx-auto min-h-screen">
    <div
      class="mx-auto flex min-h-screen w-full flex-col items-center gap-6 rounded-2xl p-4 pt-6 md:w-1/2 md:p-12 lg:w-1/3"
    >
      <span
        class="text-[#1A1A1A] font-poppins font-semibold text-[20px] leading-[28px]"
        >Welcome to dashboard</span
      >
      <div
        class="card bg-gray-200 text-[#1A1A1A] w-full font-normal font-roboto"
      >
        <div class="card-body">
          <h2 class="card-title">Name: {{ authStore.currentUser?.name }}</h2>
          <p>Email: {{ authStore.currentUser?.email }}</p>
          <p>Phone No.: {{ authStore.currentUser?.phone }}</p>
        </div>
      </div>
      <Button
        class="w-full bg-red-500 font-bold text-[15px] py-[10px] px-6 text-white"
        @click="handleSignout"
      >
        Sign out
      </Button>
    </div>
  </div>
</template>
