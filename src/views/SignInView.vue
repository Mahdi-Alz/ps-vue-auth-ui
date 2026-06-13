<script setup>
import FormInput from "@/components/FormInput.vue";
</script>
<template>
  <!-- container -->
  <div
    class="py-4 px-2 rounded-2xl max-w-[375px] min-h-screen mx-auto flex flex-col gap-6"
  >
    <!-- title -->
    <h2 class="text-[#1A1A1A] font-semibold text-[20px] leading-[28px]">
      Nice to see you again
    </h2>

    <!-- form inputs -->
    <div class="flex flex-col gap-3">
      <FormInput placeholder="Email or phone number" />
      <FormInput placeholder="Enter password" />
    </div>
  </div>
</template>
