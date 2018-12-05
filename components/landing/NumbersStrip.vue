<template>
  <el-row class="strip">
    <el-col :span="countSpan">
      <div class="title">{{ $t('activeProjects') }}</div>
      <div class="number">{{ thousandSep(general.activeProjects) }}</div>
    </el-col>
    <el-col :span="countSpan">
      <div class="title">{{ $t('totalInvested') }}</div>
      <div class="number">{{ thousandSep(general.totalInvestedBitmals) }}</div>
    </el-col>
    <el-col :span="countSpan">
      <div class="title">{{ $t('totalBackers') }}</div>
      <div class="number">{{ thousandSep(general.totalBackers) }}</div>
    </el-col>
    <el-col :span="countSpan">
      <div class="title">{{ $t('fundedProjects') }}</div>
      <div class="number">{{ thousandSep(general.fundedProjects) }}</div>
    </el-col>
  </el-row>
</template>

<i18n>
{
  "en": {
    "activeProjects": "active projects",
    "totalInvested": "total invested bitmals",
    "totalBackers": "total backers",
    "fundedProjects": "funded projects"
  }
}
</i18n>

<script>
import { mapState } from 'vuex'
import { thousandSep } from '../../utils/utils'

export default {
  computed: {
    ...mapState({
      general: 'general'
    }),
    countSpan () {
      return {
        xs: 24,
        sm: 12,
        md: 6,
        lg: 6,
        xl: 6
      }[this.$mq]
    }
  },
  methods: {
    thousandSep
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/main.less';

.strip {
  padding: 20px 0;
  margin-bottom: 32px;
  border-top: 1px solid @ui;
  border-bottom: 1px solid @ui;

  .title {
    .font-xs;
    text-transform: uppercase;
  }
  .number {
    .font-xl;
    .bold;
  }
}
</style>
