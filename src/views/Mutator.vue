<template>
	<app-content title="Duplication Mutator">
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
		</template>
		
		<div class="max-w-full lg:max-w-5xl lg:mx-auto flex flex-col md:flex-row mx-6 lg:mx-0 py-2 px-6 bg-white rounded-2xl border-2 border-gray-200">
			<div class="w-full p-4 space-y-4">
				<div>
					<div class="flex items-center justify-between">
						<h4 class="font-bold text-xl font-serif">
							Data
						</h4>
						<paste-button @onPaste="pastedData" />
					</div>
					<input type="text" class="appearance-none outline-none bg-transparent border-b border-gray-700 w-full" v-model="originalData">
					<h6 class="text-xs text-right pt-1">Separated by comma</h6>
				</div>
				
				<div>
					<div class="flex items-center justify-between mb-2">
						<h4 class="font-bold text-xl font-serif">
							Current Template
						</h4>
					</div>
					<prism-editor
						class="my-editor rounded bg-gray-800 text-gray-200" v-model="code" :highlight="highlighter"
						line-numbers
					></prism-editor>
				</div>
				
				<div>
					<div class="flex items-center justify-between mb-2">
						<h4 class="font-bold text-xl font-serif">
							Template List
						</h4>
						<ut-button @click="$refs.templateActionModal.show()">
							<template #icon>
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
								</svg>
							</template>
							New Template
						</ut-button>
					</div>
					<div v-for="template in templates" :key="template.id" class="flex items-center justify-between">
						<div class="flex items-center">
							<input @click="changeTemplate($event)" name="radioButton" type="radio" :id="template.id" :value="template.code" class="appearance-none cursor-pointer checked:bg-yellow-500 ring-1 ring-gray-400 checked:ring-yellow-500 ring-offset-2 h-2 w-2 rounded-full">
							<label :for="template.id" class="ml-3">{{ template.code }}</label>
						</div>
						<svg @click="deleteTemplate(template.id)" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 rounded-full bg-red-100 p-0.5 text-red-500 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clip-rule="evenodd" />
						</svg>
					</div>
				</div>
				
				<accordion title="Options">
					<div class="space-y-4">
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
							<toggle v-model="toggleNewline" />
						</div>
					</div>
				</accordion>
			</div>
			
			<div class="w-full p-4">
				<div class="flex items-center justify-between">
					<h4 class="font-bold text-xl font-serif">
						Result
					</h4>
					<copy-button :text="mutatedData" :is-disabled="mutatedData.length === 0" />
				</div>
				<div>
					<prism-editor
						readonly class="my-editor rounded bg-gray-800 text-gray-200 h-auto" v-model="mutatedData"
						:highlight="highlighter" line-numbers
					></prism-editor>
				</div>
			</div>
		</div>
		
		<modal
			ref="templateActionModal"
			title="Add New Template"
			action-label="Save"
			@action="addTemplate"
			cancel-label="Cancel"
			@cancel="$refs.templateActionModal.hide()"
		>
			<!-- <template #icon>
				<svg class="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
									stroke-width="2" stroke="currentColor" aria-hidden="true">
									<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
								</svg>
			</template> -->
			<input type="text" class="appearance-none outline-none bg-transparent border-b border-gray-700 w-full" v-model="newTemplate">
		</modal>
	</app-content>
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
  import CopyButton from '@/components/CopyButton.vue';
	import PasteButton from '@/components/PasteButton.vue';
	import { debounce } from "lodash";
  import Accordion from '@/components/Accordion.vue';
  import Toggle from '@/components/form_elements/Toggle.vue';
  import Modal from '@/components/Modal.vue';
  import UtButton from '@/components/Button.vue';
	import AppContent from '@/layouts/AppContent';

	export default {
    components: {
      PrismEditor,
      CopyButton,
			PasteButton,
      Accordion,
      Toggle,
      Modal,
      UtButton,
			AppContent,
    },
    data() {
      return {
        originalData: '',
        mutatedData: '',
        keyword: '{x}',
        delimiter: ',',
        toggleNewline: true,
        code: `console.log({x});`,
        templates: [],
        newTemplate: '',
      }
    },
    methods: {
			pastedData(string){
				this.originalData = string;
			},
      highlighter(code) {
        return highlight(code, languages.js); // languages.<insert language> to return html with markup
      },
      escapeRegExp(string) {
          return string.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'); //make sure that any special character is escaped
      },
      changeTemplate(el){
        this.code = el.target.value;
      },
      fetchTemplate(){
        this.templates = [];

        this.$db.all("SELECT * FROM mutator_templates", [], (err, rows) => {
          if (err) return console.log(err.message);
          rows.forEach((row) => {
            this.templates.push({
              id: row.id,
              code: row.code
            });
          })
        })
      },
      addTemplate(){
        this.$db.run("INSERT INTO mutator_templates (code, is_default) VALUES (?, ?)", [this.newTemplate, 0], (err) => {
          if (err) return console.log(err.message);

          this.fetchTemplate();
          this.$refs.templateActionModal.hide();
          this.newTemplate = '';
        })
      },
      deleteTemplate(id){
        this.$db.run("DELETE FROM mutator_templates WHERE id = ?", [id], (err) => {
          if (err) return console.log(err.message);

          this.fetchTemplate();
        })
      }
    },
    mounted() {
      this.fetchTemplate();

      // this.$refs.templateActionModal.show();
    },
    computed: {
      triggerChangeData() {
        //this is a hack for vue 2 to trigger watcher when any of the property values below changes
        return `${this.originalData}|${this.keyword}|${this.delimiter}|${this.toggleNewline}|${this.code}`;
      },
    },
    watch: {
      triggerChangeData: {
        handler: debounce(function () {
          let newString = '';
          let dataArr = this.originalData.split(this.delimiter);

          // generate regex rule
          let regex = new RegExp( this.escapeRegExp(this.keyword) , "g"); //is the same as: var regex = /abc/g;

          dataArr.forEach((data) => {
            newString += this.code.replace(regex, data.trim()) + (this.toggleNewline ? '\n' : '');
          })

          this.mutatedData = newString;
        }, 1000)
      }
    },
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