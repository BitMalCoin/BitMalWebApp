<template>
  <div class="stripe-buy">
    <div class="tit">{{ $t('buyFor') }}</div>
    <div class="buy-strip">
      <el-input
        v-model="amount"
        :placeholder="$t('type')"
        class="bitmal-input"/>
      <button class="btn btn-dark">{{ $t('buyNow') }}</button>
    </div>
    <div class="text">{{ $t('conversion') }} 1 BMC = {{ rate }} USD</div>
    <div class="info">{{ $t('info') }}</div>
  </div>
</template>

<i18n>
{
  "en": {
    "buyFor": "BUY BITMAL FOR USD",
    "type": "Type amount",
    "buyNow": "Buy now!",
    "conversion": "Conversion:",
    "info": "Info: this will launch a popup of stripe, which then bla, Bob Lablaw's law blog bla bla"
  }
}
</i18n>

<script>

export default {

  data () {
    return {
      amount: undefined,
      rate: '100.50'
    }
  },

  methods: {}
}
</script>

<style lang="less" scoped>
@import '../../assets/style/main.less';
.stripe-buy {
  border: 1px solid @ui;
  width: 320px;
  height: 130px;
  padding: 30px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .tit {
    .bold();
    .font-xs();
  }

  .buy-strip {
    display: flex;

    .btn {
      width: 120px;
      margin-left: 20px;
    }
  }

  .text {
    .font-s();
  }

  .info {
    .font-xs();
    font-style: italic;
    color: @text-light;
  }

}
</style>
