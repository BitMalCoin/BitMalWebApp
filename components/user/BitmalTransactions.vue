<template>
  <div class="bitmal-transactions">
    <div
      v-for="transaction in transactions"
      :key="transaction.id"
      class="bitmal-transaction">
      <div class="first-row">
        <div :class="['iconholder', {minus: transaction.amount < 0}]">
          <i class="el-icon-back"/>
        </div>
        {{ Math.abs(transaction.amount) }}
        <span>BMC</span>
      </div>
      <div class="second-row">
        <div class="left">{{ transaction.info }}</div>
        <div class="right">{{ transaction.when }}</div>
      </div>
      <div class="hash">
        Transaction hash: {{ transaction.hash }}
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data () {
    return {
      transactions: [
        {
          id: 'asdf1',
          amount: 100,
          info: 'by Csaba Makra for your project “Renovate school for Children””',
          hash: '0xsdfer84568945698ewrlertiertjlert45040564telfgl4564324aayxccc01233xgdfgdfgt',
          when: '2018/06/14'
        },
        {
          id: 'asdf2',
          amount: -15,
          info: 'by Csaba Makra for your project “Renovate school for Children””',
          hash: '0xsdfer84568945698ewrlertiertjlert45040564telfgl4564324aayxccc01233xgdfgdfgt',
          when: '2018/06/13'
        },
        {
          id: 'asdf3',
          amount: 12,
          info: 'by Csaba Makra for your project “Renovate school for Children””',
          hash: '0xsdfer84568945698ewrlertiertjlert45040564telfgl4564324aayxccc01233xgdfgdfgt',
          when: '2018/06/12'
        },
        {
          id: 'asdf4',
          amount: -8,
          info: 'by Csaba Makra for your project “Renovate school for Children””',
          hash: '0xsdfer84568945698ewrlertiertjlert45040564telfgl4564324aayxccc01233xgdfgdfgt',
          when: '2018/06/11'
        }
      ]
    }
  },

  methods: {}
}
</script>

<style lang="less" scoped>
@import '../../assets/style/main.less';

.bitmal-transactions {
  display: flex;
  flex-direction: column;
  align-items: center;

  .bitmal-transaction {
    max-width: 800px;
    height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .first-row {
      .bold();
      font-size: 20px;
      line-height: 24px;

      .iconholder {
        display: inline-block;
        width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        background-color: #54BB5C;
        transform: rotate(90deg);

        i {
          color: white;
          .bold();
          font-size: 16px;
        }

        &.minus {
          background-color: #F15B4A;
          transform: rotate(270deg);
        }
      }

      span {
        color: @text-light;
        font-size: 15px;
      }
    }
  }
}

</style>
