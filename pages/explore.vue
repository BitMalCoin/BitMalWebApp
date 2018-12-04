<template>
  <div>
    <explore-filters />
    <explore-grid :projects="exploreProjects" />
    <div class="midder">
      <button
        v-if="!showingAll"
        class="btn loadmore-btn"
        @click="showMore">load more</button>
      <p v-if="!exploreProjects.length">No projects to show</p>
    </div>
    <bitmal-footer />
  </div>
</template>

<script>
import ExploreFilters from '../components/explore/ExploreFilters.vue'
import ExploreGrid from '../components/explore/ExploreGrid.vue'
import BitmalFooter from '../components/common/BitmalFooter.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  auth: false,

  components: {
    ExploreFilters,
    ExploreGrid,
    BitmalFooter
  },

  async fetch ({ store, route }) {
    await Promise.all([
      store.dispatch('types/loadTypeServer', 'sc_marketPlaceCategory'),
      store.dispatch('types/loadTypeServer', 'sc_marketPlaceLocations')
    ])

    if (route.query && route.query.location) {
      await store.dispatch('explore/selectLocationSlug', route.query.location)
    } else {
      await store.dispatch('explore/loadProjects')
    }
  },

  computed: {
    ...mapGetters({
      exploreProjects: 'explore/getProjects',
      showingAll: 'explore/showingAll'
    })
  },

  async created () {
    const didNotGotCategories = !this.$store.state.types.sc_marketPlaceCategory.length
    const didNotGotLocations = !this.$store.state.types.sc_marketPlaceCategory.length
    const loadTypesToProcError = didNotGotCategories || didNotGotLocations

    if (loadTypesToProcError) {
      this.loadTypeClient('sc_marketPlaceCategory')
      this.loadTypeClient('sc_marketPlaceLocations')
    }
    this.womitErrors()
  },

  methods: {
    ...mapActions({
      showMore: 'explore/showMore',
      loadTypeClient: 'types/loadTypeClient',
      womitErrors: 'errors/womitErrors'
    })
  }
}
</script>

<style lang="less">
@import '../assets/style/main.less';

.midder {
  display: flex;
  justify-content: center;

  .loadmore-btn {
    margin: 18px 0 32px;
    position: relative;
  }
}
</style>
