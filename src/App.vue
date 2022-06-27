<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    mounted() {
      this.$store.dispatch('load');
    },
  }
</script>

<style src="./assets/tailwind.css"></style>

