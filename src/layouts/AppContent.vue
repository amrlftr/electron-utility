<template>
	<div class="bg-gray-100 min-h-screen py-6 text-gray-800 px-6 sm:px-0">
		<div class="max-w-2xl lg:max-w-5xl mx-auto flex items-center justify-evenly pb-6">
			<div>
				<slot name="leftOptions"></slot>
			</div>
			<div class="hidden sm:flex w-full bg-gray-300 h-px dark:bg-gray-700 mx-4"></div>
			<h1 class="text-3xl font-bold font-serif">
				<span class="highlight px-2 whitespace-nowrap">{{ title }}</span>
			</h1>
			<div class="hidden sm:flex w-full bg-gray-300 h-px dark:bg-gray-700 mx-4"></div>
			<div>
				<slot name="rightOptions"></slot>
			</div>
		</div>
		<slot></slot>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: 'Title'
		},
	}
}
</script>

<style>
.highlight {
	background: linear-gradient(180deg,rgba(255,255,255,0) 60%, #BFDBFE 30%);
}
</style>