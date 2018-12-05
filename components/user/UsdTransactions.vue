<template>
  <div class="usd-transactions">
    <div
      v-for="transaction in transactions"
      :key="transaction.id"
      class="usd-transaction">
      <div class="first-row">
        <div class="iconholder">
          <i class="el-icon-success"/>
        </div>
        <span class="nr">{{ Math.abs(transaction.amount) }}</span>
        <span class="bmc">USD</span>
        <i class="el-icon-caret-right caret" />
        <span class="nr">{{ Math.abs(transaction.bmc) }}</span>
        <span class="bmc">BMC</span>
      </div>
      <div class="second-row">
        <div class="left">{{ transaction.info }}</div>
        <div class="right">{{ transaction.when }}</div>
      </div>
      <p class="hash">
        {{ $t('trHash') }} {{ transaction.hash }}
      </p>
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "trHash": "Transaction hash:"
  }
}
</i18n>

<script>
export default {

  data () {
    return {
      transactions: [
        {
          id: 'asdf1',
          amount: 250,
          bmc: 2,
          info: 'some additional info about the transaction',
          hash: '0xsdfer84568945698ewrlertiertjlert45040564telfgl4564324aayxccc01233xgdfgdfgt',
          when: '2018/06/14'
        },
        {
          id: 'asdf2',
          amount: 99,
          bmc: 1,
          info: 'some additional info about the transaction',
          hash: '0xsdfer84568945698ewrlertiertjlert45040564telfgl4564324aayxccc01233xgdfgdfgt',
          when: '2018/06/13'
        },
        {
          id: 'asdf3',
          amount: 1200,
          bmc: 12,
          info: 'some additional info about the transaction',
          hash: '0xsdfer84568945698ewrlertiertjlert45040564telfgl4564324aayxccc01233xgdfgdfgt',
          when: '2018/06/12'
        },
        {
          id: 'asdf4',
          amount: 89,
          bmc: 8,
          info: 'some additional info about the transaction',
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

.usd-transactions {
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: normal;

  .usd-transaction {
    max-width: 800px;
    min-height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 12px 0;

    .first-row {
      .bold();
      font-size: 20px;
      line-height: 24px;

      .iconholder {
        display: inline-block;
        width: 24px;
        height: 24px;
        line-height: 22px;
        text-align: center;
        background-color: @green;

        i {
          color: white;
          .bold();
          font-size: 16px;
        }
      }

      i.caret {
        transform: translate(3px, 1px);
      }

      .bmc {
        color: @text-light;
        font-size: 15px;
        margin-left: 2px;
      }

      .nr {
        margin-left: 8px;
      }
    }

    .second-row {
      font-size: 14px;
      font-weight: 600;
      line-height: 22px;
      margin: 6px 0;

      .left {
        display: block;
        float: left;
      }

      .right {
        display: block;
        float: right;
      }
    }

    .hash {
      color: @text-light;
      font-size: 12px;
      line-height: 15px;
      word-break: break-all;
    }

    border-bottom: 1px solid @ui;
  }
}

</style>
