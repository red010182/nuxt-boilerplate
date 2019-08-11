import Vue from 'vue'
import ElementUI from 'element-ui'

Vue.prototype.$errorHandler = function (e) {
  console.error(e)
  if (e.message) {
    ElementUI.Message.error(e.message)
  }
}
