<template>
  <div class="bit-profile">

    <div class="subhead sixh">
      <div class="tit">{{ $t('tit') }}</div>
      <div class="subtit">{{ $t('subtit') }}</div>
    </div>
    <div class="hr" />

    <bit-profile-form class="sixh" />
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
import BitProfileForm from '../../components/user/BitProfileForm.vue'
import { mapActions } from 'vuex'

export default {
  auth: false,

  async fetch ({ store }) {
    await Promise.all([
      store.dispatch('types/loadTypeServer', 'sc_marketPlaceLocations'),
      store.dispatch('types/loadTypeServer', 'sc_marketPlaceEducation'),
      store.dispatch('types/loadTypeServer', 'sc_marketPlaceProfileTag')
    ])
  },

  components: {
    BitProfileForm
  },

  created () {
    this.womitErrors()
  },

  methods: {
    ...mapActions({
      womitErrors: 'errors/womitErrors'
    })
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/main.less';

.bit-profile {
  display: flex;
  flex-direction: column;
  align-items: center;

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
