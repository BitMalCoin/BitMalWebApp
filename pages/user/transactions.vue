<template>
  <div class="transactions-tabs">
    <el-tabs type="card">

      <el-tab-pane label="Bitmal wallet">
        <div class="transactions-inner wallet">
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

      <el-tab-pane label="Bitmal transactions">
        <div class="bm-trans-tab">
          <div class="upper">
            Your Bitmal transactions sorted by
            <el-select
              v-model="value"
              class="bitmal-input bitmal-input-filter"
              popper-class="bitmal-input-popper">
              <el-option
                v-for="option in options"
                :key="option.value"
                :label="option.value"
                :value="option.value"/>
            </el-select>
          </div>

          <div class="lower">
            <bitmal-transactions />
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="USD transactions">USD transactions component...</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import WalletBalance from '../../components/user/WalletBalance'
import StripeBuy from '../../components/user/StripeBuy'
import BitmalTransactions from '../../components/user/BitmalTransactions'

export default {
  components: { WalletBalance, StripeBuy, BitmalTransactions },

  data () {
    return {
      options: [
        { value: 'Newest' },
        { value: 'Oldest' }
      ],
      value: {}
    }
  },

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
.transactions-tabs {

  .transactions-inner {
    display: flex;
    justify-content: center;

    &.wallet {
      margin-top: 70px;
    }

    .eighth {
      max-width: 840px;
    }

  }

  .bm-trans-tab {
    .upper {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100px;
      border-bottom: 1px solid @ui;

      .bitmal-input-filter {
        margin-left: 12px;
        max-width: 170px;
      }
    }

    .lower {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

}

</style>
