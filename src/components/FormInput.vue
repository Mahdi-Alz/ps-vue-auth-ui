<script setup>
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const model = defineModel();

const props = defineProps({
  placeholder: String,
  label: String,
  password: {
    type: Boolean,
    default: false,
  },
  validator: {
    type: Function,
    default: null,
  },
});
const emit = defineEmits(["hasError"]);
const error = ref("");
const isPasswordShown = ref(false);

const handleInput = () => {
  if (!props.validator) return;
  if (!model.value) {
    error.value = "";
    emit("hasError", false);
    return;
  }
  error.value = props.validator(model.value);
  emit("hasError", error.value.length > 0);
};
</script>

<template>
  <div class="w-full">
    <label
      class="hidden md:block mb-2 font-roboto text-[11px] font-normal text-[#333333] px-4"
    >
      {{ label }}
    </label>

    <div>
      <div class="relative">
        <input
          v-model="model"
          :type="password ? (isPasswordShown ? 'text' : 'password') : 'text'"
          :placeholder="placeholder"
          @input="handleInput"
          class="input !rounded-[6px] w-full pr-12 px-4 py-[14px] font-roboto font-normal bg-gray-200 placeholder:text-[#808080] border border-gray-200"
          :class="error.length > 0 && '!input-error'"
        />
        <button
          v-if="password"
          type="button"
          @click="isPasswordShown = !isPasswordShown"
          class="absolute right-2 top-1/2 -translate-y-1/2 btn-square btn-sm"
        >
          <font-awesome-icon
            :icon="isPasswordShown ? faEye : faEyeSlash"
            class="text-[#4D4D4D] w-4 h-4"
          />
        </button>
      </div>
      <span
        v-if="error"
        class="mt-2 font-roboto text-[11px] font-normal text-red-600 px-4"
      >
        {{ error }}
      </span>
    </div>
  </div>
</template>
