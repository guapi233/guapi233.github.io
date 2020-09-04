import Vue from "vue";
import App from "./App.vue";
import CButton from "./components/Button.vue";
import CDialog from "./components/Dialog.vue";
import "./assets/icon/iconfont.css";

Vue.component(CButton.name, CButton);
Vue.component(CDialog.name, CDialog);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
