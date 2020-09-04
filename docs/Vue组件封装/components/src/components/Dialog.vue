<template>
  <div class="c-dialog__wrapper">
    <div class="c-dialog">
      <div class="c-dialog__header">
        <slot name="title">
          <span class="c-dialog__title">{{ title }}</span>
        </slot>
        <button class="c-dialog__headerbtn">
          <i class="icon-close"></i>
        </button>
      </div>

      <div class="c-dialog__body">
        <span>这是一段信息</span>
      </div>

      <div class="c-dialog__footer">
        <c-button>取消</c-button>
        <c-button type="primary">确定</c-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CDialog",
  props: {
    title: {
      type: String,
      default: "提示",
    },
  },
};
</script>

<style lang="scss" scoped>
.c-dialog__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 2001;
  background-color: rgba(0, 0, 0, 0.5);

  .c-dialog {
    position: relative;
    margin: 15vh auto 50px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    width: 30%;

    &__header {
      padding: 20px 20px 10px;

      .c-dialog__title {
        line-height: 24px;
        font-size: 18px;
        color: #303133;
      }

      .c-dialog__headerbtn {
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 0;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 16px;

        .icon-close {
          color: #909399;
        }
      }
    }

    &__body {
      padding: 30px 20px;
      color: #606266;
      font-size: 14px;
      word-break: break-all;
    }

    &__footer {
      padding: 10px 20px 20px;
      text-align: right;
      box-sizing: border-box;

      .c-button:first-child {
        margin-right: 20px;
      }
    }
  }
}
</style>