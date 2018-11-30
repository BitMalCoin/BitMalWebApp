<template>
  <div class="bit-profile">

    <div class="subhead sixh">
      <div class="tit">Welcome to bitmal.</div>
      <div class="subtit">Living a fully ethical life academic emerging strategize academic peaceful citizen-centered green space ecosystem.</div>
    </div>
    <div class="hr" />

    <bit-profile-form class="sixh" />
  </div>
</template>

<script>
import BitProfileForm from '../../components/user/BitProfileForm.vue'

export default {
  auth: false,

  async fetch ({ store }) {
    await Promise.all([
      store.dispatch('types/loadType', 'sc_marketPlaceLocations'),
      store.dispatch('types/loadType', 'sc_marketPlaceEducation'),
      store.dispatch('types/loadType', 'sc_marketPlaceProfileTag')
    ])
  },

  components: {
    BitProfileForm
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
