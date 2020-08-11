<template>
  <div class="bg-gray-300 min-h-screen flex items-center justify-center">
    <div v-if="loading" class="spinner text-6xl"></div>
    <div
      v-else
      class="px-4 py-8 bg-gray-300 text-gray-700 text-shadow-lg font w-full container mb-8"
    >
      <div
        class="w-full text-center text-2xl md:text-4xl flex-col justify-center font-bold flex items-center mb-4"
      >
        <icon
          name="question-mark-circle"
          class="w-8 mb-4 nm-flat-gray-300 rounded-full h-auto text-blue-700 mr-2"
        />
        <span>{{ quiz.title }}</span>
      </div>
      <div class="flex flex-wrap w-full container" v-if="!quiz.answered">
        <div
          class="font-bold cursor-pointer justify-between w-full text-left my-4 text-lg flex flex-wrap nm-flat-gray-300 hover:nm-inset-gray-300 py-2 px-2"
          :key="option.id"
          v-for="option in quiz.quiz_options"
        >
          <span class="ml-2">{{ option.text }}</span>
          <icon name="chat" class="w-6 h-auto text-blue-700 mr-2" />
        </div>
      </div>
      <div v-else></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import User from "@/api/User";
import Quiz from "@/api/Quiz";
export default {
  name: "Home",
  components: {},
  data: () => {
    return {
      user_id: null,
      quiz: null,
      loading: true
    };
  },
  mounted() {
    User.auth().then(response => {
      this.user_id = response;
      Quiz.question({ user_id: this.user_id }).then(response => {
        this.quiz = response.data;
        this.loading = false;
      });
    });
  }
};
</script>
