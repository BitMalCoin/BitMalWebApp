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

    handleError: function (error) {
      let title = `API error`
      const code = get(error, 'response.data.code', '') || get(error, 'code', '')
      if (code === 'ECONNABORTED') {
        title = 'API timed out after 15 seconds'
      }
      // const url = get(error, '')
      const message = get(error, 'response.data.error.message', '')

      Notification.error({
        title: `${code ? code + ' - ' : ''}${title}`,
        message,
        duration: 0
      })
    }

  }
}
