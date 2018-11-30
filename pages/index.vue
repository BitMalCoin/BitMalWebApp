<template>
  <div>
    <video-introduction />
    <numbers-strip />
    <featured-projects :projects="featuredProjects" />
    <popular-projects :projects="trendingProjects" />
    <bitmal-footer />
  </div>
</template>

<script>
import VideoIntroduction from '../components/landing/VideoIntroduction.vue'
import NumbersStrip from '../components/landing/NumbersStrip.vue'
import FeaturedProjects from '../components/landing/FeaturedProjects.vue'
import PopularProjects from '../components/landing/PopularProjects.vue'
import BitmalFooter from '../components/common/BitmalFooter.vue'
import { mapGetters } from 'vuex'

export default {
  auth: false,

  components: {
    VideoIntroduction,
    NumbersStrip,
    FeaturedProjects,
    PopularProjects,
    BitmalFooter
  },

  async fetch ({ store, params }) {
    await Promise.all([
      store.dispatch('landing/loadFeaturedProjects'),
      store.dispatch('landing/loadTrendingProjects')
    ])
  },

  computed: {
    ...mapGetters({
      featuredProjects: 'landing/getFeaturedProjects',
      trendingProjects: 'landing/getTrendingProjects'
    })
  }
}
</script>

<style lang="less">
@import '../assets/style/main.less';
</style>
