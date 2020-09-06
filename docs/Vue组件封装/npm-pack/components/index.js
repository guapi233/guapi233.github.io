import Button from "./Button";
import Dialog from "./Dialog";
import Input from "./Input";
import Checkbox from "./Checkbox";
import Radio from "./Radio";
import RadioGroup from "./Radio-group";
import Switch from "./Switch";
import CheckboxGroup from "./Checkbox-group";
import "./fonts/iconfont.css";

// 组件列表
const components = [
  Button,
  Dialog,
  Input,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  CheckboxGroup,
];

// 安装函数
const install = function(Vue) {
  components.forEach((item) => {
    Vue.component(item.name, item);
  });
};

// 如果为直接引入文件，则省去Vue.use()
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
};
