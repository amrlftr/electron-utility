<template>
	<div class="min-h-screen px-4 font-mono pt-6">
		<router-link to="/">Home</router-link>
		<legend class="text-3xl font-bold bg-white text-gray-900 leading-8 px-4 absolute left-1/2 transform -translate-x-1/2 -mt-4 z-10">Settings</legend>
		
		<div class="flex flex-col md:flex-row space-x-4 w-full max-w-full leading-5 text-gray-700 border-4 border-gray-800 p-6">
			<div class="w-full flex-col mb-5 text-gray-700 break-words rounded">
				<div class="p-5">
					<div class="block pb-2">
						<h4 class="font-bold text-2xl">
							Menus
						</h4>
						<div v-for="(menu, index) in menus" :key="index" class="flex flex-1 align-top space-y-1">
							<div class="w-4 mr-2">
								<input :id="index" @click="setMenu(menu.name)" type="checkbox" class="w-4 h-4 mt-1.5" :checked="menu.isActive">
							</div>
							<label :for="index">{{ menu.title }}</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			menus: this.$store.state.settings.menu,
		}
	},
	methods: {
		setMenu(menuName){
			let menu = this.menus.find((menu) => menu.name === menuName);
			this.$store.dispatch('updateMenuActiveness', menu)
		}
	},
};
</script>
