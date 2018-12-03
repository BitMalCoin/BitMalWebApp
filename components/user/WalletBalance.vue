<template>
  <div class="wallet-balance">
    <div class="tit">MY BITMAL WALLET BALANCE</div>
    <div class="nr">{{ mockBalance }}</div>
    <div class="tit">MY BITMAL ADDRESS (HASH)</div>
    <div class="hash">{{ mockHash }}</div>
  </div>
</template>

<script>

export default {

  data () {
    return {
      mockBalance: 238,
      mockHash: 'c2d7cf95645d33006175b78989035c7c9061d3f9'
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/main.less';
.wallet-balance {
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

  .nr {
    color: @blue;
    .bold();
    .font-xl();
  }

  .hash {
    .font-s();
  }
}
</style>
