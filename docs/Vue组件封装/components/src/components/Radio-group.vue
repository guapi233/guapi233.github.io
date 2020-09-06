<template>
  <div class="c-radio-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "CRadioGroup",
  props: {
    value: null,
  },
  provide() {
    return {
      radioGroup: this,
    };
  },
};
</script>

<style lang="scss">
</style>