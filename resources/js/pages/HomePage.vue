<template>
  <section>
    <div class="container">
      <h3 class="mt-3 text-primary">Main Page</h3>
      <p v-if="userData">Welcome {{ userData.name }}</p>
      <p v-if="!userData">Login First</p>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      userData: null
    }
  },
  methods: {
    userAuthenticated() {
      if(this.$store.getters.userAuthenticated) {
        this.userData = this.$store.getters.userAuthenticated
      }
    }
  },
  created() {
    this.userAuthenticated()
  }
}
</script>