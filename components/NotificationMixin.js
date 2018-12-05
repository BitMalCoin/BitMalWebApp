import { Notification } from 'element-ui'
import get from 'lodash/get'

export default {

  methods: {

    handleImgSrcError: function (event) {
      const title = this.$t('errors.imgError')
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
        title = this.$t('errors.timeout')
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
