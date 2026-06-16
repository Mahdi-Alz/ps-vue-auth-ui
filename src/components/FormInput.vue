<script setup>
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// define component v-model
const model = defineModel();

// props
const props = defineProps({
  placeholder: String,
  label: String,
  type: {
    type: String,
    default: "text",
  },
  error: {
    type: String,
    default: "",
  },
});
// to manage eye symbol toggle
const isPasswordShown = ref(false);
</script>

<template>
  <div class="w-full">
    <label
      class="hidden md:block mb-2 font-roboto text-[11px] font-normal text-[#333333] px-4"
    >
      {{ props.label }}
    </label>
    <!-- we first check if it's Password field or not, then if we have to show it or not -->
    <div class="relative">
      <input
        v-model="model"
        :type="
          props.type === 'password'
            ? isPasswordShown
              ? 'text'
              : 'password'
            : props.type
        "
        :placeholder="placeholder"
        class="input !rounded-[6px] w-full pr-12 px-4 py-[14px] font-roboto font-normal bg-gray-200 placeholder:text-[#808080] border border-gray-200"
        :class="props.error.length > 0 && '!input-error'"
      />
      <button
        v-if="props.type === 'password'"
        type="button"
        @click="isPasswordShown = !isPasswordShown"
        class="absolute right-2 top-1/2 -translate-y-1/2 btn-square btn-sm"
      >
        <font-awesome-icon
          :icon="isPasswordShown ? faEye : faEyeSlash"
          class="text-[#4D4D4D] w-4 h-4"
        />
      </button>
      <span class="mt-2 font-roboto text-[11px] font-normal text-red-600 px-4">
        {{ props.error }}
      </span>
    </div>
  </div>
</template>
