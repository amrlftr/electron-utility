<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    mounted() {
      this.$store.dispatch('load');

      // console.log(app.getPath('home'));
      
      // const sqlite3 = require('sqlite3').verbose();
      // let sql;

      // const db = new sqlite3.Database('../utility.db', sqlite3.OPEN_READWRITE, (err) => {
      //   if(err) return console.log(err.message);
      // });
    },
  }
</script>

<style src="./assets/tailwind.css"></style>

