<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useRouter } from "vue-router";

import Button from "@/components/Button.vue";
import FormInput from "@/components/FormInput.vue";

// const router = useRouter();
const authStore = useAuthStore();
const identifier = ref("");
const password = ref("");
const errorMessage = ref("");

const handleSignin = () => {
  errorMessage.value = "";
  // first check if fields are not empty
  if (!identifier.value.trim() || !password.value.trim()) {
    errorMessage.value = "All the fields are required";
    return;
  }
  // then we pass them to signin function in Pinia Store and get the result of sign in
  const resultSignin = authStore.signin(identifier.value, password.value);
  if (!resultSignin.success) {
    errorMessage.value = resultSignin.message;
    return;
  }
  //router.push("/dashboard/");
  // to check the console
  console.log("success login id:" + resultSignin.id);
};
</script>
<template>
  <!-- full container -->
  <div class="md:flex m-auto min-h-screen max-w-[1440px] overflow-hidden">
    <div class="hidden md:block md:w-1/2 lg:w-2/3 h-screen">
      <img
        src="../assets/banner.png"
        alt="seasideview-banner"
        class="w-full h-full object-cover"
      />
    </div>
    <!-- sign in container -->
    <div
      class="p-4 pt-6 rounded-2xl max-w-[456px] min-w-[256px] h-screen mx-auto flex flex-col gap-6 md:w-1/2 lg:w-1/3 md:p-12 overflow-hidden"
    >
      <!-- title -->
      <h2
        class="text-[#1A1A1A] font-poppins font-semibold text-[20px] leading-[28px]"
      >
        Nice to see you again
      </h2>

      <!-- form inputs -->
      <div class="flex flex-col gap-3 md:gap-4">
        <FormInput
          v-model="identifier"
          placeholder="Email or phone number"
          type="text"
        />
        <FormInput
          v-model="password"
          placeholder="Enter password"
          type="password"
        />
        <span v-if="errorMessage" class="text-red-500 text-sm text-center">
          {{ errorMessage }}</span
        >
        <div class="flex gap-2 items-center text-xs">
          <label class="label justify-start grow gap-2 px-0">
            <input
              type="checkbox"
              class="toggle toggle-sm custom-toggle !w-10 bg-white border-gray-100 checked:border-gray-100 checked:bg-[#808080]"
            />
            <span>Remember me</span>
          </label>
          <span class="text-[#007AFF]">Forgot password?</span>
        </div>
      </div>

      <!-- Sign In button -->
      <Button @click="handleSignin">Sign in</Button>

      <!-- seprator line -->
      <hr />

      <!-- google button -->
      <Button variant="google">Sign in with Google</Button>

      <!-- redirect to sign up -->
      <p class="text-center font-roboto font-normal text-[12px]">
        Don't have an account?
        <router-link to="/signup" class="text-[#007AFF] ml-2"
          >Sign up now</router-link
        >
      </p>
    </div>
  </div>
</template>

<style scoped>
[type="checkbox"].toggle-sm {
  --handleoffset: 1rem !important;
}
</style>
