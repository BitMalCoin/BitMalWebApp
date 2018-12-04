import NotificationMixin from '../components/NotificationMixin'

export const state = () => ({
  errors: []
})

export const actions = {
  storeErrorOnServer ({ commit }, error) {
    commit('STORE_ERROR', error)
  },

  womitErrors ({ state, commit }) {
    state.errors.forEach(async error => {
      await NotificationMixin.methods.handleError(error.error, error.fallback)
    })
    setTimeout(() => {
      commit('EMPTY_ERRORS')
    }, 1000)
  }
}

export const mutations = {
  STORE_ERROR: (state, error) => {
    state.errors.push(error)
  },

  REMOVE_ERROR: (state, error) => {
    state.errors = state.errors.filter(el => el !== error)
  },

  EMPTY_ERRORS: state => {
    state.errors = []
  }
}
