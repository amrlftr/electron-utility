<template>
	<app-content title="Task Management">
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
			<svg @click="$refs.taskActionModal.show()" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-500 bg-green-200 p-2 rounded-full cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
				<path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
			</svg>
		</template>
		
		<div class="max-w-2xl mx-auto py-2 px-6">
			<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
				<table class="min-w-full divide-y divide-gray-300">
					<tbody class="divide-y divide-gray-200 bg-white">
						<tr v-for="(task, index) in tasks" :key="task-`${index}`">
							<td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
								<div class="font-medium text-gray-900">{{ task.title }}</div>
							</td>
							<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
								<span class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">{{ labelStatus(task.status) }}</span>
							</td>
							<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Member</td>
							<td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
								<a href="#" class="text-indigo-600 hover:text-indigo-900">Edit<span class="sr-only">, Lindsay Walton</span></a>
							</td>
						</tr>
					
					<!-- More people... -->
					</tbody>
				</table>
			</div>
		</div>
		
		<modal
			ref="taskActionModal"
			title="Add New Task"
			width="sm:max-w-xl lg:max-w-2xl"
		>
			<!-- <template #icon>
				<svg class="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
									stroke-width="2" stroke="currentColor" aria-hidden="true">
									<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
								</svg>
			</template> -->
			<div class="relative">
				<div class="overflow-hidden">
					<label for="title" class="sr-only">Title</label>
					<input type="text" name="title" v-model="taskDetails.title" id="title" class="appearance-none outline-none block w-full border-0 pt-2.5 text-lg font-medium placeholder-gray-500 focus:ring-0" placeholder="Title">
					<label for="description" class="sr-only">Description</label>
					<textarea v-model="taskDetails.desc" rows="4" name="description" id="description" class="appearance-none outline-none block w-full border-0 py-0 resize-none placeholder-gray-500 focus:ring-0 sm:text-sm" placeholder="Write a description..."></textarea>
					
					<!-- Spacer element to match the height of the toolbar -->
					<div aria-hidden="true">
						<div class="py-2">
							<div class="h-9"></div>
						</div>
						<div class="h-px"></div>
						<div class="py-2">
							<div class="py-px">
								<div class="h-9"></div>
							</div>
						</div>
					</div>
				</div>
				
				<div class="absolute bottom-0 inset-x-px">
					<!-- Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. -->
					<div class="flex flex-nowrap py-2 space-x-2">
						<popover class="flex-shrink-0" v-model="taskDetails.status" placeholder="Status" :options="statusOptions">
<!--							<template #icon>-->
<!--								<svg class="text-gray-300 flex-shrink-0 h-5 w-5 sm:-ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">-->
<!--									<path fill-rule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />-->
<!--								</svg>-->
<!--							</template>-->
						</popover>
						<popover class="flex-shrink-0" v-model="taskDetails.priority" placeholder="Priority" :options="priorityOptions">
						</popover>
					</div>
					<div class="border-t border-gray-200 px-2 py-2 flex justify-between items-center space-x-3 sm:px-3">
						<div class="flex">
<!--							<button type="button" class="-ml-2 -my-2 rounded-full px-3 py-2 inline-flex items-center text-left text-gray-400 group">-->
<!--								&lt;!&ndash; Heroicon name: solid/paper-clip &ndash;&gt;-->
<!--								<svg class="-ml-1 h-5 w-5 mr-2 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">-->
<!--									<path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" />-->
<!--								</svg>-->
<!--								<span class="text-sm text-gray-500 group-hover:text-gray-600 italic">Attach a file</span>-->
<!--							</button>-->
						</div>
						<div class="flex-shrink-0">
							<button @click="addTask" type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create</button>
						</div>
					</div>
				</div>
			</div>
<!--			<input type="text" class="appearance-none outline-none bg-transparent border-b border-gray-700 w-full" v-model="newTemplate">-->
		</modal>
	</app-content>
</template>

<script>
import CopyButton from '@/components/CopyButton.vue';
import PasteButton from '@/components/PasteButton.vue';
import { debounce } from "lodash";
import Accordion from '@/components/Accordion.vue';
import Toggle from '@/components/form_elements/Toggle.vue';
import Modal from '@/components/Modal.vue';
import UtButton from '@/components/Button.vue';
import AppContent from '@/layouts/AppContent';
import Popover from '@/components/form_elements/Popover';
import helpers from "@/mixins/helpers";

export default {
	components: {
		// CopyButton,
		// PasteButton,
		// Accordion,
		// Toggle,
		Modal,
		// UtButton,
		AppContent,
		Popover,
	},
	mixins: [helpers],
	data() {
		return {
			tasks: [],
			taskDetails: {
				id: null,
				title: '',
				desc: '',
				status: '',
				priority: '',
			},
			statusOptions: [
				{
					id: 'backlog',
					name: 'Backlog',
				},
				{
					id: 'to do',
					name: 'To Do',
				},
				{
					id: 'in progress',
					name: 'In Progress',
				},
				{
					id: 'in review',
					name: 'In Review',
				},
				{
					id: 'done',
					name: 'Done',
				},
				{
					id:	'canceled',
					name: 'Canceled',
				}
			],
			priorityOptions: [
				{
					id: 'urgent',
					name: 'Urgent',
				},
				{
					id: 'high',
					name: 'High',
				},
				{
					id: 'medium',
					name: 'Medium',
				},
				{
					id: 'low',
					name: 'Low',
				},
			],
		}
	},
	methods: {
		fetchTasks(){
			this.tasks = [];

			this.$db.all("SELECT * FROM tasks", [], (err, rows) => {
				if (err) return console.log(err.message);
				rows.forEach((row) => {
					this.tasks.push({
						id: row.id,
						title: row.title,
						desc: row.desc,
						status: row.status,
						priority: row.priority,
					});
				})
			})
		},
		addTask(){
			this.$db.run("INSERT INTO tasks (title, desc, status, priority) VALUES (?, ?, ?, ?)",
				[this.taskDetails.title, this.taskDetails.desc, this.taskDetails.status, this.taskDetails.priority],
				(err) => {
					if (err) return console.log(err.message);
	
					// this.fetchTemplate();
					this.$refs.taskActionModal.hide();
					this.clearObject(this.taskDetails);
				})
		},
		labelStatus(status){
			return this.statusOptions.find(statusOption => statusOption.id === status).name;
		},
		// deleteTemplate(id){
		// 	this.$db.run("DELETE FROM mutator_template WHERE id = ?", [id], (err) => {
		// 		if (err) return console.log(err.message);
		//
		// 		this.fetchTemplate();
		// 	})
		// }
	},
	mounted() {
		this.fetchTasks();
		//
		// this.$refs.taskActionModal.show();
	},
};
</script>

<style></style>