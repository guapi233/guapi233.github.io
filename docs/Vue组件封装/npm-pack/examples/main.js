import Vue from "vue";
import App from "./App.vue";
import CUI from "../components";

Vue.config.productionTip = false;

Vue.use(CUI);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
