<template lang='pug'>
.container
  Logo
  p store: {{ $store.state }}
  Spinner(style='text-align:left')
  p Date: {{ $moment() | formatDate }}
  p User ID: {{ $getUser().id }}
  nuxt-link(to='login') login
</template>

<script>
import Logo from '@/components/Logo.vue'

export default {
  components: {
    Logo
  },
  mounted () {
    // this.$api.get('/404').then().catch(this.$errorHandler)
    // console.log(this.$auth, this.$getUser)
  },
  created () {
  }
}
</script>

<style lang='scss'>
.container {
  .bash {
    color: black;
  }
}
</style>
