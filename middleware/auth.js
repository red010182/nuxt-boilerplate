export default function ({ store, redirect }) {
  if (!store.state.auth.user.id) {
    return redirect('/login')
  }
}
