<template lang="pug">
  ClipLoader(:color='color')
</template>

<script>
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
export default {
  components: {
    ClipLoader
  },
  props: {
    color: {
      required: false,
      type: String,
      default: '#F66100'
    }
  }
}
</script>
