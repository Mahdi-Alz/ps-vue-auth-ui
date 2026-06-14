<script setup>
import Button from "@/components/Button.vue";
import FormInput from "@/components/FormInput.vue";
</script>
<template>
  <!-- container -->
  <div
    class="py-4 px-2 rounded-2xl max-w-[375px] min-h-screen mx-auto flex flex-col gap-6"
  >
    <!-- title -->
    <h2
      class="text-[#1A1A1A] font-poppins font-semibold text-[20px] leading-[28px]"
    >
      Nice to see you again
    </h2>

    <!-- form inputs -->
    <div class="flex flex-col gap-3">
      <FormInput placeholder="Email or phone number" type="text" />
      <FormInput placeholder="Enter password" type="password" />
      <div class="flex justify-between items-center text-[12px]">
        <label class="label">
          <input
            type="checkbox"
            class="toggle toggle-sm custom-toggle !w-10 bg-white border-gray-100 checked:border-gray-100 checked:bg-[#808080] mr-2"
          />
          Remember me
        </label>
        <span class="text-[#007AFF]">Forgot password?</span>
      </div>
    </div>

    <!-- Sign In button -->
    <Button />

    <!-- seprator line -->
    <hr />

    <!-- google button -->
    <Button variant="google" />

    <!-- redirect to sign up -->
    <p class="text-center font-roboto font-normal text-[12px]">
      Don't have an account? <span class="text-[#007AFF]">Sign up now</span>
    </p>
  </div>
</template>

<style scoped>
[type="checkbox"].toggle-sm {
  --handleoffset: 1rem !important;
}
</style>
