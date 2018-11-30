import { register, loginRequest, myProfile } from '../utils/urls'

export const state = () => ({
  user: {
    mobile: ''
  }
})

export const getters = {}

export const actions = {
  register ({ commit }, body) {
    return this.$axios.$post(register, body)
  },

  async loginRequest ({ commit }, { mobile }) {
    commit('STORE_MOBILE', mobile)
    return this.$axios.$post(loginRequest, { mobile })
  },

  putProfile ({ commit }, profileObj) {
    return this.$axios.$put(myProfile, profileObj)
  }
}

export const mutations = {
  STORE_MOBILE: (state, mobile) => {
    state.user.mobile = mobile
  }
}
