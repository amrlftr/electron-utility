<template>
  <div class="min-h-screen px-4 font-mono pt-6">
    <router-link to="/">Home</router-link>
    <legend class="text-3xl font-bold bg-white text-gray-900 leading-8 px-4 absolute left-1/2 transform -translate-x-1/2 -mt-4 z-10">Duplication Mutator</legend>

    <div class="flex flex-col md:flex-row w-full leading-5 text-gray-700 border-4 border-gray-800">
      <div class="w-full md:w-1/2 text-gray-700 p-5 divide-y divide-gray-300">
        <div class="py-4 space-y-4">
          <div>
            <div class="font-bold text-2xl">Data</div>
            <div class="text-xs uppercase tracking-widest">Separated by comma.</div>
            <input type="text" class="appearance-none outline-none bg-transparent border-b border-gray-700 w-full" v-model="originalData">
          </div>
          <div class="flex flex-row items-center justify-between">
            <span>Changer Keyword</span>
            <input type="text" class="appearance-none outline-none bg-transparent border-b border-gray-700" v-model="keyword">
          </div>
          <div class="flex flex-row items-center justify-between">
            <span>Delimiter</span>
            <input type="text" class="appearance-none outline-none bg-transparent border-b border-gray-700" v-model="delimiter">
          </div>
          <div class="flex flex-row items-center justify-between">
            <span>Newline</span>
            <input type="checkbox" class="w-4 h-4" v-model="toggleNewline">
          </div>
        </div>

        <div class="py-4">
          <div class="mb-2 font-semibold">Template</div>
          <prism-editor class="my-editor rounded bg-gray-800 text-gray-200" v-model="code" :highlight="highlighter" line-numbers></prism-editor> 
        </div>

        <div class="py-4">
          <div class="mb-2 font-semibold">Frequently Used</div>
          <div v-for="(template, index) in templates" :key="index" class="flex flex-row items-center">
            <input @click="changeTemplate($event)" name="radioButton" type="radio" :id="index" :value="template">
            <label :for="index" class="ml-2">{{ template }}</label>
          </div>
        </div>
      </div>

      <div class="h-full md:w-1/2 text-gray-700 rounded-xl border border-gray-300 p-5 m-5">
        <div class="flex items-center justify-between">
          <div class="font-semibold">Result</div>
          <button content="Copied" v-tippy='{ trigger : "click"}' type="button" class="bg-yellow-600 px-2 py-1 my-2 text-white text-xs uppercase tracking-widest rounded-lg" @click="copyToClipboard">Copy</button>
        </div>
        <prism-editor class="my-editor rounded bg-gray-800 text-gray-200" v-model="mutate" :highlight="highlighter" line-numbers></prism-editor> 
      </div>
    </div>
  </div>
</template>

<script>
  // import Prism Editor
  import { PrismEditor } from 'vue-prism-editor';
  import 'vue-prism-editor/dist/prismeditor.min.css'; // import the styles somewhere

  // import highlighting library (you can use any library you want just return html string)
  import { highlight, languages } from 'prismjs/components/prism-core';
  import 'prismjs/components/prism-clike';
  import 'prismjs/components/prism-javascript';
  import 'prismjs/themes/prism-tomorrow.css'; // import syntax highlighting styles

  export default {
    components: {
      PrismEditor,
    },
    data() {
      return {
        originalData: '',
        keyword: '{x}',
        delimiter: ',',
        toggleNewline: true,
        code: `console.log({x});`,
        templates: [
          'console.log({x});',
          '{x} => $request->{x},',
          "$table->string('{x}')->nullable();",
          "'{x}' => 'required|string',",
        ]
      }
    },
    methods: {
      highlighter(code) {
        return highlight(code, languages.js); // languages.<insert language> to return html with markup
      },
      escapeRegExp(string) {
          return string.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'); //make sure that any special character is escaped
      },
      changeTemplate(el){
        this.code = el.target.value;
      },
      copyToClipboard(){
        navigator.clipboard.writeText(this.mutate);
      }
    },
    computed: {
      mutate(){
        let newString = '';
        let dataArr = this.originalData.split(this.delimiter);

        // generate regex rule
        let regex = new RegExp( this.escapeRegExp(this.keyword) , "g"); //is the same as: var regex = /abc/g;

        dataArr.forEach((data) => {
          newString += this.code.replace(regex, data.trim()) + (this.toggleNewline ? '\n' : '');
        })

        return newString;
      }
    }
  };
</script>

<style>
  /* required class */
  .my-editor {
    /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
    /* you must provide font-family font-size line-height. Example: */
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
  }

  /* optional class for removing the outline */
  .prism-editor__textarea:focus {
    outline: none;
  }
</style>