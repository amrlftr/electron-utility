<template>
	<div class="space-y-4 bg-gray-100 min-h-screen">
		<div class="max-w-2xl mx-auto py-4 sm:px-6 lg:max-w-5xl lg:px-8">
			<h1 class="text-2xl font-bold text-center font-serif text-gray-700 py-4">Select any utility tool to begin...</h1>
			<div class="my-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8 px-6 sm:px-0">
				<router-link
					v-for="(menu, index) in menus" :key="index" :to="`/${menu.name}`"
				>
					<div class="group shadow-lg rounded-2xl bg-white cursor-pointer h-full">
						<div class="px-4 py-5 sm:p-6 flex justify-between">
							<div>
								<h3 class="text-2xl leading-6 font-bold text-gray-700 font-serif pt-2">{{ menu.title }}</h3>
								<div class="mt-2 max-w-xl text-sm text-gray-500">
									<p>{{ menu.subtitle }}</p>
								</div>
							</div>
							<svg
								class="opacity-0 group-hover:opacity-100 transition ease-in duration-200 w-8 h-8 rounded-full p-1.5 bg-blue-100 text-blue-500"
								xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd"
											d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
											clip-rule="evenodd"/>
							</svg>
						</div>
					</div>
				</router-link>
			</div>
		</div>
		
		<div class="fixed bottom-4 right-4 text-xs flex items-center space-x-1">
			<h4 class="italic text-gray-800 mr-2">Authored by Amirul Fitri, {{ new Date().getFullYear() }}</h4>
			<router-link to="/settings">
				<svg class="h-5 w-5 p-0.5 rounded-full bg-gray-300 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd"
								d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
								clip-rule="evenodd"/>
				</svg>
			</router-link>
			<router-link to="/wip">
				<svg class="h-5 w-5 p-1 rounded-full bg-purple-200 text-purple-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd"
								d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z"
								clip-rule="evenodd"/>
				</svg>
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