<template>
  <div class="min-h-screen px-4 font-mono pt-6">
    <router-link to="/">Home</router-link>
    <legend class="text-3xl font-bold bg-white text-gray-900 leading-8 px-4 absolute left-1/2 transform -translate-x-1/2 -mt-4 z-10">Query Builder</legend>

    <div class="flex flex-col lg:flex-row space-x-4 w-full max-w-full leading-5 text-gray-700 border-4 border-gray-800 p-6">
      <div class="w-full flex-col mb-5 text-gray-700 break-words rounded">
        <div class="p-5">
          <div class="block pb-2">
            <div class="flex items-center font-bold text-2xl pb-5">
              <tippy
                interactive
                trigger="click"
                placement="bottom"
                theme="light outline-none"
              >
                <template v-slot:trigger>
                  <div class="flex flex-row items-center">
                    <h4 class="cursor-pointer">{{ queryType }}</h4>
                    <svg xmlns="http://www.w3.org/2000/svg" class="feather feather-chevron-down w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </template>
                <div>
                  <ul>
                    <li 
                      v-for="(type, index) in ['INSERT', 'UPDATE']" 
                      :key="index" 
                      class="flex items-center"
                      @click="queryType = type"
                    >
                      <div :class="[queryType === type ? 'bg-yellow-500' : 'bg-white']" class="ml-2 w-2 h-2 rounded-full"></div>
                      <div class="cursor-pointer text-green-600 px-3 py-1 font-bold">{{ type }}</div>
                    </li>
                  </ul>
                </div>
              </tippy>
              <h4 class="pl-2">[<span @keyup="updateDbName($event)" contenteditable="" class="outline-none border-b border-yellow-600">DB</span>]</h4>
            </div>

            <div class="flex flex-1 space-x-4">
              <div class="relative w-2/5 border-2 border-gray-500 py-2 px-4">
                <div class="absolute bg-white -top-3 left-4 text-base font-semibold px-2">
                  DEFAULT
                </div>
                <input type="text" class="appearance-none outline-none bg-transparent border-b border-gray-700 w-full pt-3">
              </div>
              <div class="relative w-2/5 border-2 border-gray-500 py-2 px-4">
                <div class="absolute bg-white -top-3 left-4 text-base font-semibold px-2">
                  CUSTOM
                </div>
                <input type="text" class="appearance-none outline-none bg-transparent border-b border-gray-700 w-full pt-3">
              </div>
              <div class="W-1/5">
                S
              </div>
            </div>

          </div>
        </div>

        <div class="flex-auto p-5 box-border" style="overflow-wrap: break-word;">
          <div class="flex flex-col gap-2 box-border" style="overflow-wrap: break-word;">
            <h4 class="mb-2 text-base font-semibold xl:text-xl box-border" style="line-height: 1.2; overflow-wrap: break-word;">
              Frequently Used
            </h4>
            <div class="flex flex-row items-center">
              <input @click="changeTemplate($event)" type="radio" name="sampleTemplate" id="" value="{x} => $request->{x},">
              <label id="template1" class="ml-2">{x} => $request->{x},</label>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full mb-5 text-gray-700 bg-white rounded border border-gray-300">
        <div class="p-5 mb-0 bg-white border-gray-300">
          <div class="flex items-center justify-between">
            <h4 class="text-base font-semibold">
              Result
            </h4>
            <button content="Copied" v-tippy='{ trigger : "click"}' type="button" class="bg-yellow-600 px-2 py-1 my-2 text-white text-xs uppercase tracking-widest rounded-lg" @click="copyToClipboard">Copy</button>
          </div>
          <prism-editor class="my-editor rounded bg-gray-800 text-gray-200" v-model="mutate" :highlight="highlighter" line-numbers></prism-editor> 
        </div>
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
  import 'prismjs/components/prism-sql';
  // import 'prismjs/components/prism-javascript';
  import 'prismjs/themes/prism-tomorrow.css'; // import syntax highlighting styles

  export default {
    components: {
      PrismEditor,
    },
    data() {
      return {
        dbName: '',
        queryType: 'INSERT',
        defaultData: '',
        code: `console.log({x});`
      }
    },
    methods: {
      updateDbName(e){
        this.dbName = e.target.textContent;
      },
      highlighter(code) {
        return highlight(code, languages.sql); // languages.<insert language> to return html with markup
      },
      copyToClipboard(){
        navigator.clipboard.writeText(this.mutate);
      }
    },
    computed: {
      mutate(){
        let newString = "";

        newString += this.queryType === 'INSERT' ? `INSERT INTO ${this.dbName} () VALUES ()` :
          this.queryType === 'UPDATE' ? `UPDATE db SET = WHERE ` : '';
        
        // let dataArr = this.originalData.split(',');

        // // generate regex rule
        // let regex = new RegExp( this.escapeRegExp(this.keyword) , "g"); //is the same as: var regex = /abc/g;

        // dataArr.forEach((data) => {
        //   newString += this.code.replace(regex, data.trim()) + (this.toggleNewline ? '\n' : '');
        // })

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
    padding: 5px;
  }

  /* optional class for removing the outline */
  .prism-editor__textarea:focus {
    outline: none;
  }
</style>