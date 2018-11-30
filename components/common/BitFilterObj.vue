<template>
  <el-select
    v-model="innerValue"
    class="bitmal-input bitmal-input-filter"
    popper-class="bitmal-input-popper">
    <el-option
      v-for="item in options"
      :key="`filtobj${item.id}`"
      :label="item.name"
      :value="item.id" />
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
    action: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      innerValue: '' + this.value
    }
  },

  watch: {
    innerValue: function (val) {
      this.$store.dispatch(this.action, val)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/main.less';
</style>
