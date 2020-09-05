<template>
  <div class="c-input" :class="{ 'c-input--suffix': showSuffix }">
    <!-- 输入框本体 -->
    <input
      class="c-input__inner"
      :type="handleType"
      :class="{ 'is-disabled': disabled }"
      :name="name"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />

    <!-- 功能图标 -->
    <span class="c-input__suffix" v-if="showSuffix">
      <i
        class="c-input__icon c-input__clear icon-enempty"
        v-if="clearable && value"
        @click="$emit('input', '')"
      ></i>
      <i
        class="c-input__icon c-input__clear"
        :class="eyeIsOpen"
        v-if="showPassword && value"
        @click="eyeOpen=!eyeOpen"
      ></i>
    </span>
  </div>
</template>

<script>
export default {
  name: "CInput",
  data() {
    return {
      eyeOpen: false,
    };
  },
  props: {
    // 输入框提示
    placeholder: {
      type: String,
      default: "",
    },
    // 输入框类型
    type: {
      type: String,
      default: "text",
    },
    // 字段name
    name: {
      type: String,
      default: "",
    },
    // 是否开启禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 值
    value: {
      type: String,
      default: "",
    },
    // 是否开启清空按钮
    clearable: {
      type: Boolean,
      default: false,
    },
    // 是否开启密码显隐按钮
    showPassword: {
      type: Boolean,
      default: false,
    },
  },
  methods: {},
  computed: {
    // 打开CSS后缀的条件
    showSuffix() {
      return this.clearable || this.showPassword;
    },
    // 密码Icon显隐的条件
    eyeIsOpen() {
      return this.eyeOpen ? "icon-eye" : "icon-eye-off";
    },
    // 类型处理
    handleType() {
      return this.showPassword
        ? this.eyeOpen
          ? "text"
          : "password"
        : this.type;
    },
  },
};
</script>

<style lang="scss">
.c-input {
  width: 100%;
  position: relative;
  font-size: 14px;
  display: inline-block;

  .c-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;

    &:focus {
      outline: none;
      border-color: #409eff;
    }

    &.is-disabled {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
}

.c-input--suffix {
  .c-input__inner {
    padding-right: 30px;
  }

  .c-input__suffix {
    position: absolute;
    height: 100%;
    right: 10px;
    top: 0;
    line-height: 40px;
    text-align: center;
    color: #c0c4cc;
    transition: all 0.3s;
    z-index: 900;

    i {
      color: #c0c4cc;
      font-size: 14px;
      cursor: pointer;
      transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
}

/* 关闭IE默认的清空样式和小眼睛 */
::-ms-clear,
::-ms-reveal {
  display: none;
}
</style>