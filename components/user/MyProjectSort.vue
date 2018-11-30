<template>
  <div class="exp-filter-holder">
    <el-row
      :gutter="20"
      class="hundred"
      justify="center">
      <el-col :span="calcSpan">
        <div :class="['text', {'text-right': $mq !== 'xs'}]">Your projects sorted by</div>
      </el-col>
      <el-col :span="calcSpan">
        <bit-filter-obj
          :value="''"
          :options="getTypes('sorts')"
          :action="'explore/selectMyProjectSort'"
          class="types" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BitFilterObj from '../common/BitFilterObj.vue'
import { mapGetters } from 'vuex'

export default {
  components: { BitFilterObj },

  computed: {
    ...mapGetters({
      getTypes: 'types/getTypes'
    }),

    calcSpan () {
      return {
        xs: 24,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12
      }[this.$mq]
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/main.less';

.exp-filter-holder {
  padding: 80px 0 24px;
  border-bottom: 1px solid @ui;
  // display: flex;
  // justify-content: center;

  .text {
    .font-m;
    margin: 0 12px;
    height: 40px;
    min-width: 172px;
    line-height: 40px;
    &.text-right {
      text-align: right;
    }
  }
}
</style>
