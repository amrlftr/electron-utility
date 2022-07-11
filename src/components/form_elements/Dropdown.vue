<template>
  <div class="relative inline-block text-left">
    <div>
      <button 
        @click="isShow = !isShow"
        type="button" 
        class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" 
        aria-expanded="true" aria-haspopup="true"
      >
        <slot name="icon"></slot>
        <span :class="{ 'ml-2': hasIconSlot }"> {{ value ? selectedOption.name : placeholder }} </span>
        <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95y-0">
      <div v-show="isShow" class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
        <ul class="py-1" role="none">
          <li
            v-for="(option, index) in options"
            :key="`${option.id}-${index}`"
            @click="selectOption(option)"
            class="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
            role="option"
          >
            {{ option.name }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    collapse: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: 'Label'
    },
    value: String,
    options: Array,
  },
  data() {
    return {
      isShow: JSON.parse(!this.collapse),
      selectedOption: {},
    }
  },
  methods: {
    selectOption(option){
      this.selectedOption = option;
      this.$emit('input', option.id);
      this.isShow = false;
    }
  },
  watch: {
    value: function (val) {
      if(val)
        this.selectedOption = this.options.find(option => option.id === val);
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