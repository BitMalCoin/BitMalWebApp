<template>
  <div>
    <my-project-sort />
    <explore-grid :projects="myProjects" />
    <div class="midder">
      <p v-if="!myProjects.length">No projects to show</p>
    </div>
    <bitmal-footer />
  </div>
</template>

<script>
import MyProjectSort from '../../components/user/MyProjectSort.vue'
import ExploreGrid from '../../components/explore/ExploreGrid.vue'
import BitmalFooter from '../../components/common/BitmalFooter.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    MyProjectSort,
    ExploreGrid,
    BitmalFooter
  },

  async fetch ({ store, params }) {
    await store.dispatch('explore/loadMyProjects')
  },

  computed: {
    ...mapGetters({
      myProjects: 'explore/getMyProjects',
      showingAll: 'explore/showingAll'
    })
  }

  // To see the actual call in the browser
  // mounted () {
  //   this.$store.dispatch('explore/loadMyProjects')
  // }
}
</script>

<style lang="less">
@import '../../assets/style/main.less';

.midder {
  display: flex;
  justify-content: center;

  .loadmore-btn {
    margin: 18px 0 32px;
    position: relative;
  }
}
</style>
