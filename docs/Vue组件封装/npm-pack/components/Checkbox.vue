<template>
  <label class="c-checkbox" :class="{ 'is-checked': isChecked }">
    <span class="c-checkbox__input">
      <span class="c-checkbox__inner"></span>
      <input
        type="checkbox"
        class="c-checkbox__original"
        :name="name"
        :value="label"
        v-model="self"
      />
    </span>

    <span class="c-checkbox__label">
      <slot></slot>

      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script>
export default {
  name: "CCheckbox",
  inject: {
    checkboxGroup: {
      default: null,
    },
  },
  computed: {
    // 绑定值中转变量
    self: {
      get() {
        return this.hasGroup ? this.checkboxGroup.value : this.value;
      },
      set(newVal) {
        this.hasGroup
          ? this.checkboxGroup.$emit("input", newVal)
          : this.$emit("input", newVal);
      },
    },
    // 是否被c-checkbox-group标签包裹
    hasGroup() {
      return !!this.checkboxGroup;
    },
    // 选中样式控制
    isChecked() {
      return this.hasGroup
        ? this.checkboxGroup.value.includes(this.label)
        : this.value;
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
.c-checkbox {
  color: #606266;
  font-weight: 500;
  font-size: 14px;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  user-select: none;
  margin-right: 30px;
  .c-checkbox__input {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle;
    .c-checkbox__inner {
      display: inline-block;
      position: relative;
      border: 1px solid #dcdfe6;
      border-radius: 2px;
      box-sizing: border-box;
      width: 14px;
      height: 14px;
      background-color: #fff;
      z-index: 1;
      transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
        background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
      &:after {
        box-sizing: content-box;
        content: "";
        border: 1px solid #fff;
        border-left: 0;
        border-top: 0;
        height: 7px;
        left: 4px;
        position: absolute;
        top: 1px;
        transform: rotate(45deg) scaleY(0);
        width: 3px;
        transition: transform 0.15s ease-in 0.05s;
        transform-origin: center;
      }
    }
    .c-checkbox__original {
      opacity: 0;
      outline: none;
      position: absolute;
      margin: 0;
      width: 0;
      height: 0;
      z-index: -1;
    }
  }
  .c-checkbox__label {
    display: inline-block;
    padding-left: 10px;
    line-height: 19px;
    font-size: 14px;
  }
}

.c-checkbox.is-checked {
  .c-checkbox__input {
    .c-checkbox__inner {
      background-color: #409eff;
      border-color: #409eff;

      &:after {
        transform: rotate(45deg) scaleY(1);
      }
    }
  }

  .c-checkbox__label {
    color: #409eff;
  }
}
</style>