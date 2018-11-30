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

  ownProjects: [
    {
      id: 'project-id#12',
      imgUrl: 'https://picsum.photos/300/210?random',
      cause: 'zero-hunger',
      name: 'Own My test project',
      intro: 'This is my intro',
      info: '0% funded — less than a day to go'
    },
    {
      id: 'project-id#13',
      imgUrl: 'https://picsum.photos/300/210?random',
      cause: 'gender-equality',
      name: 'Own Other test project',
      intro: '---------------------------',
      info: '0% funded — less than a day to go'
    },
    {
      id: 'project-id#14',
      imgUrl: 'https://picsum.photos/300/210?random',
      cause: 'clean water & sanitation',
      name: 'Own My awesome project',
      intro: 'This is my project introduction. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along.',
      info: '0% funded — less than a day to go'
    },
    {
      id: 'project-id#15',
      imgUrl: 'https://picsum.photos/300/210?random',
      cause: 'zero-hunger',
      name: 'Own My test project',
      intro: 'This is my intro',
      info: '0% funded — less than a day to go'
    },
    {
      id: 'project-id#16',
      imgUrl: 'https://picsum.photos/300/210?random',
      cause: 'gender-equality',
      name: 'Own Other test project',
      intro: '---------------------------',
      info: '0% funded — less than a day to go'
    },
    {
      id: 'project-id#17',
      imgUrl: 'https://picsum.photos/300/210?random',
      cause: 'clean water & sanitation',
      name: 'Own My awesome project',
      intro: 'This is my project introduction. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along.',
      info: '0% funded — less than a day to go'
    },
    {
      id: 'project-id#18',
      imgUrl: 'https://picsum.photos/300/210?random',
      cause: 'zero-hunger',
      name: 'Own My test project',
      intro: 'This is my intro',
      info: '0% funded — less than a day to go'
    },
    {
      id: 'project-id#19',
      imgUrl: 'https://picsum.photos/300/210?random',
      cause: 'gender-equality',
      name: 'Own Other test project',
      intro: '---------------------------',
      info: '0% funded — less than a day to go'
    },
    {
      id: 'project-id#20',
      imgUrl: 'https://picsum.photos/300/210?random',
      cause: 'zero-hunger',
      name: 'Own My test project',
      intro: 'This is my intro',
      info: '0% funded — less than a day to go'
    },
    {
      id: 'project-id#21',
      imgUrl: 'https://picsum.photos/300/210?random',
      cause: 'gender-equality',
      name: 'Own Other test project',
      intro: '---------------------------',
      info: '0% funded — less than a day to go'
    },
    {
      id: 'project-id#22',
      imgUrl: 'https://picsum.photos/300/210?random',
      cause: 'clean water & sanitation',
      name: 'Own My awesome project',
      intro: 'This is my project introduction. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along.',
      info: '0% funded — less than a day to go'
    },
    {
      id: 'project-id#23',
      imgUrl: 'https://picsum.photos/300/210?random',
      cause: 'zero-hunger',
      name: 'Own My test project',
      intro: 'This is my intro',
      info: '0% funded — less than a day to go'
    }
  ]
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
