export const state = () => ({
  general: {
    activeProjects: 125,
    totalInvestedBitmals: 270000,
    totalBackers: 3670,
    fundedProjects: 18
  },

  durations: [
    '15 days',
    '30 days'
  ],

  ownProjects: []
})

export const getters = {
  getOwnProjects (state) {
    return state.ownProjects
  }
}

export const actions = {}

export const mutations = {
  SELECT_EXP_CAUSE: (state, selected) => {
    state.exploreFilters.selectedCause = selected
  },

  SELECT_EXP_SORT_TYPE: (state, selected) => {
    state.exploreFilters.selectedSortType = selected
  }
}
