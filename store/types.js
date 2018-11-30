import get from 'lodash/get'
import { getTypes } from '../utils/urls'
import { Message } from 'element-ui'

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
  async loadType ({ state, commit }, type) {
    // TODO: handle this if way better!
    if (!state[type] || !state[type].length) {
      try {
        const { data } = await this.$axios.$get(`${getTypes}/${type}`)
        commit('STORE_TYPE', {
          type,
          types: data
        })
      } catch (error) {
        const code = get(error, 'response.status')
        const title = 'server error while fetching type: ' + type
        const description = get(error, 'response.data.error.message', JSON.stringify(error.response.data))
        Message.error({
          dangerouslyUseHTMLString: true,
          message: `<em>${code} - ${title}</em><br>${description}`,
          duration: 0,
          showClose: true
        })
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
