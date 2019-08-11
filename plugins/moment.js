import Vue from 'vue'
import moment from 'moment'
moment.locale(['zh-tw', 'zh-cn'])

Vue.filter('formatDateTime', (time) => {
  if (!time) {
    return ''
  }
  return moment(time).format('YYYY/MM/DD HH:mm:ss')
})

Vue.filter('formatDate', (date) => {
  if (!date) {
    return ''
  }
  return moment(date).format('YYYY/MM/DD')
})

Vue.prototype.$moment = moment

if (process.client) {
  window.moment = moment
}
