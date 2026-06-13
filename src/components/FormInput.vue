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
    class="input w-full px-4 py-[14px] rounded-md bg-gray-100 text-[#808080] font-roboto placeholder:text-[15px] placeholder:font-normal placeholder:text-[#808080]"
  />
</template>
