<template>
  <button type="button"
    @click="$emit('input', !value)"
    class="flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
    role="switch" aria-checked="false">
    <span class="sr-only">Use setting</span>
    <span aria-hidden="true" class="pointer-events-none absolute bg-white w-full h-full rounded-md"></span>
    <span aria-hidden="true" :class="[ value ? 'bg-indigo-600' : 'bg-gray-200' ]"
      class="pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200"></span>
    <span aria-hidden="true" :class="[ value ? 'translate-x-5' : 'translate-x-0' ]"
      class="pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200"></span>
  </button>
</template>
<script>
export default {
  props: ['value'],
}
</script>
<style></style>