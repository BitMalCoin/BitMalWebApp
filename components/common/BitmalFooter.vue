<template>
  <footer>{{ $t('footer') }} <a href="mailto:info@bitmal.org">info@bitmal.org</a></footer>
</template>

<i18n>
{
  "en": {
    "footer": "BitMal is still under development, for more information please contact"
  }
}
</i18n>

<script>
export default {}
</script>

<style lang="less" scoped>
@import '../../assets/style/main.less';

footer {
  .font-xs;
  height: 112px;
  text-align: center;
  line-height: 112px;
  border-top: 1px solid @ui;
}
</style>
