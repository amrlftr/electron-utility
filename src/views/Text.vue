<template>
	<app-content title="Text Manipulation">
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
				<div class="flex items-center justify-between">
					<h4 class="font-bold text-xl font-serif">
						Data
					</h4>
					<div class="flex items-center space-x-2">
						<ut-button @click="processText" :is-disabled="originalData.length === 0">Extract Details</ut-button>
						<paste-button @onPaste="pastedData" />
					</div>
				</div>
				
				<div>
					<div class="relative">
						<textarea
							rows="4" class="appearance-none outline-none bg-transparent border border-gray-400 w-full px-4 py-2"
							v-model="originalData"
						></textarea>
						<div class="absolute -top-1 inset-x-0 bg-white h-2 mx-3"></div>
						<div class="absolute bottom-1 inset-x-0 bg-white h-2 mx-3"></div>
					</div>
					<h6 class="text-xs text-right">Count: {{ originalData.length }}</h6>
				</div>
				
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-100 rounded-lg">
					<div
						v-for="(type, index) in ['capitalize', 'titlecase', 'lowercase', 'reset']"
						:key="index"
						@click="type !== 'reset' ? caseType = type : caseType = ''"
						:class="[caseType === type ? 'bg-blue-800 text-white' : 'text-gray-800']"
						class="px-2 py-1 text-center rounded-lg cursor-pointer font-medium capitalize"
					>
						{{ type }}
					</div>
				</div>
				
				<accordion title="Options">
					<div class="space-y-4">
						<div>
							<div class="flex flex-row items-center justify-between">
								<span>Excludes</span>
								<input type="text" class="appearance-none outline-none bg-transparent border-b border-gray-700" v-model="excludes">
							</div>
							<h6 class="text-xs text-right pt-1">Separated by comma</h6>
						</div>
						<div class="flex flex-row items-center justify-between">
							<span>Delimiter</span>
							<input type="text" class="appearance-none outline-none bg-transparent border-b border-gray-700" v-model="delimiter">
						</div>
						<div class="flex flex-row items-center justify-between">
							<span>Separator</span>
							<input type="text" class="appearance-none outline-none bg-transparent border-b border-gray-700" v-model="separator">
						</div>
						<div class="flex flex-row items-center justify-between">
							<span>Newline</span>
							<toggle v-model="toggleNewline" />
						</div>
					</div>
				</accordion>
			</div>
			
			<div class="w-full p-4 space-y-4">
				<div class="flex items-center justify-between">
					<h4 class="font-bold text-xl font-serif">
						Result
					</h4>
					<copy-button :text="mutatedData" :is-disabled="mutatedData.length === 0" />
				</div>
				<div class="relative">
					<textarea
						rows="4" class="appearance-none outline-none bg-transparent border border-gray-400 w-full px-4 py-2"
						v-model="mutatedData"
					></textarea>
					<div class="absolute -top-1 inset-x-0 bg-white h-2 mx-3"></div>
					<div class="absolute bottom-1 inset-x-0 bg-white h-2 mx-3"></div>
				</div>
				<div class="text-sm whitespace-pre-line" v-html="processResult"></div>
			</div>
		</div>
	</app-content>
</template>

<script>
	import AppContent from '@/layouts/AppContent';
  import CopyButton from '@/components/CopyButton.vue';
  import PasteButton from '@/components/PasteButton.vue';
  import UtButton from '@/components/form_elements/Button';
  import Accordion from '@/components/Accordion.vue';
  import Toggle from '@/components/form_elements/Toggle.vue';
  import { debounce } from "lodash";

  export default {
    components: {
			AppContent,
      CopyButton,
      PasteButton,
      UtButton,
      Accordion,
      Toggle,
    },
    data() {
      return {
        originalData: '',
        mutatedData: '',
        toggleNewline: false,
        caseType: '',
        excludes: '',
        delimiter: ' ',
        separator: ' ',
        processResult: '',
      }
    },
    methods: {
      capitalize(string){
        return string.toUpperCase();
      },
      lowercase(string){
        return string.toLowerCase();
      },
      titlecase(string){
        return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
      },
      pastedData(string){
        this.originalData = string;
      },
      processText(){
        this.processResult = `<span class="text-sm font-bold tracking-wide">TOTAL COUNT</span>
				${this.originalData.split(this.delimiter).length} item(s)
				
        <span class="text-sm font-bold tracking-wide">UNIQUE VALUE</span>
				${this.originalData.split(this.delimiter)
          .map(item => item.trim())
          .filter((value, index, self) => {
            return self.indexOf(value) === index;
          }).join(',')}
        `;
      }
    },
    computed: {
      triggerChangeData() {
        //this is a hack for vue 2 to trigger watcher when any of the property values below changes
        return `${this.originalData}|${this.caseType}|${this.toggleNewline}|${this.excludes}|${this.delimiter}||${this.separator}`;
      },
    },
    watch: {
      triggerChangeData: {
        immediate: true,
        handler: debounce(function () {
          let newString = '';
          let dataArr = this.originalData.split(this.delimiter);

          dataArr.forEach((string, index) => {
            newString += (this.excludes.split(',').includes(string)
              ? string
              : this.caseType !== '' 
                ? this[this.caseType](string) 
                : string
            ).trim() + (this.toggleNewline ? '\n' : dataArr.length !== index+1 ? this.separator : '');
          });

          this.mutatedData = newString;
        }, 1000)
      }
    },
  };
</script>
