<template>
	<app-content title="Milestone / Todo">
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
<!--			<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-500 bg-red-200 p-2 rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">-->
<!--				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />-->
<!--			</svg>-->
		</template>
		
		<div class="max-w-2xl mx-auto py-2 px-6 bg-white rounded-2xl border-2 border-gray-200">
			<h3 class="pt-4 pb-2 font-bold text-xl font-serif">To Do
				<span class="font-normal text-base">[{{ filteredTodos.filter(todo => todo.charAt(0) !== '#').length + '/' + filteredTodos.length }}]</span>
			</h3>
			<div class="w-full bg-gray-200 rounded-full h-1.5 mb-4">
				<div class="bg-gray-600 h-1.5 rounded-full" :style="[ { 'width': (filteredTodos.filter(todo => todo.charAt(0) === '#').length / filteredTodos.length) * 100 + '%' }]"></div>
			</div>
			<div class="divide-y-2 divide-gray-200">
				<div v-for="(todo, index) in filteredTodos" :key="index" class="flex items-start justify-between py-2">
					<span class="mr-4 font-bold">{{ (index+1).toString().length === 1 ? '0' + (index+1) : index+1 }}</span>
					<div :class="{ 'line-through': todo.charAt(0) === '#' }" class="text-left font-bold w-full" v-html="labelTodo(todo)"></div>
					<svg xmlns="http://www.w3.org/2000/svg" :class="[ todo.charAt(0) === '#' ? 'text-white bg-green-400' : 'text-gray-500 border border-gray-500' ]" class="h-5 w-5 ml-4 p-0.5 rounded-full" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"/>
					</svg>
				</div>
			</div>
		</div>
	</app-content>
</template>

<script>
	import AppContent from '@/layouts/AppContent';

  export default {
		components: {
			AppContent,
		},
    data() {
      return {
        todos: [
          '#SQLite Integration',
          'To do list (each list will have a config whether is a simple list or detailed one)',
          '#Count how many data separated by delimiter / character count / get unique value from duplicated value ie [ 64, 64, 5, 5, 5, 64, 64, 64, 5, 5]',
          'Save profile including data, template, all the settings in duplicator mutator',
          '#Text case changed to Text manipulation',
          'Ability to highlight/replace word in text manipulation',
          'Navigation from text case to duplication mutator while carrying data',
          '#Keyboard accessibility, ie esc button go to home',
          'Settings menu, set window size',
          '#Settings, choose menu to show in dashboard',
          '#Default delimiter ,',
          '#Notepad like to hold temporary code',
          "#add $table->string('group_code')->nullable(); to duplication mutator",
          "#add '{x}' => 'required|string', to duplication mutator",
          "#add paste button in text case to paste content in clipboard",
          "#settimeout copy",
          "#readonly result so that user didnt keyin any input",
          "mutator remove any string matches ie remove any mention of $request",
          "#text case exclude certain strings from being changed",
          "#order wip by incomplete first",
          "#debounce from watch to computed in mutator",
          "Toast notifications",
          "#Task management",
          "Ability to save quick notes",
					"Focus variant on input fields",
					"#Prompt confirmation before closing window",
					"Optional row height in quick notes (maybe add as settings, trigger slide pane from right)",
					"#[BUG] quick notes reset all notes content when adding new note",
					"Remove and replace dayjs dependencies with vanilla js",
					"Export/import sqlite database",
					"#[BUG] hide add to do when in create new mode (as there is no id to indicate as foreign key)",
					"Auto update app feature",
					"#Optional due date in task",
        ]
      }
    },
		methods: {
			labelTodo(todo){
				if(todo.charAt(0) !== '#'){
					if(todo.includes((['[BUG]']))){
						return `<span class="text-red-400 bg-red-200 px-2 rounded-md">BUG</span> ${ todo.substring(5) }`;
					}
					
					return todo;
				}
				
				return todo.substring(1);
			}
		},
    computed: {
      filteredTodos(){
        return JSON.parse(JSON.stringify(this.todos)).sort((a, b) => {
          if (a.charAt(0) !== '#' && b.charAt(0) === '#')
            return -1;

          if (a.charAt(0) === '#' && b.charAt(0) !== '#')
            return 1;

          return 0;
        });
      }
    }
  };
</script>
