import { browse } from '../utils/urls'

export const state = () => ({
  project: {}
})

export const getters = {
  getProject: state => state.project
}

export const actions = {
  async loadProject ({ commit }, projectId) {
    const { data } = await this.$axios.$get(`${browse}/${projectId}`)
    // console.log('project data:', data)
    commit('STORE_PROJECT', data)
  },

  async postComment ({ dispatch }, { message, projectId }) {
    await this.$axios.$post(`${browse}/${projectId}/comments`, { message, reply_to: '' })
    dispatch('loadProject', projectId)
  }
}

export const mutations = {
  STORE_PROJECT: (state, project) => {
    state.project = project
  }
}
