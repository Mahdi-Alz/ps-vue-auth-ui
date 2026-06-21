<script setup>
// import required
import googleLogo from "@/assets/icons/g-google-icon.svg";
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { isIdentifierValid } from "@/utils/formValidation";

import Button from "@/components/Button.vue";
import FormInput from "@/components/FormInput.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";

const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();

const identifier = ref("");
const password = ref("");

const errors = ref({
  identifier: false,
});

const errorMessage = ref("");
// Sign in button handler
const handleSignin = () => {
  errorMessage.value = "";
  // first check if fields are not empty
  if (!identifier.value.trim() || !password.value.trim()) {
    errorMessage.value = "All the fields are required";
    toast.error("All fields are required");
    return;
  }
  if (errors.value.identifier) return;

  // then we pass them to signin function in Pinia Store and get the result of sign in
  const resultSignin = authStore.signin(identifier.value, password.value);
  if (!resultSignin.success) {
    errorMessage.value = resultSignin.message;
    toast.error(resultSignin.message);
    return;
  }
  toast.success("Signed in successfully!");
  router.push("/dashboard");
};
</script>
<template>
  <AuthLayout>
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
        label="Login"
        :validator="isIdentifierValid"
        @has-error="errors.identifier = $event"
      />
      <FormInput
        v-model="password"
        placeholder="Enter password"
        label="Password"
        password
      />
      <span v-if="errorMessage" class="text-red-500 text-sm text-center">
        {{ errorMessage }}</span
      >
      <div class="flex gap-2 items-center text-xs">
        <label class="label justify-start grow gap-2 px-0">
          <input
            type="checkbox"
            class="toggle toggle-sm custom-toggle !w-10 bg-white border-gray-200 checked:border-gray-200 checked:bg-[#808080]"
          />
          <span>Remember me</span>
        </label>
        <span class="text-[#007AFF]">Forgot password?</span>
      </div>
    </div>

    <!-- Sign In button -->
    <Button
      class="bg-[#007AFF] font-bold text-[15px] py-[10px] px-6 text-white"
      @click="handleSignin"
    >
      Sign in
    </Button>

    <!-- seprator line -->
    <hr />

    <!-- google button -->
    <Button
      :icon="googleLogo"
      class="bg-[#333333] font-normal text-[12px] py-[10px] px-6 text-white"
    >
      Sign in with Google
    </Button>

    <!-- redirect to sign up -->
    <p class="text-center font-roboto font-normal text-[12px]">
      Don't have an account?
      <router-link to="/signup" class="text-[#007AFF] ml-2"
        >Sign up now</router-link
      >
    </p>
  </AuthLayout>
</template>

<style scoped>
[type="checkbox"].toggle-sm {
  --handleoffset: 1rem !important;
}
</style>
