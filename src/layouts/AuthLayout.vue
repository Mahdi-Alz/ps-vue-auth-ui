<script setup>
import bannerImage from "@/assets/images/banner.png";
</script>

<template>
  <div class="container mx-auto min-h-screen overflow-hidden md:flex">
    <!-- left side -->
    <div class="hidden md:block md:w-1/2 lg:w-2/3 h-screen">
      <img
        :src="bannerImage"
        alt="seasideview-banner"
        class="w-full h-full object-cover"
      />
    </div>
    <!-- right side -->
    <div
      class="auth-panel-scroll mx-auto flex h-screen w-full flex-col gap-6 rounded-2xl p-4 pt-6 overflow-y-auto overscroll-contain md:w-1/2 md:p-12 md:pt-4 lg:w-1/3"
    >
      <slot />
    </div>
  </div>
</template>
