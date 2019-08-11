import Vue from 'vue'
export default ({ app: { store } }) => {
  Vue.prototype.$getUser = () => store.state.auth.user
}
