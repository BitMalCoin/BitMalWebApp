<template>
  <div class="submit-page">
    <div class="subhead sixh">
      <div class="tit">{{ $t('tit') }}</div>
      <div class="subtit">{{ $t('subtit') }}</div>
    </div>
    <div class="hr" />
    <bit-project-form
      :project="project"
      class="sixh"
    />
  </div>
</template>

<i18n>
{
  "en": {
    "tit": "Thanks for making the world a better place.",
    "subtit": "Living a fully ethical life academic emerging strategize academic peaceful citizen-centered green space ecosystem."
  }
}
</i18n>

<script>
import BitProjectForm from '../../../components/submit/BitProjectForm.vue'
import { mapGetters, mapActions } from 'vuex'
import get from 'lodash/get'

export default {
  components: { BitProjectForm },

  async fetch ({ store, route, app, redirect }) {
    await Promise.all([
      store.dispatch('types/loadTypeServer', 'sc_marketPlaceCategory'),
      store.dispatch('types/loadTypeServer', 'sc_marketPlaceLocations'),
      store.dispatch('projectDetail/loadProject', route.params.id)
    ])

    // Routing guard
    const userId = get(app, '$auth.user.id', 'a')
    const projectOwnerId = get(store, 'getters["projectDetail/getProject"].owner.id', 'b')
    if (userId !== projectOwnerId) {
      redirect({ path: `/project/${route.params.id}` })
    }
  },

  computed: {
    ...mapGetters({
      project: 'projectDetail/getProject'
    })
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
@import '../../../assets/style/main.less';

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
