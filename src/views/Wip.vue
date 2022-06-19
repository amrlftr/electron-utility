<template>
  <div class="min-h-screen px-4 font-mono pt-6">
    <router-link to="/">Home</router-link>
    <legend class="text-3xl font-bold bg-white text-gray-900 leading-8 px-4 absolute left-1/2 transform -translate-x-1/2 -mt-4 z-10">Milestone / Todo</legend>

    <div class="flex flex-col md:flex-row w-full leading-5 text-gray-700 border-4 border-gray-800">
      <div class="w-full text-gray-700 p-5 divide-y divide-gray-300">
        <div class="p-2">
          <h4 class="font-bold pb-2">Todo</h4>
          <div v-for="(todo, index) in todos" :key="index" class="flex flex-1 align-top space-y-1">
            <div class="w-4 mr-2">
              <input :id="index" type="checkbox" class="w-4 h-4 mt-1.5" :checked="todo.charAt(0) === '#'">
              </div>
            <label :for="index">{{ todo.charAt(0) === '#' ? todo.substring(1) : todo }}</label>
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
        todos: [
          'Prismjs for PHP',
          'SQLite Integration',
          'To do list (each list will have a config whether is a simple list or detailed one)',
          'Count how many data separated by delimiter / character count / get unique value from duplicated value ie [ 64, 64, 5, 5, 5, 64, 64, 64, 5, 5]',
          'Save profile including data, template, all the settings in duplicator mutator',
          'Text case changed to Text manipulation',
          'Ability to highlight/replace word in text manipulation',
          'Navigation from text case to duplication mutator while carrying data',
          '#Keyboard accessibility, ie esc button go to home',
          'Settings menu, set window size',
          'Settings, choose menu to show in dashboard',
          '#Default delimiter ,',
          'Notepad like to hold temporary code',
          "#add $table->string('group_code')->nullable(); to duplication mutator",
          "#add '{x}' => 'required|string', to duplication mutator",
          "add paste button in text case to paste content in clipboard",
          "#settimeout copy",
          "#readonly result so that user didnt keyin any input",
          "mutator remove any string matches ie remove any mention of $request",
          "text case exclude certain strings from being changed",
        ]
      }
    },
  };
</script>
