<script setup>
import Button from "@/components/Button.vue";
import FormInput from "@/components/FormInput.vue";
</script>
<template>
  <!-- full container -->
  <div class="md:flex m-auto min-h-screen max-w-[1440px]">
    <div class="hidden md:block md:w-1/2 lg:w-2/3 h-screen overflow-hidden">
      <img
        src="../assets/banner.png"
        alt="seasideview-banner"
        class="w-full h-full object-cover"
      />
    </div>
    <!-- sign in container -->
    <div
      class="p-4 pt-6 rounded-2xl max-w-[456px] min-w-[256px] min-h-screen mx-auto flex flex-col gap-6 md:w-1/2 lg:w-1/3 md:p-12"
    >
      <!-- title -->
      <h2
        class="text-[#1A1A1A] font-poppins font-semibold text-[20px] leading-[28px]"
      >
        Nice to see you again
      </h2>

      <!-- form inputs -->
      <div class="flex flex-col gap-3 md:gap-4">
        <FormInput placeholder="Enter your full name" label="name" />
        <FormInput placeholder="Email address" label="Email" type="email" />
        <FormInput placeholder="Phone number" label="Phone No." type="tel" />
        <FormInput
          placeholder="Enter password"
          label="Password"
          type="password"
        />
        <FormInput
          placeholder="Confirm password"
          label="Confirm Password"
          type="password"
        />
      </div>

      <!-- Sign Up button -->
      <Button>Sign Up</Button>

      <!-- seprator line -->
      <hr />

      <!-- google sign up button -->
      <Button variant="google">Sign Up with Google</Button>

      <!-- redirect to sign in -->
      <p class="text-center font-roboto font-normal text-[12px]">
        Already have an account?
        <span class="text-[#007AFF] ml-2">Sign in</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
[type="checkbox"].toggle-sm {
  --handleoffset: 1rem !important;
}
</style>
