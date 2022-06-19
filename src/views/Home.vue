<template>
  <div class="p-4">
    <div class="max-w-sm mx-auto flex flex-col space-y-4">
      <router-link v-for="(menu, index) in menus" :key="index" :to="`/${menu.name}`">
        <div class="rounded-xl border border-gray-700 text-gray-700 p-4">
          <div>
              <p class="text-xl font-bold text-center">{{ menu.title }}</p>
          </div>
        </div>
      </router-link>
			
      <div class="text-xs text-center">Copyright Amirul Fitri (Build ver 1.0)</div>
			<router-link to="/settings">
				<div class="text-xs text-center underline">Settings</div>
			</router-link>
      <router-link to="/wip">
        <div class="text-xs text-center underline">Milestone / Todo</div>
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
	computed: {
		...mapGetters({
			menus: 'settings/activeMenus'
		})
	}
}
</script>
