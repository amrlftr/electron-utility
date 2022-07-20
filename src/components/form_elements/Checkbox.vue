<template>
  <div class="flex items-start">
    <div class="w-4 mr-2 relative">
      <input 
        @click="$emit('input', !value)"
        type="checkbox" 
        :id="uniqueId" 
        :checked="value"
        class="appearance-none checked:bg-indigo-500 w-3.5 h-3.5 mt-1 rounded-sm ring-1 ring-gray-400 checked:ring-indigo-500 cursor-pointer"
      >
      <svg xmlns="http://www.w3.org/2000/svg" :class="{ 'invisible' : !value }" class="absolute top-0 h-3.5 w-3.5 mt-1 text-white pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <label v-if="name" :for="uniqueId" class="-mt-0.5 cursor-pointer">{{ name }}</label>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      uniqueId: Date.now().toString(36) + Math.random().toString(36).substring(2),
    }
  },
}
</script>

<style></style>