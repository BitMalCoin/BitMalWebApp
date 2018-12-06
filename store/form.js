import { browse } from '../utils/urls'

export const state = () => ({})

export const getters = {}

export const actions = {
  submit ({ commit }, formObj) {
    return this.$axios.$post(browse, formObj)
  },

  patch ({ commit }, formObj) {
    return this.$axios.$patch(`${browse}/${formObj.id}`, formObj)
  },

  saveImg ({ commit }, fileObj) {
    const bodyFormData = new FormData()
    bodyFormData.append('object', fileObj)

    return this.$axios({
      method: 'post',
      url: '/media/upload',
      data: bodyFormData,
      config: {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    })
  },

  sendMilestone ({ commit }, { projectId, milestoneData }) {
    return this.$axios.$post(`${browse}/${projectId}/milestones`, milestoneData)
  }
}

export const mutations = {}
