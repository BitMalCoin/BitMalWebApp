<template>
  <el-select
    v-model="innerValue"
    class="bitmal-input bitmal-input-filter"
    popper-class="bitmal-input-popper">
    <el-option
      v-for="(item, ind) in options"
      :key="ind"
      :label="item"
      :value="item" />
  </el-select>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    mutation: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      innerValue: this.value
    }
  },

  watch: {
    innerValue: function (a) {
      this.$store.commit(this.mutation, a)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/main.less';
</style>
