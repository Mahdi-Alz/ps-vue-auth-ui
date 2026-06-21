<script setup>
// import required
import googleLogo from "@/assets/g-google-icon.svg";
import { ref } from "vue";
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

// Sign up button handler
// const handleSignup = () => {
//   errorMessage.value = "";
//   form.name.error = "";
//   form.email.error = "";
//   form.phone.error = "";
//   form.password.error = "";
//   form.confirmPassword.error = "";

//   // first check if fields are not empty
//   if (
//     !form.name.value.trim() ||
//     !form.email.value.trim() ||
//     !form.phone.value.trim() ||
//     !form.password.value.trim() ||
//     !form.confirmPassword.value.trim()
//   ) {
//     errorMessage.value = "All fields are required";
//     toast.error("All fields are required");
//     return;
//   }
//   // check if passwords are the same
//   if (form.password.value !== form.confirmPassword.value) {
//     // errorMessage.value = "Passwords do not match";
//     form.confirmPassword.error = "Passwords do not match";
//   }

//   //check if inputs are valid (using regex)
//   if (!isNameValid(form.name.value)) {
//     // errorMessage.value = "Invalid name";
//     form.name.error = "Invalid Name";
//   }

//   if (!isEmailValid(form.email.value)) {
//     // errorMessage.value = "Invalid email";
//     form.email.error = "Invalid email";
//   }

//   if (!isPhoneValid(form.phone.value)) {
//     // errorMessage.value = "Invalid phone number";
//     form.phone.error = "Invalid Phone Number";
//   }

//   if (!isPasswordValid(form.password.value)) {
//     // errorMessage.value = "Password must contain 9+ characters, uppercase, lowercase and number";
//     form.password.error =
//       "Must contain 9+ chars, uppercase, lowercase and number";
//   }

//   const hasErrors = Object.values(form).some((field) => field.error);

//   if (hasErrors) return;
//   // then we pass them as an Object to signup function in Pinia Store and get the result of sign up
//   const resultSignup = authStore.signup({
//     name: form.name.value,
//     email: form.email.value,
//     phone: form.phone.value,
//     password: form.password.value,
//   });
//   if (!resultSignup.success) {
//     errorMessage.value = resultSignup.message;
//     toast.error(resultSignup.message);
//     return;
//   }
//   toast.success("Account created successfully!");
//   router.push("/dashboard");
// };

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

  const hasErrors = Object.values(errors.value).some((error) => error);
  if (hasErrors) return;

  const resultSignup = authStore.signup({
    name: name.value,
    email: email.value,
    phone: phone.value,
    password: password.value,
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

<!-- override to customize the toggle appearance -->
<style scoped>
[type="checkbox"].toggle-sm {
  --handleoffset: 1rem !important;
}
</style>
