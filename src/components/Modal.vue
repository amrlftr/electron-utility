<template>
  <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <transition enter-active-class="transition ease-out duration-300" enter-from-class="transform opacity-0"
      enter-to-class="transform opacity-100" leave-active-class="transition ease-in duration-200"
      leave-from-class="transform opacity-10 scale-100" leave-to-class="transform opacity-0">
      <div v-show="isOpen" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    </transition>

    <div v-show="isOpen" class="fixed z-10 inset-0 overflow-y-auto">
      <div :class="[{ 'items-end': mode !== 'full' }] " class="flex sm:justify-center min-h-full p-4 text-center sm:p-0">
<!--				flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0-->
        <transition enter-active-class="transition ease-out duration-300"
          enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-200" leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95">
          <div v-show="isOpen"
            :class="[ width, mode === 'full' ? 'my-6' : 'my-auto', 'relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-y-auto shadow-xl transform transition-all w-full sm:p-6' ]">
            <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
              <button @click="isOpen = false" type="button"
                class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span class="sr-only">Close</span>
                <!-- Heroicon name: outline/x -->
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div>
              <div v-if="hasIconSlot"
                class="mx-auto flex items-center justify-center pb-4">
                <!-- Heroicon name: outline/check -->
                <slot name="icon"></slot>
              </div>
              <div class="text-center">
                <h3 class="text-lg leading-6 font-semibold font-serif text-gray-900" id="modal-title">{{ title }}</h3>
                <div class="mt-2">
                  <slot></slot>
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <button v-if="actionLabel" type="button" @click="$emit('action')"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm">{{
                actionLabel }}</button>
              <button v-if="cancelLabel" type="button" @click="$emit('cancel')"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm">{{
                cancelLabel }}</button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    actionLabel: String,
    cancelLabel: String,
    width: {
      type: String,
      default: 'sm:max-w-sm'
    },
		mode: {
			type: String,
			default: 'normal',
		}
  },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    show() {
      this.isOpen = true;
    },
    hide() {
      this.isOpen = false;
    },
  },
  computed: {
    hasIconSlot() {
      return !!this.$slots.icon;
    }
  }
}
</script>

<style></style>