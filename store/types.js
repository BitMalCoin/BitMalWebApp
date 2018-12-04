import { getTypes } from '../utils/urls'
import NotificationMixin from '../components/NotificationMixin'
import get from 'lodash/get'

export const state = () => ({
  sc_marketPlaceCategory: [],
  sc_marketPlaceLocations: [],
  sorts: [
    { name: 'Default sort', id: '' },
    { name: 'Oldest', id: 'oldest' },
    { name: 'Newest', id: 'newest' },
    { name: 'Trending', id: 'trending' },
    { name: 'Ending soon', id: 'ending_soon' },
    { name: 'Most funded', id: 'most_funded' },
    { name: 'Most supported', id: 'most_supported' }
  ]
})

export const getters = {
  getTypes: state => type => state[type],
  getRawTypes: state => type => state[type].filter(el => el.id !== ''),
  getLocationFromId: state => searchId => state.sc_marketPlaceLocations.find(el => el.id === searchId)
}

export const actions = {
  async loadTypeServer ({ state, commit, dispatch }, type) {
    if (!state[type] || !state[type].length) {
      try {
        const { data } = await this.$axios.$get(`${getTypes}/${type}`)
        commit('STORE_TYPE', {
          type,
          types: data
        })
      } catch (error) {
        const code = get(error, 'response.data.code', '') || get(error, 'code', '')
        const fallback = `server error while fetching type: ${type}`

        dispatch('errors/storeErrorOnServer', { error: { code }, fallback }, { root: true })
        return Promise.resolve()
      }
    } else {
      return Promise.resolve()
    }
  },

  async loadTypeClient ({ state, commit, dispatch }, type) {
    if (!state[type] || !state[type].length) {
      try {
        const { data } = await this.$axios.$get(`${getTypes}/${type}`)
        commit('STORE_TYPE', {
          type,
          types: data
        })
      } catch (error) {
        NotificationMixin.methods.handleError(error, 'server error while fetching type: ' + type)
        return Promise.resolve()
      }
    } else {
      return Promise.resolve()
    }
  }
}

export const mutations = {
  STORE_TYPE: (state, { type, types }) => {
    // Defaulting for dropdown
    if (type === 'sc_marketPlaceCategory') {
      types.unshift({
        id: '',
        name: 'Any cause'
      })
    } else if (type === 'sc_marketPlaceLocations') {
      types.unshift({
        id: '',
        name: 'Any city'
      })
    }
    state[type] = types
  }
}
