<template>
	<app-content title="Archived Task">
		<template #leftOptions>
			<router-link to="/tasks">
				<div class="flex items-center">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
					</svg>
					<span class="text-xs uppercase font-bold text-gray-800" style="letter-spacing: 0.15em;">TASKS</span>
				</div>
			</router-link>
		</template>
		<template #rightOptions>
			<router-link to="/tasks">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-500 bg-blue-200 p-2 rounded-full cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
				</svg>
			</router-link>
		</template>
		
		<div class="max-w-2xl mx-auto py-2 px-6">
			<div :class="{ 'ring-1 ring-black ring-opacity-5': tasks.length > 0}" class="overflow-hidden shadow  md:rounded-lg">
				<table class="min-w-full divide-y divide-gray-300">
					<tbody class="divide-y divide-gray-200 bg-white">
					<tr v-for="(task, index) in tasks" :key="`task-${index}`">
						<td class="py-4 pl-4 pr-3 text-sm sm:pl-6">
							<div class="font-medium text-gray-900">{{ task.title }}</div>
						</td>
						<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
							<span class="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800">{{ task.status }}</span>
						</td>
						<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 flex justify-end">
							<svg v-if="task.status === 'Backlog'" @click="addTaskToSprint(task.id)" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-500 bg-green-200 p-2 rounded-full cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clip-rule="evenodd" />
							</svg>
							<svg v-else @click="openDeleteTaskModal(task.id)" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-red-500 bg-red-200 p-1 rounded-full cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
								<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
							</svg>
						</td>
					</tr>
					
					<!-- More people... -->
					</tbody>
				</table>
			</div>
		</div>
		
		<modal
			ref="deleteTaskModal"
			title="Are you sure to delete this task?"
			action-label="Delete"
			@action="deleteTask"
			cancel-label="Cancel"
			@cancel="$refs.deleteTaskModal.hide()"
		>
			<template #icon>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-red-500 bg-red-200 p-2 rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
				</svg>
			</template>
		</modal>
	</app-content>
</template>

<script>
import AppContent from '@/layouts/AppContent';
import helpers from "@/mixins/helpers";
import Modal from '@/components/Modal.vue';

export default {
	components: {
		AppContent,
		Modal,
	},
	mixins: [helpers],
	data() {
		return {
			tasks: [],
			deleteTaskId: null,
		}
	},
	methods: {
		fetchTasks(){
			this.tasks = [];
			
			this.$db.all(`SELECT * FROM tasks WHERE status IN ('Backlog', 'Done', 'Canceled')
				ORDER BY CASE status
					WHEN 'Backlog' THEN 0
					WHEN 'Done' THEN 1
					WHEN 'Canceled' THEN 2
				END`, [], (err, rows) => {
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
		addTaskToSprint(id){
			this.$db.run("UPDATE tasks SET status = ? WHERE id  = ?",
				['To Do', id],
				(err) => {
					if (err) return console.log(err.message);

					this.fetchTasks();
				})
		},
		openDeleteTaskModal(id){
			this.deleteTaskId = id;
			this.$refs.deleteTaskModal.show();
		},
		deleteTask(){
			this.$db.run("DELETE FROM tasks WHERE id = ?",
				[this.deleteTaskId],
				(err) => {
					if (err) return console.log(err.message);
					
					this.$refs.deleteTaskModal.hide();
					this.deleteTaskId = null;
					this.fetchTasks();
				})
		},
	},
	mounted() {
		this.fetchTasks();
	},
};
</script>

<style></style>