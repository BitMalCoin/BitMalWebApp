<template>
  <div>
    <bitmal-header />
    <div class="headered">
      <nuxt class="nuxt" />
    </div>
  </div>
</template>

<script>
import BitmalHeader from '../components/common/BitmalHeader.vue'

export default {
  components: { BitmalHeader }
}
</script>

<style lang="less">
@import '../assets/style/variables.less';

.headered {
  box-sizing: border-box;
  max-width: @appWidthMaxLimit;
  padding-top: @headerHeight;
  margin: 0 auto 0 auto;
  min-height: 100vh;

  .nuxt {
    margin: 0 8px;
  }
}
</style>
