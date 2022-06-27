<template>
  <ut-button
    ref="tooltip"
    content="Pasted" 
    v-tippy="{ trigger : 'click'}" 
    @click="paste()"
    @shown="setTimeoutHide"
    :is-disabled="isDisabled"
  >
    Paste
  </ut-button>
</template>

<script>
import UtButton from './Button';

export default {
  components: {
    UtButton,
  },
  props: {
    isDisabled: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    paste(){
      navigator.clipboard.readText()
      .then((text) => {
        this.$emit('onPaste', text)
      })
    },
    setTimeoutHide(el){
      setTimeout(function() { el.hide(); }, 2000);
    }
  }
}
</script>
<style></style>