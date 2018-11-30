import { browse } from '../utils/urls'
import slugify from 'slugify'

export const state = () => ({
  projects: [],
  myProjects: [],

  showNr: 12,

  activeQ: '',
  activeCategory: '',
  activeSort: '',
  activeLocation: '',

  myProjectSort: ''
})

export const getters = {
  getProjects: state => state.projects.slice(0, state.showNr),
  getMyProjects: state => state.myProjects,
  showingAll: state => state.showNr >= state.projects.length,
  getActiveLocationId: state => {
    return '' + state.activeLocation
  }
}

export const actions = {
  async loadProjects ({ state, commit }) {
    const params = {}
    if (state.activeQ) { params.q = state.activeQ }
    if (state.activeCategory) { params.category = state.activeCategory }
    if (state.activeSort) { params.sort = state.activeSort }
    if (state.activeLocation) { params.location = state.activeLocation }
    const { data } = await this.$axios.$get(browse, { params })
    commit('STORE_PROJECTS', data)
  },

  async loadMyProjects ({ state, commit }) {
    const params = {
      owner_id: this.$auth.user.id
    }
    if (state.myProjectSort) { params.sort = state.myProjectSort }
    const { data } = await this.$axios.$get(browse, { params })
    commit('STORE_MY_PROJECTS', data)
  },

  showMore ({ commit }) {
    commit('SHOW_MORE')
  },

  selectCategory: ({ state, commit, dispatch }, selected) => {
    if (state.activeCategory !== selected) {
      commit('SELECT_FILTER', { key: 'activeCategory', selected })
      dispatch('loadProjects')
    }
  },

  selectLocation: ({ state, commit, dispatch }, selected) => {
    if (state.activeLocation !== selected) {
      commit('SELECT_FILTER', { key: 'activeLocation', selected })
      dispatch('loadProjects')
    }
  },

  async selectLocationSlug ({ rootGetters, commit, dispatch }, slug) {
    const locations = rootGetters['types/getRawTypes']('sc_marketPlaceLocations')
    const selected = locations.find(loc => {
      return slugify(loc.name) === slug
    }) || {}
    const selectedId = selected.id

    if (selectedId) {
      commit('SELECT_FILTER', { key: 'activeLocation', selected: selectedId })
    }
    await dispatch('loadProjects')
  },

  selectSort: ({ state, commit, dispatch }, selected) => {
    if (state.activeSort !== selected) {
      commit('SELECT_FILTER', { key: 'activeSort', selected })
      dispatch('loadProjects')
    }
  },

  search: ({ state, commit, dispatch }, selected) => {
    if (state.activeQ !== selected) {
      commit('SELECT_FILTER', { key: 'activeQ', selected })
      dispatch('loadProjects')
    }
  },

  selectMyProjectSort: ({ state, commit, dispatch }, selected) => {
    if (state.myProjectSort !== selected) {
      commit('SELECT_FILTER', selected)
      return dispatch('loadMyProjects')
    }
  }
}

export const mutations = {
  STORE_PROJECTS: (state, projects) => {
    state.projects = projects
  },

  STORE_MY_PROJECTS: (state, projects) => {
    state.myProjects = projects
  },

  SELECT_FILTER: (state, { key, selected }) => {
    state[key] = selected
    state.showNr = 12
  },

  SHOW_MORE: (state) => {
    state.showNr = Math.min(state.showNr + 8, state.projects.length)
  }
}
