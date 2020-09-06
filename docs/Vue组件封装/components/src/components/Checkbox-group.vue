<template>
  <div class="c-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "CCheckboxGroup",
  props: {
    value: null,
  },
  provide() {
    return {
      checkboxGroup: this,
    };
  },
};
</script>

<style lang="scss">
</style>