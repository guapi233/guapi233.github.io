import Vue from "vue";
import App from "./App.vue";
import CButton from "./components/Button.vue";
import CDialog from "./components/Dialog.vue";
import CInput from "./components/Input.vue";
import CSwitch from "./components/Switch.vue";
import CRadio from "./components/Radio.vue";
import CRadioGroup from "./components/Radio-group.vue";
import CCheckbox from "./components/Checkbox.vue";
import CCheckboxGroup from "./components/Checkbox-group.vue";
import "./assets/icon/iconfont.css";

Vue.component(CButton.name, CButton);
Vue.component(CDialog.name, CDialog);
Vue.component(CInput.name, CInput);
Vue.component(CSwitch.name, CSwitch);
Vue.component(CRadio.name, CRadio);
Vue.component(CRadioGroup.name, CRadioGroup);
Vue.component(CCheckbox.name, CCheckbox);
Vue.component(CCheckboxGroup.name, CCheckboxGroup);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
