<script setup>
import googleLogo from "@/assets/g-google-icon.svg";
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "primary",
  },
});

const buttonClass = computed(() => {
  if (props.variant === "google") {
    return "bg-[#333333] font-normal text-[12px]";
  }
  return "bg-[#007AFF] font-bold text-[15px] ";
});
</script>

<template>
  <button
    class="btn font-roboto py-[10px] px-6 text-white"
    :class="buttonClass"
  >
    <div v-if="variant === 'google'" class="flex items-center gap-2">
      <img :src="googleLogo" alt="Google" class="w-5 h-5" />
      <span>Sign in with Google</span>
    </div>

    <div v-else>
      <span>Sign in</span>
    </div>
  </button>
</template>
