<template>
  <div class="transactions-tabs">
    <el-tabs type="card">
      <el-tab-pane label="Bitmal wallet">
        <div class="transactions-inner">
          <el-row
            :gutter="40"
            class="eighth">
            <el-col :span="fullOnXs">
              <wallet-balance />
            </el-col>
            <el-col :span="fullOnXs">
              <stripe-buy />
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Bitmal transactions">Bitmal transactions component...</el-tab-pane>
      <el-tab-pane label="USD transactions">USD transactions component...</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import WalletBalance from '../../components/user/WalletBalance'
import StripeBuy from '../../components/user/StripeBuy'

export default {
  components: { WalletBalance, StripeBuy },

  computed: {
    fullOnXs () {
      return {
        xs: 24,
        sm: 24,
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
.transactions-inner {
  display: flex;
  justify-content: center;

  .eighth {
    max-width: 840px;
  }
}

</style>
