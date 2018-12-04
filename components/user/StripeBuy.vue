<template>
  <div class="stripe-buy">
    <div class="tit">BUY BITMAL FOR USD</div>
    <div class="buy-strip">
      <el-input
        v-model="amount"
        class="bitmal-input"
        placeholder="Type amount"/>
      <button class="btn btn-dark">Buy now!</button>
    </div>
    <div class="text">Conversion: 1 BMC = {{ rate }} USD</div>
    <div class="info">Info: this will launch a popup of stripe, which then bla, Bob Lablaw's law blog bla bla</div>
  </div>
</template>

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
