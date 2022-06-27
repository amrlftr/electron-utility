<template>
  <div>
    <div @click.self="isShow = !isShow" class="hover:bg-gray-100 transition ease-in duration-200 cursor-pointer text-lg font-medium py-2 flex items-center justify-between border-b-2 border-gray-300">
      <h4 @click.self="isShow = !isShow" class="font-bold text-xl font-serif">{{ title }}</h4>
			<div class="flex items-center space-x-2">
				<slot name="headerOptions"></slot>
				<svg @click.self="isShow = !isShow" class="w-5 h-5 transform transition duration-300" :class="{ 'rotate-180' : isShow }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
				</svg>
			</div>
    </div>

    <transition enter-active-class="transition ease-out duration-300" enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-100"
      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <div v-show="isShow" class="p-4 bg-gray-100 rounded-b-xl">
        <slot></slot>
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
    }
  },
  data() {
    return {
      isShow: JSON.parse(!this.collapse),
    }
  },
  methods: {
    // test(){
    //   this.isShow = true;
    //   console.log(this.isShow);
    // }
  },
}
</script>
<style></style>