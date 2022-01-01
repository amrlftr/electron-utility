<template>
  <div class="min-h-screen px-4 font-mono pt-6">
    <router-link to="/">Home</router-link>
    <legend class="text-3xl font-bold bg-white text-gray-900 leading-8 px-4 absolute left-1/2 transform -translate-x-1/2 -mt-4 z-10">Text Case</legend>

    <div class="flex flex-col md:flex-row space-x-4 w-full max-w-full leading-5 text-gray-700 border-4 border-gray-800 p-6">
      <div class="w-full flex-col mb-5 text-gray-700 break-words rounded">
        <div class="p-5">
          <div class="block pb-2">
            <h4 class="font-bold text-2xl">
              Data
            </h4>
          </div>
          <textarea rows="4" class="appearance-none outline-none bg-transparent border-b border-gray-700 w-full mb-4" v-model="originalData"></textarea>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div 
              v-for="(type, index) in ['capitalize', 'titlecase', 'lowercase']" 
              :key="index" 
              @click="caseType = type" 
              :class="[caseType === type ? 'bg-yellow-600 text-white' : 'border-2 border-yellow-600 bg-white text-yellow-600']" 
              class="px-2 py-1 text-center cursor-pointer"
            >
              {{ type }}
            </div>
          </div>
        </div>

        <div class="p-4 space-y-4">
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
            <input type="checkbox" class="w-4 h-4" v-model="toggleNewline">
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
          <textarea rows="4" class="appearance-none outline-none bg-transparent border-b border-gray-700 w-full mb-4" v-model="mutate"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        originalData: '',
        toggleNewline: false,
        caseType: 'capitalize',
        delimiter: ' ',
        separator: ' ',
      }
    },
    methods: {
      copyToClipboard(){
        navigator.clipboard.writeText(this.mutate);
      },
      capitalize(string){
        return string.toUpperCase();
      },
      lowercase(string){
        return string.toLowerCase();
      },
      titlecase(string){
        return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
      }
    },
    computed: {
      mutate(){
        let newString = '';
        let dataArr = this.originalData.split(this.delimiter);

        dataArr.forEach((string, index) => {
          newString += this[this.caseType](string) + (this.toggleNewline ? '\n' : dataArr.length !== index+1 ? this.separator : '');
        })

        return newString;
      },
    }
  };
</script>
