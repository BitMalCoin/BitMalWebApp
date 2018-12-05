<template>
  <div class="signup-page">
    <div class="subhead sixh">
      <div class="tit">{{ $t('tit') }}</div>
      <div class="subtit">{{ $t('subtit') }}</div>
    </div>
    <div class="hr" />
    <bit-user-form
      :editable="editable"
      class="sixh"/>
  </div>
</template>

<i18n>
{
  "en": {
    "tit": "Welcome to bitmal.",
    "subtit": "Living a fully ethical life academic emerging strategize academic peaceful citizen-centered green space ecosystem."
  }
}
</i18n>

<script>
import BitUserForm from '../components/signup/BitUserForm.vue'

export default {
  auth: false,
  components: { BitUserForm },

  data () {
    return {
      editable: false
      // gots changed by extend
    }
  }
}
</script>

<style lang="less">
@import '../assets/style/main.less';

.signup-page {
  display: flex;
  flex-direction: column;
  align-items: center;

  .hr {
    height: 1px;
    background-color: @ui;
    width: 100%;
  }

  .subhead {
    margin-top: 80px;
    margin-bottom: 40px;
    .tit {
      .font-l;
      .bold;
      text-align: center;
    }
    .subtit {
      .font-m;
      margin: 12px 0;
      text-align: center;
    }
  }
}
</style>
