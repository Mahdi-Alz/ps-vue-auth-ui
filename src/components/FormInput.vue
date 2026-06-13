<script setup>
defineProps({
  placeholder: {
    type: String,
  },
});
</script>

<template>
  <input
    type="text"
    :placeholder="placeholder"
    class="input input-bordered w-full max-w-xs px-4 py-[14px] rounded-md bg-gray-200 text-[#808080]"
  />
</template>
