<script setup></script>

<template>
  <div class="md:flex m-auto min-h-screen max-w-[1440px] overflow-hidden">
    <!-- left side -->
    <div class="hidden md:block md:w-1/2 lg:w-2/3 h-screen">
      <img
        src="@/assets/banner.png"
        alt="seasideview-banner"
        class="w-full h-full object-cover"
      />
    </div>
    <!-- right side -->
    <div
      class="p-4 pt-6 md:pt-4 rounded-2xl max-w-[456px] min-w-[256px] h-screen mx-auto flex flex-col gap-6 md:w-1/2 lg:w-1/3 md:p-12 overflow-hidden"
    >
      <slot />
    </div>
  </div>
</template>
