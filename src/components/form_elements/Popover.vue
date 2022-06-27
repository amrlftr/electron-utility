<template>
	<div class="">
		<label id="listbox-label" class="sr-only"> Add a label </label>
		<div class="relative">
			<button
				@click="isShow = !isShow" type="button"
				class="relative inline-flex items-center rounded-full py-2 px-2 text-sm font-medium whitespace-nowrap sm:px-3"
				:class="[ value ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500' ]"
				aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label"
			>
				<!--
					Heroicon name: solid/tag

					Selected: "text-gray-300", Default: "text-gray-500"
				-->
				<slot name="icon"></slot>
				<!-- Selected: "text-gray-900" -->
				<span :class="{ 'ml-2': hasIconSlot }" class="truncate block"> {{ value ? selectedOption.name : placeholder }} </span>
			</button>
			
			<transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0"
									enter-to-class="opacity-100" leave-active-class="transition ease-in duration-100"
									leave-from-class="opacity-100" leave-to-class="opacity-0">
				<ul v-show="isShow" class="absolute left-0 z-10 mt-1 w-52 bg-white shadow max-h-56 rounded-lg py-3 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-0">
					<!--
						Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.
	
						Highlighted: "bg-gray-100", Not Highlighted: "bg-white"
					-->
					<li
						v-for="(option, index) in options"
						:key="`${option.id}-${index}`"
						@click="selectOption(option)"
						class="bg-white hover:bg-gray-100 cursor-default select-none relative py-2 px-3"
						id="listbox-option-0" role="option"
					>
						<div class="flex items-center">
							<span class="block font-medium truncate">{{ option.name }} </span>
						</div>
					</li>
				</ul>
			</transition>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: '',
		},
		collapse: {
			type: Boolean,
			default: true,
		},
		placeholder: {
			type: String,
			default: 'Label'
		},
		value: String,
		options: Array,
	},
	data() {
		return {
			isShow: JSON.parse(!this.collapse),
			selectedOption: {},
		}
	},
	methods: {
		selectOption(option){
			this.selectedOption = option;
			this.$emit('input', option.id);
			this.isShow = false;
		}
	},
	mounted() {
		// console.log(this.value)
	},
	computed: {
		hasIconSlot() {
			return !!this.$slots.icon;
		}
	}
}
</script>

<style></style>