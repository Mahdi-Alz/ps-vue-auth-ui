<script setup>
defineProps({
  icon: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <button class="btn font-roboto">
    <div :class="{ 'flex items-center gap-2': icon }">
      <img v-if="icon" :src="icon" alt="icon" class="w-5 h-5" />
      <slot />
    </div>
  </button>
</template>
