<template>
	<app-content title="Daily Tracker">
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
		
		<div class="max-w-full lg:max-w-5xl mx-auto flex flex-col py-2 px-6">
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="(activity, index) in activities" :key="index" class="p-4 rounded-lg border-2 border-gray-200 bg-white">
          <div v-if="activity.goal">
            <h3 class="font-bold text-lg text-center">{{ activity.goal }}</h3>
            <div 
              v-for="(system, systemIndex) in activity.systems" :key="`${index}-${systemIndex}`"
              class="flex flex-col"
            >
              <checkbox v-model="activities[index].systems[systemIndex].is_done" :name="system.name" />
            </div>
          </div>
          <div v-else>
            <checkbox v-model="activities[index].is_done" :name="activity.name" />
          </div>
        </div>
      </div>
		</div>
	</app-content>
</template>

<script>
	import AppContent from '@/layouts/AppContent';
  import Checkbox from '@/components/form_elements/Checkbox';

  export default {
    components: {
			AppContent,
      Checkbox,   
    },
    data() {
      return {
        activities: [],
      }
    },
    mounted() {
      localStorage.removeItem("daily_tracker");

      if(localStorage.getItem("daily_tracker") === null)
        this.initTracker();

      let data = JSON.parse(localStorage.getItem("daily_tracker"));

      if(this.isToday(new Date(data.date)) === false){
        this.initTracker();
        data = JSON.parse(localStorage.getItem("daily_tracker"));
      }

      this.activities = data.activities;

      this.$watch('activities', {
        handler(val) {
          console.log(val);
          localStorage.setItem("daily_tracker", JSON.stringify({
            date: new Date(),
            activities: val
          }));
        },
        deep: true,
      });
    },
    methods: {
      initTracker(){
        console.log('init');
        localStorage.removeItem("daily_tracker");
        localStorage.setItem("daily_tracker", JSON.stringify({
          date: new Date(),
          activities: [
            {
              name: 'Pumping',
              is_done: false,
            },
            {
              goal: 'AI Necromancer',
              systems: [
                {
                  name: 'Touch typing practice',
                  is_done: false,
                },
                {
                  name: 'Add one entry to notion',
                  is_done: false,
                }
              ],
              upcoming: ['Vim practice']
            },
            {
              goal: 'Reader Citizen',
              systems: [
                {
                  name: 'Read 5 page',
                  is_done: false,
                },
                {
                  name: 'Listen to podcast in the morning',
                  is_done: false,
                }
              ],
              upcoming: []
            }
          ]
        }));
      },
      isToday(someDate) {
        const today = new Date();
        return someDate.getDate() == today.getDate() &&
          someDate.getMonth() == today.getMonth() &&
          someDate.getFullYear() == today.getFullYear()
      }
    },
  };
</script>
