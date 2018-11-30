<template>
  <div :class="['title-wrapper', {bigTopMargin}]">
    <div class="title-row">
      <div class="title">{{ title }} <span
        v-if="hint"
        :title="hint"
        class="hint">?</span>
      </div>
      <div class="addition">{{ addition }}</div>
    </div>
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    addition: {
      type: String,
      default: ''
    },
    hint: {
      type: String,
      default: ''
    },
    bigTopMargin: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/main.less';

.title-wrapper {
  width: 100%;
  margin-top: 24px;

  &.bigTopMargin {
    margin-top: 54px;
  }

  .title-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;

    .title, .addition {
      text-transform: uppercase;
      .font-xs;
    }

    .hint {
      display: inline-block;
      width: 15px;
      text-align: center;
      .font-xs;
      background-color: rgb(148, 149, 141);
      color: white;
      border-radius: 50%;
      cursor: default;
    }
  }
}

</style>
