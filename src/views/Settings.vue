<template>
	<app-content title="Settings">
		<template #leftOptions>
			<router-link to="/">
				<div class="flex items-center">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
					</svg>
					<span class="text-xs uppercase font-bold text-gray-800" style="letter-spacing: 0.15em;">HOME</span>
				</div>
			</router-link>
		</template>
		<template #rightOptions>
			<router-link to="/">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-500 bg-blue-200 p-2 rounded-full" viewBox="0 0 20 20" fill="currentColor">
					<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
				</svg>
			</router-link>
		</template>
		
		<div class="max-w-2xl mx-auto space-y-6">
			<div class="bg-white rounded-2xl border-2 border-yellow-200">
				<h3
					class="py-2 px-6 font-bold text-xl font-serif text-yellow-800 bg-yellow-100 rounded-t-2xl border-b-2 border-yellow-200">
					Menu Visibility</h3>
				<div class="py-2 px-6 space-y-1">
					<div v-for="(menu, index) in menus" :key="index" class="flex items-center">
						<div class="w-4 mr-2">
							<input :id="index" @click="setMenu(menu.name)" type="checkbox" class="appearance-none checked:bg-yellow-300 w-3 h-3 mt-1.5 rounded-sm ring-1 ring-gray-400 checked:ring-yellow-300 ring-offset-2" :checked="menu.is_active">
						</div>
						<label :for="index">{{ menu.title }}</label>
					</div>
				</div>
				<h3
					class="py-2 px-6 font-bold text-xl font-serif text-yellow-800 bg-yellow-100 border-t-2 border-b-2 border-yellow-200">
					Notes</h3>
				<div class="py-2 px-6">
					Only Menu Visibility setting is working, others are only for UI experimental purposes only
				</div>
			</div>
			
			<div class="max-w-2xl mx-auto bg-white rounded-2xl border-2 border-gray-200">
				<h3
					class="py-2 px-6 font-bold text-xl font-serif text-gray-800 bg-gray-200 rounded-t-2xl border-b-2 border-gray-200">
					General Settings</h3>
				<div class="py-2 px-6 space-y-1">
					<ol>
						<li>Fullscreen / windowed</li>
						<li>Color Theme</li>
						<li>Font Size</li>
						<li>Dark Mode</li>
						<li>Cloud Sync (Firebase)</li>
						<li>etc...</li>
					</ol>
				</div>
			</div>
		</div>
<!--		<router-link to="/">Home</router-link>-->
<!--		<legend class="text-3xl font-bold bg-white text-gray-900 leading-8 px-4 absolute left-1/2 transform -translate-x-1/2 -mt-4 z-10">Settings</legend>-->
<!--		-->
<!--		<div class="flex flex-col md:flex-row space-x-4 w-full max-w-full leading-5 text-gray-700 border-4 border-gray-800 p-6">-->
<!--			<div class="w-full flex-col mb-5 text-gray-700 break-words rounded">-->
<!--				<div class="p-5">-->
<!--					<div class="block pb-2">-->
<!--						<h4 class="font-bold text-2xl">-->
<!--							Menus-->
<!--						</h4>-->
<!--					</div>-->
<!--				</div>-->
<!--			</div>-->
<!--		</div>-->
	</app-content>
</template>

<script>
import { mapGetters } from 'vuex';
import AppContent from '@/layouts/AppContent';

export default {
	components: {
		AppContent
	},
	data() {
		return {
			// menus: this.$store.state.settings.menu,
		}
	},
	methods: {
		setMenu(menuName){
			let menu = this.menus.find((menu) => menu.name === menuName);
			
			this.$store.dispatch('settings/updateMenuActiveness', {
				name: menu.name,
				is_active: +(!(menu.is_active === 1)),
			})
		}
	},
	computed: {
		...mapGetters({
			menus: 'settings/allMenus',
		})
	}
};
</script>
