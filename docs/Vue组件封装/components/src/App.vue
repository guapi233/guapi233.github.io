<template>
  <div id="app">
    <!-- 😁:Checkbox -->
    <div>
      <c-checkbox v-model="check">选择</c-checkbox>
      {{ check }}
    </div>
    <div>
      <c-checkbox-group v-model="check2">
        <c-checkbox label="0">男</c-checkbox>
        <c-checkbox label="1">女</c-checkbox>
        <c-checkbox label="2">？</c-checkbox>
      </c-checkbox-group>
      {{ check2 }}
    </div>

    <!-- 😁:Radio -->
    <!-- <div>
      <c-radio label="0" v-model="rad">男</c-radio>
      <c-radio label="1" v-model="rad">女</c-radio>
      {{ rad }}
    </div>
    <div>
      <c-radio-group v-model="rad2">
        <c-radio label="0">男</c-radio>
        <c-radio label="1">女</c-radio>
      </c-radio-group>
      {{ rad2 }}
    </div>-->

    <!-- 😁:Switch -->
    <!-- <c-switch v-model="s" activeColor="red" inactiveColor="blue"></c-switch> -->

    <!-- 😁:input -->
    <!-- <div style="width: 300px;">
      <c-input></c-input>
      <c-input placeholder="请输入账号" v-model="val" clearable></c-input>
      <c-input placeholder="请输入密码" v-model="pass" type="password" showPassword></c-input>
      <c-input disabled></c-input>
      <c-input v-model="val"></c-input>
      {{ val }}
    </div>-->

    <!-- 😁:dialog -->
    <!-- <c-button @click="visible=true">按钮</c-button>
    <c-dialog title="我是标题" :visible.sync="visible">
      <template v-slot:title>
        <h3>我是标题啊</h3>
      </template>
      <template>
        heelow
        <input type="text" />
      </template>
      <template v-slot:footer>
        <c-button @click="visible=false">取消</c-button>
        <c-button type="primary">确认</c-button>
      </template>
    </c-dialog>-->

    <!-- 😁: 按钮 -->
    <!-- <div class="row">
      <c-button>11</c-button>
      <c-button type="primary">22</c-button>
      <c-button type="success">33</c-button>
      <c-button type="info">44</c-button>
      <c-button type="warning">55</c-button>
      <c-button type="danger">66</c-button>
    </div>

    <div class="row">
      <c-button plain>11</c-button>
      <c-button type="primary" plain>22</c-button>
      <c-button type="success" plain>33</c-button>
      <c-button type="info" plain>44</c-button>
      <c-button type="warning" plain>55</c-button>
      <c-button type="danger" plain>66</c-button>
    </div>

    <div class="row">
      <c-button plain round>11</c-button>
      <c-button type="primary" plain round>22</c-button>
      <c-button type="success" plain round>33</c-button>
      <c-button type="info" plain round>44</c-button>
      <c-button type="warning" plain round>55</c-button>
      <c-button type="danger" plain round>66</c-button>
    </div>

    <div class="row">
      <c-button plain circle>11</c-button>
      <c-button type="primary" plain circle>22</c-button>
      <c-button type="success" plain circle>33</c-button>
      <c-button type="info" plain circle>44</c-button>
      <c-button type="warning" plain circle>55</c-button>
      <c-button type="danger" plain circle>66</c-button>
    </div>

    <div class="row">
      <c-button plain circle icon="calendar"></c-button>
      <c-button type="primary" plain circle icon="chuang"></c-button>
      <c-button type="success" plain circle icon="beibao"></c-button>
      <c-button type="info" plain circle icon="xiangji"></c-button>
      <c-button type="warning" plain circle icon="camera"></c-button>
      <c-button type="danger" plain circle icon="charger"></c-button>
    </div>

    <div class="row">
      <c-button disabled>按钮</c-button>
      <c-button type="primary" disabled>按钮</c-button>
      <c-button type="success" disabled>按钮</c-button>
      <c-button type="info" disabled>按钮</c-button>
      <c-button type="warning" disabled>按钮</c-button>
      <c-button type="danger" disabled>按钮</c-button>
    </div>

    <div class="row">
      <c-button plain disabled>按钮</c-button>
      <c-button type="primary" plain disabled>按钮</c-button>
      <c-button type="success" plain disabled>按钮</c-button>
      <c-button type="info" plain disabled>按钮</c-button>
      <c-button type="warning" plain disabled>按钮</c-button>
      <c-button type="danger" plain disabled>按钮</c-button>
    </div>

    <div class="row">
      <c-button plain @click="action">点我</c-button>
    </div>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      val: "双向绑定",
      pass: "",
      s: false,
      rad: "0",
      rad2: "0",
      check: false,
      check2: ["0", "1"],
    };
  },
  methods: {
    action(event) {
      alert("hjh");
    },
  },
};
</script>

<style lang="scss">
.row {
  margin-bottom: 10px;

  button {
    margin-right: 20px !important;
  }
}
</style>
