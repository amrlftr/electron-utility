<template>
  <div class="min-h-screen px-4 font-mono pt-6">
    <router-link to="/">Home</router-link>
    <legend class="text-3xl font-bold bg-white text-gray-900 leading-8 px-4 absolute left-1/2 transform -translate-x-1/2 -mt-4 z-10">Duplication Mutator</legend>

    <div class="flex flex-col md:flex-row space-x-4 w-full max-w-full leading-5 text-gray-700 border-4 border-gray-800 p-6">
      <div class="w-full flex-col mb-5 text-gray-700 break-words rounded">
        <div class="p-5">
          <div class="block pb-2">
            <h4 class="font-bold text-2xl">
              Data
            </h4>
            <span class="text-xs uppercase tracking-widest">
              Separated by comma.
            </span>
          </div>
          <input type="text" class="appearance-none outline-none bg-transparent border-b border-gray-700 w-full mb-4" v-model="originalData">
          <div class="flex flex-row items-center justify-between">
            <span>Changer Keyword</span>
            <input type="text" class="appearance-none outline-none bg-transparent border-b border-gray-700 mb-4" v-model="keyword">
          </div>
          <div class="flex flex-row items-center justify-between">
            <span>Newline</span>
            <input type="checkbox" class="w-4 h-4" v-model="toggleNewline">
          </div>
        </div>

        <div class="flex-auto p-5 border-b box-border" style="overflow-wrap: break-word;">
          <div class="flex flex-wrap gap-2 box-border" style="overflow-wrap: break-word;">
            <h4 class="mb-2 text-base font-semibold xl:text-xl box-border" style="line-height: 1.2; overflow-wrap: break-word;">
              Template
            </h4>
            <prism-editor class="my-editor rounded bg-gray-800 text-gray-200" v-model="code" :highlight="highlighter" line-numbers></prism-editor> 
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

      <div class="w-full relative flex-col mb-5 text-gray-700 break-words bg-clip-border bg-white rounded border border-gray-300 border-solid box-border" style="min-width: 0px; overflow-wrap: break-word;">
        <div class="p-5 mb-0 bg-white border-gray-300 border-solid box-border" style="border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0px 0px; overflow-wrap: break-word;">
          <div class="flex items-center justify-between">
            <h4 class="text-base font-semibold xl:text-xl box-border" style="line-height: 1.2; overflow-wrap: break-word;">
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
        toggleNewline: true,
        code: `console.log({x});`
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
        let dataArr = this.originalData.split(',');

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
    padding: 5px;
  }

  /* optional class for removing the outline */
  .prism-editor__textarea:focus {
    outline: none;
  }
</style>