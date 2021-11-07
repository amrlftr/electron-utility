<template>
  <div class="p-4">
    <div class="max-w-sm mx-auto flex flex-col space-y-4">
      <router-link to="/case">
        <div class="rounded-xl border border-gray-700 text-gray-700 p-4">
          <div>
              <p class="text-xl font-bold text-center">Text Case</p>
          </div>
        </div>
      </router-link>
      <router-link to="/mutator">
        <div class="rounded-xl border border-gray-700 text-gray-700 p-4">
          <div>
              <p class="text-xl font-bold text-center">Duplication Mutator</p>
          </div>
        </div>
      </router-link>
      <div class="text-xs text-center">Copyright Amirul Fitri (Build ver 1.0)</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld
  }
}
</script>
