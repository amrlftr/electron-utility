<template >
  <button 
    type="button" 
    class="px-3 py-1 my-2 text-white text-xs uppercase font-bold rounded-lg flex items-center"
		style="letter-spacing: 0.15em;"
    :class="[ isDisabled ? 'bg-gray-300' : 'bg-indigo-600' ]"
    @click="$emit('click')" 
    :disabled="isDisabled"
  >
		<span v-if="hasIconSlot" class="mr-1">
			<slot name="icon"></slot>
		</span>
    <slot></slot>
  </button>
</template>
<script>
export default {
  props: {
    isDisabled: {
      type: Boolean,
      default: false,
    }
  },
	computed: {
		hasIconSlot() {
			return !!this.$slots.icon;
		}
	}
}
</script>
<style></style>