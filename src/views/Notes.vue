<template>
	<app-content title="Quick Notes">
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
			<svg @click="addNote" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-500 bg-green-200 p-2 rounded-full cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
				<path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
			</svg>
		</template>
		
		<div class="max-w-2xl mx-auto p-4 bg-white rounded-2xl border-2 border-gray-200">
			<div class="space-y-4">
				<accordion :title="note.title" v-for="(note, index) in notes" :key="index">
					<template #headerOptions>
						<svg v-if="index !== 0" @click="deleteNote(index)" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500 bg-red-200 p-1 rounded-full cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
							<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
						</svg>
					</template>
					<textarea rows="4" :value="note.content" class="appearance-none outline-none bg-transparent w-full"></textarea>
				</accordion>
			</div>
		</div>
	</app-content>
</template>

<script>
import AppContent from '@/layouts/AppContent';
import CopyButton from '@/components/CopyButton.vue';
import PasteButton from '@/components/PasteButton.vue';
import UtButton from '@/components/Button.vue';
import Accordion from '@/components/Accordion.vue';

export default {
	components: {
		AppContent,
		// CopyButton,
		// PasteButton,
		// UtButton,
		Accordion,
	},
	data() {
		return {
			notes: [{
				title: 'Notes 1',
				content: ''
			}]
		}
	},
	methods: {
		addNote(){
			this.notes.push({
				title: 'Notes ' + ((this.notes.length)+1),
				content: ''
			})
		},
		deleteNote(index){
			this.notes.splice(index, 1);
		}
	},
};
</script>
