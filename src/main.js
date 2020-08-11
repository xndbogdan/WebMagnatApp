import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/postcss/tailwind.css";
import VIcon from "vue-tailwind-icons";

Vue.config.productionTip = false;
Vue.use(VIcon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
