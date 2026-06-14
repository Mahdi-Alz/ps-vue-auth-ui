<script setup>
import { ref, computed } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// props
const props = defineProps({
  placeholder: String,
  type: {
    type: String,
    default: "text",
  },
});

const showPassword = ref(false);

const inputType = computed(() => {
  if (props.type !== "password") return props.type;
  return showPassword.value ? "text" : "password";
});
</script>

<template>
  <div class="relative w-full">
    <input
      :type="inputType"
      :placeholder="placeholder"
      class="input !rounded-[6px] w-full pr-12 px-4 py-[14px] font-roboto font-normal bg-gray-100 placeholder:text-[#808080]"
    />
    <button
      v-if="props.type === 'password'"
      type="button"
      @click="showPassword = !showPassword"
      class="absolute right-3 top-1/2 -translate-y-1/2"
    >
      <font-awesome-icon
        :icon="showPassword ? faEye : faEyeSlash"
        class="text-[#4D4D4D] w-4"
      />
    </button>
  </div>
</template>
