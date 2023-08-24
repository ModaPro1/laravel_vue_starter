<template>
  <form class="login" @submit.prevent="submitForm">
    <h3>Login</h3>
    <div class="box p-3 bg-white border rounded">
      <div class="input-box mb-3" :class="{errorBox: !email.isValid}">
        <label for="email">Email</label>
        <input type="email" id="email" class="form-control" v-model="email.val">
        <div class="error" v-if="!email.isValid">Enter a Valid Email.</div>
      </div>
      <div class="input-box mb-3" :class="{errorBox: !password.isValid}">
        <label for="password">Password</label>
        <input type="password" id="password" class="form-control" v-model="password.val">
        <div class="error" v-if="!password.isValid">Enter a Password.</div>
      </div>
      <div class="error mb-3" v-if="formMessage">{{ formMessage }}</div>
      <button v-if="!isLoading" class="btn btn-primary">Login</button>
      <button v-if="isLoading" class="btn btn-primary" type="button" disabled>
        <span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
        <span role="status">Login</span>
      </button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      formIsValid: true,
      formMessage: '',
      isLoading: false,
      email: {
        val: '',
        isValid: true
      },
      password: {
        val: '',
        isValid: true
      },
    }
  },
  methods: {
    validateForm() {
      this.formIsValid = true
      if(!this.email.val.match( /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        this.email.isValid = false
        this.formIsValid = false
      }else {
        this.email.isValid = true
      }

      if(this.password.val == '') {
        this.password.isValid = false
        this.formIsValid = false
      }else {
        this.password.isValid = true
      }

    },
    async submitForm() {
      this.validateForm()

      if(!this.formIsValid) {
        return;
      }
      this.isLoading = true
      await this.$store.dispatch('login', {
        email: this.email.val,
        password: this.password.val
      })

      if(this.$store.getters.loginError) {
        this.formMessage = "Invalid Credentials."
        this.isLoading = false
      }else {
        await this.$store.dispatch('checkAuth')
        this.isLoading = false
        this.$router.replace('/')
      }
    }
  }
}
</script>

<style scoped>
  form.login {
    width: 700px;
    margin: 200px auto 0;
  }

  .error {
    color: var(--bs-danger);
  }
  .errorBox label {
    color: var(--bs-danger);
  }
  .errorBox input {
    border-color: var(--bs-danger);
  }
</style>