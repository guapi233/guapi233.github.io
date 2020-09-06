<template>
  <label class="c-radio" :class="{ 'is-checked': self === label }">
    <span class="c-radio__input">
      <span class="c-radio__inner"></span>
      <input type="radio" class="c-radio__original" :name="name" :value="label" v-model="self" />
    </span>

    <span class="c-radio__label">
      <slot></slot>

      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script>
export default {
  name: "CRadio",
  inject: {
    radioGroup: {
      default: null,
    },
  },
  computed: {
    // 绑定值中转变量
    self: {
      get() {
        return this.hasGroup ? this.radioGroup.value : this.value;
      },
      set(newVal) {
        this.hasGroup
          ? this.radioGroup.$emit("input", newVal)
          : this.$emit("input", newVal);
      },
    },
    // 是否被c-radio-group标签包裹
    hasGroup() {
      return !!this.radioGroup;
    },
  },
  props: {
    // 单选框的label值
    label: {
      default: "",
    },
    // 表单组件的name属性
    name: {
      type: String,
      default: "",
    },
    // 双向绑定的值
    value: null,
  },
};
</script>

<style lang="scss">
.c-radio {
  color: #606266;
  font-weight: 500;
  line-height: 1;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  outline: none;
  font-size: 14px;
  margin-right: 30px;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;

  .c-radio__input {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle;

    .c-radio__inner {
      border: 1px solid #dcdfe6;
      border-radius: 100%;
      width: 14px;
      height: 14px;
      background-color: #fff;
      position: relative;
      cursor: pointer;
      display: inline-block;
      box-sizing: border-box;

      &:after {
        width: 4px;
        height: 4px;
        border-radius: 100%;
        background-color: #fff;
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(0);
        transition: transform 0.15s ease-in;
      }
    }

    .c-radio__original {
      opacity: 0;
      outline: none;
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      right: 0;
      margin: 0;
      bottom: 0;
    }
  }

  .c-radio__label {
    font-size: 14px;
    padding-left: 10px;
  }
}

.c-radio.is-checked {
  .c-radio__input {
    .c-radio__inner {
      border-color: #409eff;
      background: #409eff;

      &:after {
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }

  .c-radio__label {
    color: #409eff;
  }
}
</style>