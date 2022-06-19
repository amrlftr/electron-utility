<template>
  <button 
    ref="tooltip"
    content="Copied" 
    v-tippy="{ trigger : 'click'}" 
    type="button" 
    class="bg-yellow-600 px-2 py-1 my-2 text-white text-xs uppercase tracking-widest rounded-lg" 
    @click="copyToClipboard($event)"
    @shown="setTimeoutHide"
  >
    Copy
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    }
  },
  methods: {
    copyToClipboard(){
      navigator.clipboard.writeText(this.text);
    },
    setTimeoutHide(el){
      setTimeout(function() { el.hide(); }, 2000);
    }
  }
}
</script>
<style></style>