<script setup>
// import required
import { ref, reactive } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import {
  isNameValid,
  isEmailValid,
  isPhoneValid,
  isPasswordValid,
} from "@/utils/formValidation";

// import components
import Button from "@/components/Button.vue";
import FormInput from "@/components/FormInput.vue";

// use imports
const authStore = useAuthStore();
const router = useRouter();

// create refs for each form input model
// Suggested by Alireza javadzadeh
// TODO refactor this to a object reactive
// const name = ref("");
// const email = ref("");
// const phone = ref("");
// const password = ref("");
// const confirmPassword = ref("");

const form = reactive({
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
});

// shown error
const errorMessage = ref("");

// Sign up button handler
const handleSignup = () => {
  errorMessage.value = "";
  // first check if fields are not empty
  if (
    !form.name.trim() ||
    !form.email.trim() ||
    !form.phone.trim() ||
    !form.password.trim() ||
    !form.confirmPassword.trim()
  ) {
    errorMessage.value = "All fields are required";
    return;
  }
  // check if passwords are the same
  if (form.password !== form.confirmPassword) {
    errorMessage.value = "Passwords do not match";
    return;
  }

  //check if inputs are valid (using regex)
  if (!isNameValid(form.name)) {
    errorMessage.value = "Invalid name";
    return;
  }

  if (!isEmailValid(form.email)) {
    errorMessage.value = "Invalid email";
    return;
  }

  if (!isPhoneValid(form.phone)) {
    errorMessage.value = "Invalid phone number";
    return;
  }

  if (!isPasswordValid(form.password)) {
    errorMessage.value =
      "Password must contain 9+ characters, uppercase, lowercase and number";
    return;
  }

  // then we pass them as an Object to signup function in Pinia Store and get the result of sign up
  const resultSignup = authStore.signup({
    name: form.name,
    email: form.email,
    phone: form.phone,
    password: form.password,
  });
  if (!resultSignup.success) {
    errorMessage.value = resultSignup.message;
    return;
  }

  // empty fileds for more insurance
  form.name = "";
  form.email = "";
  form.phone = "";
  form.password = "";
  form.confirmPassword = "";
  router.push("/dashboard");
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
      class="p-4 pt-6 md:pt-4 rounded-2xl max-w-[456px] min-w-[256px] h-screen mx-auto flex flex-col gap-6 md:w-1/2 lg:w-1/3 md:p-12 overflow-hidden"
    >
      <!-- title -->
      <h2
        class="text-[#1A1A1A] font-poppins font-semibold text-[20px] leading-[28px]"
      >
        Nice to see you
      </h2>

      <!-- form inputs -->
      <div class="flex flex-col gap-3">
        <FormInput
          v-model="form.name"
          placeholder="Enter your full name"
          label="name"
        />
        <FormInput
          v-model="form.email"
          placeholder="Email address"
          label="Email"
          type="email"
        />
        <FormInput
          v-model="form.phone"
          placeholder="Phone number"
          label="Phone No."
          type="tel"
        />
        <FormInput
          v-model="form.password"
          placeholder="Enter password"
          label="Password"
          type="password"
        />
        <FormInput
          v-model="form.confirmPassword"
          placeholder="Confirm password"
          label="Confirm Password"
          type="password"
        />
      </div>
      <span v-if="errorMessage" class="text-red-500 text-sm text-center">
        {{ errorMessage }}
      </span>
      <!-- Sign Up button -->
      <Button @click="handleSignup"> Sign Up </Button>

      <!-- seprator line -->
      <hr />

      <!-- google sign up button -->
      <Button variant="google">Sign Up with Google</Button>

      <!-- redirect to sign in -->
      <p class="text-center font-roboto font-normal text-[12px]">
        Already have an account?
        <router-link to="/signin" class="text-[#007AFF] ml-2"
          >Sign in</router-link
        >
      </p>
    </div>
  </div>
</template>

<!-- Alireza and I added this style override to customize the toggle appearance ;) -->
<style scoped>
[type="checkbox"].toggle-sm {
  --handleoffset: 1rem !important;
}
</style>
