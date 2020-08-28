import Api from "./Api";

export default {
  async question(data) {
    return Api.post("/quiz/question", data);
  },
  async vote(quiz, quizAnswer, data) {
    return Api.post("/quiz/" + quiz + "/" + quizAnswer + "/vote", data);
  }
};
