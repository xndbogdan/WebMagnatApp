<template>
  <div class="bg-gray-300 min-h-screen flex items-center justify-center">
    <div v-if="loading" class="spinner text-6xl"></div>
    <div v-else class="px-4 py-8 bg-gray-300 text-gray-700 text-shadow-lg font w-full container mb-8">
      <div class="w-full text-center text-2xl md:text-4xl flex-col justify-center font-bold flex items-center mb-6">
        <icon name="question-mark-circle" class="w-8 mb-4 nm-flat-gray-300 rounded-full h-auto text-blue-700 mr-2" />
        <span>{{ quiz.title }}</span>
      </div>
      <div class="flex flex-wrap w-full container" v-if="!quiz.answered">
        <div @click="vote(option.id)" :key="option.id" v-for="option in quiz.quiz_options" class="group font-bold cursor-pointer justify-between items-center w-full text-left my-4 text-lg flex flex-wrap nm-flat-gray-300 hover:nm-inset-gray-300 py-2 px-2">
          <span class="ml-2">{{ option.text }}</span>
          <icon name="chat" class="w-8 h-auto text-blue-700 mr-2 nm-convex-gray-300 group-hover:nm-concave-gray-300 p-1 rounded-full" />
        </div>
      </div>
      <div v-else-if="chartData">
        <Chart :chartData="chartData" :options="chartOptions"/>
        <div class="mt-6">{{ yourVote }}</div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import User from "@/api/User";
import Quiz from "@/api/Quiz";
import Chart from "@/components/Chart";
import Cookie from "js-cookie";

export default {
  name: "Home",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Chart
  },
  data: () => {
    return {
      user_id: null,
      quiz: null,
      loading: true,
      chartOptions: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  mounted() {
    User.auth().then(response => {
      this.user_id = response.data;
      Quiz.question({ user_id: this.user_id }).then(response => {
        this.quiz = response.data;
        this.loading = false;
      });
    });
  },
  methods: {
    vote(option_id) {
      Quiz.vote(this.quiz.id, option_id, { user_id: this.user_id }).then(response => {
          if (typeof response.data !== "object") {
            //error toast
            return;
          }
          this.quiz = response.data;
          Cookie.set("q" + this.quiz.id, option_id);
        }
      );
    }
  },
  computed: {
    yourVote() {
      if (!this.quiz || !this.quiz.quiz_options) {
        return null;
      }
      if (!Cookie.get("q" + this.quiz.id)) {
        return null;
      }
      let votedOption = this.quiz.quiz_options.find(option => {
        return option.id == Cookie.get("q" + this.quiz.id)
      });

      if (!votedOption) {
        return null;
      }

      return "You voted '" + votedOption.text + "'"
    },
    chartData() {
      if (!this.quiz || !this.quiz.quiz_options) {
        return null;
      }
      return {
        labels: this.quiz.quiz_options.map(option => {
          return option.text;
        }),
        datasets: [
          {
            label: "# of Votes",
            data: this.quiz.quiz_options.map(option => {
              return option.answers_count;
            }),
            borderWidth: 1
          }
        ]
      };
    }
  }
};
</script>
