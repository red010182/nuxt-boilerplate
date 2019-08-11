
export default ({ app: { store } }) => {
  console.log(process.env.NODE_ENV)
  if (process.client && process.env.NODE_ENV !== 'production') {
    window.store = store
  }
}
