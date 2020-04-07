<template>
  <div>
    <h1>Pet</h1>
    <p>{{animal.name}}</p>
    <p>{{animal.age}}</p>
    <p>{{animal.breed}}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Pets',
  data () {
    return {
      animal: {}
    }
  },
  computed: {
    ...mapState([
      'cats',
      'dogs'
    ])
  },
  mounted () {
    const animal = this[this.$route.params.type][this.$route.params.pid]
    this.animal = animal
  }
}
</script>
