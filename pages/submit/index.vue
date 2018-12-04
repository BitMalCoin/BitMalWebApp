<template>
  <div class="submit-page">
    <div class="subhead sixh">
      <div class="tit">Thanks for making the world a better place.</div>
      <div class="subtit">Living a fully ethical life academic emerging strategize academic peaceful citizen-centered green space ecosystem.</div>
    </div>
    <div class="hr" />
    <bit-project-form class="sixh" />
  </div>
</template>

<script>
import BitProjectForm from '../../components/submit/BitProjectForm.vue'
import { mapActions } from 'vuex'

export default {
  components: { BitProjectForm },

  async fetch ({ store, app }) {
    await Promise.all([
      store.dispatch('types/loadTypeServer', 'sc_marketPlaceCategory'),
      store.dispatch('types/loadTypeServer', 'sc_marketPlaceLocations')
    ])
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

<style lang="less">
@import '../../assets/style/main.less';

.submit-page {
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
