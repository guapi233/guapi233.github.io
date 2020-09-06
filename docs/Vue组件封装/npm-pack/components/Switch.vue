<template>
  <div class="c-switch" @click="handleChange" :class="{ 'is-checked': value }">
    <span class="c-switch__core" ref="core">
      <span class="c-switch__button"></span>
    </span>
    <input class="c-switch__input" type="checkbox" :name="name" />
  </div>
</template>

<script>
export default {
  name: "CSwitch",
  props: {
    // 开关状态不
    value: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: "",
    },
    // 开启状态颜色
    activeColor: {
      type: String,
      default: "",
    },
    // 关闭状态颜色
    inactiveColor: {
      type: String,
      default: "",
    },
  },
  methods: {
    // 状态切换
    async handleChange() {
      this.$emit("input", !this.value);

      await this.$nextTick();

      this.setColor();
    },
    // 设置颜色
    setColor() {
      if (this.activeColor || this.inactiveColor) {
        let newColor = this.value ? this.activeColor : this.inactiveColor;

        this.$refs.core.style.borderColor = newColor;
        this.$refs.core.style.backgroundColor = newColor;
      }
    },
  },
  mounted() {
    this.setColor();
  },
};
</script>

<style lang="scss">
.c-switch {
  display: inline-flex;
  align-items: center;
  position: relative;
  font-size: 14px;
  line-height: 20px;
  height: 20px;
  vertical-align: middle;

  .c-switch__input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0;
  }

  .c-switch__core {
    margin: 0;
    display: inline-block;
    position: relative;
    width: 40px;
    height: 20px;
    border: 1px solid #dcdfe6;
    outline: none;
    border-radius: 10px;
    box-sizing: border-box;
    background: #dcdfe6;
    cursor: pointer;
    transition: border-color 0.3s, background-color 0.3s;
    vertical-align: middle;

    .c-switch__button {
      position: absolute;
      top: 1px;
      left: 1px;
      border-radius: 100%;
      transition: all 0.3s;
      width: 16px;
      height: 16px;
      background-color: #fff;
    }
  }
}
.c-switch.is-checked {
  .c-switch__core {
    border-color: #409eff;
    background-color: #409eff;
    .c-switch__button {
      transform: translateX(20px);
    }
  }
}
</style>