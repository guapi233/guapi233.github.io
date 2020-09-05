<template>
  <div id="app">
    <!-- 😁:input -->
    <div style="width: 300px;">
      <c-input></c-input>
    </div>

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
