<template>
  <ut-button
    ref="tooltip"
    content="Copied" 
    v-tippy="{ trigger : 'click'}" 
    @click="copyToClipboard($event)"
    @shown="setTimeoutHide"
    :is-disabled="isDisabled"
  >
    Copy
  </ut-button>
</template>

<script>
import UtButton from './Button';

export default {
  props: {
    text: {
      type: String,
      default: '',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    }
  },
  components: {
    UtButton,
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