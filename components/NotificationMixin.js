import { Notification } from 'element-ui'
import get from 'lodash/get'

export default {
  methods: {

    handleImgSrcError: function (event) {
      const title = `Error loading image from URL:`
      const message = event.target.src

      Notification.error({
        title,
        message,
        duration: 0
      })
    },

    handleSuccess: function (title, message) {
      Notification.success({
        title,
        message
      })
    },

    handleError: function (error, fallbackStr) {
      let title = `API error on `
      const code = get(error, 'response.data.code', '') || get(error, 'code', '')
      if (code === 'ECONNABORTED') {
        title = 'API timed out after 15 seconds on'
      }

      let message = get(error, 'response.data.error.message', '')
      const attributes = get(error, 'response.data.error.attributes')
      if (attributes) {
        for (let prop in attributes) {
          message = message + ' ' + attributes[prop]
        }
      }
      message = message || fallbackStr

      Notification.error({
        title: `${code ? code + ' - ' : ''}${title}`,
        message,
        duration: 0
      })
    }

  }
}
