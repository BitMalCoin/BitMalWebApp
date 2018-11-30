import { browse } from '../utils/urls'

export const state = () => ({
  featuredProjects: [],
  trendingProjects: []
})

export const getters = {
  getFeaturedProjects: state => state.featuredProjects.slice(0, 3),
  getTrendingProjects: state => state.trendingProjects.slice(0, 12)
}

export const actions = {
  async loadFeaturedProjects ({ state, commit }) {
    const { data } = await this.$axios.$get(browse, {
      params: { featured_only: true }
    })
    commit('STORE_FEATURED_PROJECTS', data)
  },

  async loadTrendingProjects ({ state, commit }) {
    const { data } = await this.$axios.$get(browse, {
      params: { sort: 'trending' }
    })
    commit('STORE_TRENDING_PROJECTS', data)
  }
}

export const mutations = {
  STORE_FEATURED_PROJECTS: (state, projects) => {
    state.featuredProjects = projects
  },

  STORE_TRENDING_PROJECTS: (state, projects) => {
    state.trendingProjects = projects
  }
}
