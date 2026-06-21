<script setup>
// import required
import googleLogo from "@/assets/g-google-icon.svg";
import { ref, reactive } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import {
  isNameValid,
  isEmailValid,
  isPhoneValid,
  isPasswordValid,
} from "@/utils/formValidation";

// import components
import Button from "@/components/Button.vue";
import FormInput from "@/components/FormInput.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";

// use imports
const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();

// create refs for each form input model
const form = reactive({
  name: { value: "", error: "" },
  email: { value: "", error: "" },
  phone: { value: "", error: "" },
  password: { value: "", error: "" },
  confirmPassword: { value: "", error: "" },
});

// shown error
const errorMessage = ref("");

// Sign up button handler
const handleSignup = () => {
  errorMessage.value = "";
  form.name.error = "";
  form.email.error = "";
  form.phone.error = "";
  form.password.error = "";
  form.confirmPassword.error = "";

  // first check if fields are not empty
  if (
    !form.name.value.trim() ||
    !form.email.value.trim() ||
    !form.phone.value.trim() ||
    !form.password.value.trim() ||
    !form.confirmPassword.value.trim()
  ) {
    errorMessage.value = "All fields are required";
    toast.error("All fields are required");
    return;
  }
  // check if passwords are the same
  if (form.password.value !== form.confirmPassword.value) {
    // errorMessage.value = "Passwords do not match";
    form.confirmPassword.error = "Passwords do not match";
  }

  //check if inputs are valid (using regex)
  if (!isNameValid(form.name.value)) {
    // errorMessage.value = "Invalid name";
    form.name.error = "Invalid Name";
  }

  if (!isEmailValid(form.email.value)) {
    // errorMessage.value = "Invalid email";
    form.email.error = "Invalid email";
  }

  if (!isPhoneValid(form.phone.value)) {
    // errorMessage.value = "Invalid phone number";
    form.phone.error = "Invalid Phone Number";
  }

  if (!isPasswordValid(form.password.value)) {
    // errorMessage.value = "Password must contain 9+ characters, uppercase, lowercase and number";
    form.password.error =
      "Must contain 9+ chars, uppercase, lowercase and number";
  }

  const hasErrors = Object.values(form).some((field) => field.error);

  if (hasErrors) return;
  // then we pass them as an Object to signup function in Pinia Store and get the result of sign up
  const resultSignup = authStore.signup({
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    password: form.password.value,
  });
  if (!resultSignup.success) {
    errorMessage.value = resultSignup.message;
    toast.error(resultSignup.message);
    return;
  }
  toast.success("Account created successfully!");
  router.push("/dashboard");
};
</script>
<template>
  <AuthLayout>
    <!-- title -->
    <h2
      class="text-[#1A1A1A] font-poppins font-semibold text-[20px] leading-[28px]"
    >
      Nice to see you
    </h2>

    <!-- form inputs -->
    <div class="flex flex-col gap-3">
      <FormInput
        v-model="form.name.value"
        placeholder="Enter your full name"
        label="Name"
        type="text"
        :error="form.name.error"
      />
      <FormInput
        v-model="form.email.value"
        placeholder="Email address"
        label="Email"
        type="email"
        :error="form.email.error"
      />
      <FormInput
        v-model="form.phone.value"
        placeholder="Phone number"
        label="Phone No."
        type="tel"
        :error="form.phone.error"
      />
      <FormInput
        v-model="form.password.value"
        placeholder="Enter password"
        label="Password"
        type="password"
        :error="form.password.error"
      />
      <FormInput
        v-model="form.confirmPassword.value"
        placeholder="Confirm password"
        label="Confirm Password"
        type="password"
        :error="form.confirmPassword.error"
      />
    </div>
    <span v-if="errorMessage" class="text-red-500 text-sm text-center">
      {{ errorMessage }}
    </span>
    <!-- Sign Up button -->
    <Button
      class="bg-[#007AFF] font-bold text-[15px] py-[10px] px-6 text-white"
      @click="handleSignup"
    >
      Sign Up
    </Button>

    <!-- seprator line -->
    <hr />

    <!-- google sign up button -->
    <Button
      :icon="googleLogo"
      class="bg-[#333333] font-normal text-[12px] py-[10px] px-6 text-white"
    >
      Sign Up with Google
    </Button>

    <!-- redirect to sign in -->
    <p class="text-center font-roboto font-normal text-[12px]">
      Already have an account?
      <router-link to="/signin" class="text-[#007AFF] ml-2"
        >Sign in</router-link
      >
    </p>
  </AuthLayout>
</template>

<!-- override to customize the toggle appearance -->
<style scoped>
[type="checkbox"].toggle-sm {
  --handleoffset: 1rem !important;
}
</style>
