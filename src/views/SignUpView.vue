<script setup>
import googleLogo from "@/assets/icons/g-google-icon.svg";
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { storeToRefs } from "pinia";
import {
  isNameValid,
  isEmailValid,
  isPhoneValid,
  isPasswordValid,
} from "@/utils/formValidation";

import Button from "@/components/Button.vue";
import FormInput from "@/components/FormInput.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";

const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();

const { error } = storeToRefs(authStore);
const { signup } = authStore;

const name = ref("");
const email = ref("");
const phone = ref("");
const password = ref("");
const confirmPassword = ref("");

const errors = ref({
  name: false,
  email: false,
  phone: false,
  password: false,
  confirmPassword: false,
});

const errorMessage = ref("");

const validateConfirmPassword = (value) =>
  value === password.value ? "" : "Passwords do not match";

const handleSignup = () => {
  errorMessage.value = "";
  if (
    !name.value.trim() ||
    !email.value.trim() ||
    !phone.value.trim() ||
    !password.value.trim() ||
    !confirmPassword.value.trim()
  ) {
    errorMessage.value = "All fields are required";
    toast.error("All fields are required");
    return;
  }
  if (Object.values(errors.value).some((hasError) => hasError)) return;

  signup({
    name: name.value,
    email: email.value,
    phone: phone.value,
    password: password.value,
  });
  if (error.value) {
    errorMessage.value = error.value;
    toast.error(error.value);
    return;
  }
  toast.success("Account created successfully!");
  router.push({ name: "dashboard" });
};

const hasUppercase = computed(() => /[A-Z]/.test(password.value));
const hasLowercase = computed(() => /[a-z]/.test(password.value));
const hasNumber = computed(() => /\d/.test(password.value));
const hasMinLength = computed(() => password.value.length >= 9);
</script>

<template>
  <AuthLayout>
    <h2
      class="text-[#1A1A1A] font-poppins font-semibold text-[20px] leading-[28px]"
    >
      Nice to see you
    </h2>

    <div class="flex flex-col gap-3">
      <FormInput
        v-model="name"
        placeholder="Enter your full name"
        label="Name"
        :validator="isNameValid"
        @has-error="errors.name = $event"
      />
      <FormInput
        v-model="email"
        placeholder="Email address"
        label="Email"
        :validator="isEmailValid"
        @has-error="errors.email = $event"
      />
      <FormInput
        v-model="phone"
        placeholder="Phone number"
        label="Phone No."
        :validator="isPhoneValid"
        @has-error="errors.phone = $event"
      />
      <FormInput
        v-model="password"
        placeholder="Enter password"
        label="Password"
        password
        :validator="isPasswordValid"
        @has-error="errors.password = $event"
      />
      <div class="flex flex-col gap-1 px-4 -mt-1">
        <label
          class="flex items-center gap-2 font-roboto text-[11px] text-[#4D4D4D]"
        >
          <input
            type="checkbox"
            :checked="hasUppercase"
            disabled
            class="checkbox checkbox-xs"
          />
          At least one uppercase letter
        </label>

        <label
          class="flex items-center gap-2 font-roboto text-[11px] text-[#4D4D4D]"
        >
          <input
            type="checkbox"
            :checked="hasLowercase"
            disabled
            class="checkbox checkbox-xs"
          />
          At least one lowercase letter
        </label>

        <label
          class="flex items-center gap-2 font-roboto text-[11px] text-[#4D4D4D]"
        >
          <input
            type="checkbox"
            :checked="hasNumber"
            disabled
            class="checkbox checkbox-xs"
          />
          At least one number
        </label>

        <label
          class="flex items-center gap-2 font-roboto text-[11px] text-[#4D4D4D]"
        >
          <input
            type="checkbox"
            :checked="hasMinLength"
            disabled
            class="checkbox checkbox-xs"
          />
          At least 9 characters
        </label>
      </div>
      <FormInput
        v-model="confirmPassword"
        placeholder="Confirm password"
        label="Confirm Password"
        password
        :validator="validateConfirmPassword"
        @has-error="errors.confirmPassword = $event"
      />
    </div>

    <span v-if="errorMessage" class="text-red-500 text-sm text-center">
      {{ errorMessage }}
    </span>

    <Button
      class="bg-[#007AFF] font-bold text-[15px] py-[10px] px-6 text-white"
      @click="handleSignup"
    >
      Sign Up
    </Button>

    <hr />

    <Button
      :icon="googleLogo"
      class="bg-[#333333] font-normal text-[12px] py-[10px] px-6 text-white"
    >
      Sign Up with Google
    </Button>

    <p class="text-center font-roboto font-normal text-[12px]">
      Already have an account?
      <router-link to="/signin" class="text-[#007AFF] ml-2"
        >Sign in</router-link
      >
    </p>
  </AuthLayout>
</template>

<style scoped>
[type="checkbox"].toggle-sm {
  --handleoffset: 1rem !important;
}
</style>
