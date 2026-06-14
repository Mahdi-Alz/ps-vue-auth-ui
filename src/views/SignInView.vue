<script setup>
import Button from "@/components/Button.vue";
import FormInput from "@/components/FormInput.vue";
const authStore = useAuthStore();
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
        <FormInput placeholder="Email or phone number" type="text" />
        <FormInput placeholder="Enter password" type="password" />
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
      <Button>Sign in</Button>

      <!-- seprator line -->
      <hr />

      <!-- google button -->
      <Button variant="google">Sign in with Google</Button>

      <!-- redirect to sign up -->
      <p class="text-center font-roboto font-normal text-[12px]">
        Don't have an account?
        <span class="text-[#007AFF] ml-2">Sign up now</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
[type="checkbox"].toggle-sm {
  --handleoffset: 1rem !important;
}
</style>
