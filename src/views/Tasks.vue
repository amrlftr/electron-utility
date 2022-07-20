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
			<svg @click="openFormAction" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-500 bg-green-200 p-2 rounded-full cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
				<path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
			</svg>
			<router-link to="/tasks-archived">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-500 bg-blue-200 p-2 rounded-full cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
				</svg>
			</router-link>
		</template>
		
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
			<div v-show="!isFormActionMode" class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
				<div @click="showTask(task)" v-for="(task, index) in sortedTasks" :key="`task-${index}`" class="cursor-pointer bg-white overflow-hidden shadow rounded-2xl">
					<div class="bg-gray-50 px-5 py-3">
						<h3 class="text-gray-300 font-bold">#{{ task.id }}. <span class="text-gray-800">{{ task.title }}</span></h3>
					</div>
					<div class="px-5 py-3">
						<div class="grid grid-cols-2 gap-4">
							<dl>
								<dt class="text-sm font-semibold text-gray-400 truncate -mb-0.5">Status</dt>
								<dd class="font-bold uppercase text-sm tracking-wide mt-1.5" v-html="labelTaskStatus(task.status)"></dd>
							</dl>
							<dl>
								<dt class="text-sm font-semibold text-gray-400 truncate">Priority</dt>
								<dd class="mt-2">
									<div class="w-full bg-gray-200 rounded-full">
										<div :class="`bg-${priorityColor[task.priority]}-400`" class="h-1.5 rounded-full" :style="{ 'width':  (task.priority*25) + '%' }"></div>
									</div>
								</dd>
							</dl>
							<dl>
								<dt class="text-sm font-semibold text-gray-400 truncate -mb-0.5">Due Date</dt>
								<dd class="font-bold" v-html="maskDate(task.due_date)"></dd>
							</dl>
							<dl>
								<dd class="flex items-center justify-end">
									<svg @click.stop="openDeleteTaskModal(task.id)" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-red-500 bg-red-200 p-1 rounded-full cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
										<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
									</svg>
								</dd>
							</dl>
						</div>
					</div>
				</div>
			</div>

			<div v-show="isFormActionMode" class="mx-auto pt-3 pb-16 px-4 sm:px-6 lg:max-w-7xl md:pt-5 md:pb-24 md:px-8 md:grid md:grid-cols-3 md:gap-x-8">
				<div class="flex items-center md:col-span-3 pb-2">
					<svg xmlns="http://www.w3.org/2000/svg" class="col-span-3 h-4 w-4 mr-2 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
					</svg>
					<span @click="isFormActionMode = false" class="cursor-pointer text-xs uppercase font-bold text-gray-800" style="letter-spacing: 0.15em;">BACK TO ALL</span>
				</div>
				<div class="md:col-span-2 md:border-r md:border-gray-200 md:pr-8">
					<textarea 
						ref="title"
						v-model="taskDetails.title" 
						class="appearance-none outline-none bg-transparent block w-full border-0 py-0 resize-none placeholder-gray-500 focus:ring-0 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl border-b border-gray-200" 
						placeholder="Title"
					></textarea>
					<div class="py-10 lg:pt-6 lg:pb-16 lg:pr-8">
						<div>
							<div class="space-y-6">
								<textarea 
									ref="desc"
									v-model="taskDetails.desc" 
									class="appearance-none outline-none bg-transparent block w-full border-0 py-0 resize-none placeholder-gray-500 focus:ring-0 sm:text-sm" 
									placeholder="Write a description..."
								></textarea>
							</div>
						</div>

						<div class="mt-10">
							<div v-if="taskDetails.id !== null" class="flex items-center justify-between">
								<h3 class="text-lg font-bold text-gray-600">To Do List</h3>
								<ut-button @click="$refs.addTodoModal.show()">Add To Do</ut-button>
							</div>

							<div class="mt-4">
								<ul role="list" class="text-gray-500 space-y-2">
									<div v-for="(todo, todoIndex) in taskDetails.todos" :key="`todo-${todoIndex}`" class="group flex items-start justify-between">
										<div class="flex items-start">
											<div class="w-4 mr-2 relative">
												<input 
													@click="checkTodo(todo)"
													:id="`todo-${todoIndex}`" type="checkbox" :checked="todo.is_done"
													class="appearance-none checked:bg-indigo-500 w-3.5 h-3.5 mt-1 rounded-sm ring-1 ring-gray-400 checked:ring-indigo-500 cursor-pointer"
												>
												<svg xmlns="http://www.w3.org/2000/svg" :class="{ 'invisible' : !todo.is_done }" class="absolute top-0 h-3.5 w-3.5 mt-1 text-white pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
													<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
												</svg>
											</div>
											<label :for="`todo-${todoIndex}`" :class="{ 'line-through': todo.is_done }" class="-mt-0.5 cursor-pointer">{{ todo.name }}</label>
										</div>
										<svg @click="deleteTodo(todo.id)" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 rounded-full bg-red-100 p-0.5 text-red-500 cursor-pointer flex-shrink-0 ml-2 opacity-0 group-hover:opacity-100" viewBox="0 0 20 20" fill="currentColor">
											<path fill-rule="evenodd"
														d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
														clip-rule="evenodd" />
										</svg>
									</div>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<!-- Options -->
				<div class="mt-10 space-y-5">
					<div>
						<h3 class="text-sm text-gray-900 font-medium">Status</h3>

						<fieldset class="mt-4">
							<div class="flex items-center space-x-3">
								<dropdown v-model="taskDetails.status" placeholder="Status" :options="statusOptions" />
								<dropdown 
									v-model="taskDetails.priority" 
									placeholder="Priority" 
									:options="priorityOptions"
								>
									<!-- <template #icon>
										<svg class="text-gray-300 flex-shrink-0 h-5 w-5 sm:-ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
											<path fill-rule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
										</svg>
									</template> -->
								</dropdown>
							</div>
						</fieldset>
					</div>

					<div>
						<checkbox v-model="taskDetails.init_due_date" name="Due Date" class="ml-2" />

						<fieldset v-if="taskDetails.init_due_date" class="mt-4">
							<vc-date-picker
								class="inline-block h-full"
								v-model="taskDetails.due_date"
								color="indigo"
								:model-config="{
									type: 'string',
									mask: 'YYYY-MM-DD', // Uses 'iso' if missing
								}"
								:masks="{ L: 'DD/MM/YYYY' }"
							>
								<template v-slot="{ inputValue, togglePopover }">
									<div class="flex items-center">
										<button
											class="p-2 bg-indigo-100 border border-indigo-200 hover:bg-indigo-200 text-indigo-600 rounded-l focus:bg-indigo-500 focus:text-white focus:border-indigo-500 focus:outline-none"
											@click="togglePopover()"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												class="w-4 h-4 fill-current"
											>
												<path
													d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"
												></path>
											</svg>
										</button>
										<input
											:value="inputValue"
											class="bg-white text-gray-700 w-full py-1 px-2 appearance-none border rounded-r focus:outline-none focus:border-indigo-500"
											readonly
										/>
									</div>
								</template>
							</vc-date-picker>
						</fieldset>
					</div>

					<button 
						@click="!taskDetails.id ? addTask() : editTask()"
						type="button" 
						class="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						{{ !taskDetails.id ? 'Create' : 'Update' }}
					</button>
				</div>
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

		<modal
			ref="addTodoModal"
			title="Add New Todo"
			action-label="Save"
			@action="addTodo"
			cancel-label="Cancel"
			@cancel="$refs.addTodoModal.hide()"
		>
			<input type="text" class="appearance-none outline-none bg-transparent border-b border-gray-700 w-full" v-model="newTodo">
		</modal>
	</app-content>
</template>

<script>
import Modal from '@/components/Modal.vue';
import AppContent from '@/layouts/AppContent';
import Dropdown from '@/components/form_elements/Dropdown';
import helpers from "@/mixins/helpers";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import autosize from 'autosize';
import UtButton from '@/components/form_elements/Button';
import Checkbox from '@/components/form_elements/Checkbox';

export default {
	components: {
		Modal,
		AppContent,
		Dropdown,
		UtButton,
		Checkbox,
	},
	mixins: [helpers],
	data() {
		return {
			isFormActionMode: false,
			tasks: [],
			taskDetails: {
				id: null,
				title: '',
				desc: '',
				status: '',
				priority: '',
				init_due_date: null,
				due_date: dayjs().format('YYYY-MM-DD'),
				todos: []
			},
			statusOptions: [
				{
					id: 'Backlog',
					name: 'Backlog',
				},
				{
					id: 'To Do',
					name: 'To Do',
				},
				{
					id: 'In Progress',
					name: 'In Progress',
				},
				{
					id: 'In Review',
					name: 'In Review',
				},
				{
					id: 'Done',
					name: 'Done',
				},
				{
					id:	'Canceled',
					name: 'Canceled',
				}
			],
			priorityOptions: [
				{
					id: '4',
					name: 'Urgent',
				},
				{
					id: '3',
					name: 'High',
				},
				{
					id: '2',
					name: 'Medium',
				},
				{
					id: '1',
					name: 'Low',
				},
			],
			priorityColor: {
				'1': 'blue',
				'2': 'yellow',
				'3': 'yellow',
				'4': 'red',
			},
			deleteTaskId: null,
			newTodo: '',
		}
	},
	methods: {
		fetchTasks(){
			this.tasks = [];
			
			this.$db.all("SELECT * FROM tasks WHERE status NOT IN ('Backlog', 'Done', 'Canceled') ORDER BY due_date", [], (err, rows) => {
				if (err) return console.log(err.message);
				rows.forEach((row) => {
					this.tasks.push({
						id: row.id,
						title: row.title,
						desc: row.desc,
						status: row.status,
						priority: row.priority,
						init_due_date: null,
						due_date: row.due_date,
						todos: [],
					});
				})
			})
		},
		fetchTodos(){
			this.taskDetails.todos = [];

			this.$db.all("SELECT * FROM task_todos WHERE task_id = ?", [this.taskDetails.id], (err, rows) => {
				if (err) return console.log(err.message);
				rows.forEach((row) => {
					this.taskDetails.todos.push({
						id: row.id,
						name: row.name,
						is_done: row.is_done
					});
				})
			})
		},
		openFormAction(){
			this.resetTask();
			this.isFormActionMode = true;
		},
		openDeleteTaskModal(id){
			this.deleteTaskId = id;
			this.$refs.deleteTaskModal.show();
		},
		addTask(){
			this.$db.run("INSERT INTO tasks (title, desc, status, priority, due_date) VALUES (?, ?, ?, ?, ?)",
				[
					this.taskDetails.title, this.taskDetails.desc, this.taskDetails.status, this.taskDetails.priority, 
					this.taskDetails.init_due_date ? this.taskDetails.due_date : ''
				],
				(err) => {
					if (err) return console.log(err.message);
					
					this.isFormActionMode = false;
					this.resetTask();
					this.fetchTasks();
				})
		},
		editTask(){
			this.$db.run("UPDATE tasks SET title = ?, desc = ?, status = ?, priority = ?, due_date = ? WHERE id = ?",
				[
					this.taskDetails.title, this.taskDetails.desc, this.taskDetails.status, this.taskDetails.priority, 
					this.taskDetails.init_due_date ? this.taskDetails.due_date : '', this.taskDetails.id
				],
				(err) => {
					if (err) return console.log(err.message);
					
					this.isFormActionMode = false;
					this.resetTask();
					this.fetchTasks();
				});
		},
		deleteTask(){
			this.$db.run("DELETE FROM tasks WHERE id = ?",
				[this.deleteTaskId],
				(err) => {
					if (err) return console.log(err.message);

					this.$db.run("DELETE FROM task_todos WHERE task_id = ?",
					[this.deleteTaskId],
					(err) => {
						if (err) return console.log(err.message);
					});
					
					this.$refs.deleteTaskModal.hide();
					this.deleteTaskId = null;
					this.fetchTasks();
				});
		},
		showTask(task){
			this.taskDetails = JSON.parse(JSON.stringify(task));
			
			if(this.taskDetails.due_date)
				this.taskDetails.init_due_date = true;

			this.isFormActionMode = true;

			if(this.taskDetails.id)
				this.fetchTodos();

			this.$nextTick(() => {
				autosize.update(this.$refs.title);
				autosize.update(this.$refs.desc);
			})
		},
		labelStatus(status){
			return this.statusOptions.find(statusOption => statusOption.id === status).name;
		},
		labelTaskStatus(status){
			let style = 'px-2 py-1 rounded-md';
			
			if (status === 'In Progress')
				return `<span class="${ style } text-blue-500 bg-blue-100">${ status }</span>`;
			
			if (status === 'To Do')
				return `<span class="${ style } text-gray-500 bg-gray-100">${ status }</span>`;
			
			if (status === 'In Review')
				return `<span class="${ style } text-yellow-500 bg-yellow-100">${ status }</span>`;
			
			return status;
		},
		resetTask(){
			this.clearObject(this.taskDetails);
			this.taskDetails.due_date = dayjs().format('YYYY-MM-DD');
		},
		maskDate(date){
			if(date)
				return dayjs(date).format('DD/MM/YYYY') +
					(dayjs(date).diff(dayjs(), 'days') <= 2
						? "<span class='text-xs font-base text-red-400 ml-1'>(" + dayjs(date).add(1, 'day').fromNow() + ')</span>'
						: '');
			
			return 'Not Set';
		},
		addTodo(){
			this.$db.run("INSERT INTO task_todos (name, is_done, task_id) VALUES (?, ?, ?)",
			[this.newTodo, '0', this.taskDetails.id],
			(err) => {
				if (err) return console.log(err.message);

				this.newTodo = '';
				this.$refs.addTodoModal.hide();
				this.fetchTodos();
			});
		},
		deleteTodo(id){
			this.$db.run("DELETE FROM task_todos WHERE id = ?",
			[id],
			(err) => {
				if (err) return console.log(err.message);

				this.fetchTodos();
			});
		},
		checkTodo(todo){
			this.$db.run("UPDATE task_todos SET is_done = ? WHERE id = ?",
			[+(!(todo.is_done === 1)), todo.id],
			(err) => {
				if (err) return console.log(err.message);

				this.taskDetails.todos.find((curTodo) => curTodo.id === todo.id).is_done = +(!(todo.is_done === 1));
			});
		}
	},
	mounted() {
		this.fetchTasks();	
		
		dayjs.extend(relativeTime);

		autosize(this.$refs.title);
		autosize(this.$refs.desc);
	},
	computed: {
		sortedTasks(){
			// eslint-disable-next-line vue/no-side-effects-in-computed-properties
			return this.tasks.sort((a, b) => {
				if (a.status === 'In Progress')
					return -1;
				
				return 0;
			})
		}
	}
};
</script>

<style></style>